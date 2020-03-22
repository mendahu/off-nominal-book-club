
//Random number generator
const randomNumGen = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

//Random Selector Function
//Used to select a random item of a dataset, without duplicates from a reference array
const randomIdGenerator = (itemTracker, sampleSetSize, offset = 0) => {
  const randomId = randomNumGen(offset, sampleSetSize)
  return (itemTracker.includes(randomId)) ? randomIdGenerator(itemTracker, sampleSetSize, offset) :  randomId
}

exports.seed = function(knex) {
  
  const users = knex('users').select('id')
  const reads = knex('reads').select('id', 'book_id', 'user_id')

  //Clear table for readings of any data
  const initPromises = [
    users,
    reads,
    knex('readings').del(),
    knex('users_readings').del()
  ]

  // Deletes ALL existing entries
  return Promise.all(initPromises)
    .then((results) => {

      const [ users, reads ] = results

      //Containers to hold the ids of readings
      const readings      = [];
      
      //The first three users make a reading
      const readingHosts = [
        users[0],
        users[1],
        users[2],
      ]

      const readingTime = [
        { start: '2020-01-13T12:30:00', end: '2020-01-27T17:00:00' },
        { start: '2020-03-20T16:15:00', end: '2020-04-11T16:30:00' },
        { start: '2020-04-27T09:00:00', end: '2020-05-11T18:45:00' },
      ] 

      
      //Generate a reading for each host
      readingHosts.forEach((user, index) => {
        
        const bookIndex = reads.findIndex((read) => read.user_id == user.id)

        readings.push({
          book_id: reads[bookIndex].book_id,
          user_id: user.id,
          date_started: readingTime[index].start,
          date_ended: readingTime[index].end
        })
      })

      // Inserts seed entries
      return knex('readings').insert(readings).returning('*')
        .then((readings) => {
          return { readings, users }
        })
    })
    .then((results) => {

      const { readings, users } = results
      const remainingUsers = users.slice(3)

      //container to hold ids of users_readings
      const userReadings      = [];

      readings.forEach((reading, readingindex) => {

        //push a relationship for the creator
        userReadings.push({
          reading_id: reading.id,
          user_id: reading.user_id,
          gets_mail: true,
        })

        //loop through remaining users and randomly decide if they are a part of this reading
        remainingUsers.forEach((user) => {
          if (Math.random() < 0.5) {
            userReadings.push({
              reading_id: reading.id,
              user_id: user.id,
              gets_mail: (Math.random() < 0.5) ? true : false,
            })
          }
        })
      })

      return knex('users_readings').insert(userReadings)
    })
};

