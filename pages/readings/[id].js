import Layout from "../../src/components/DefaultLayout"
import BookBanner from "../../src/components/Readings/BookBanner"
import UsersComments from "../../src/components/Readings/UsersComments"

function ReadingView() {

  const book = {
    id: 7,
    title: 'Make Space',
    fiction: false,
    google_id: 'NgRkVn3b5v0C',
    isbn13: '9781118143728',
    description: `"If you are determined to encourage creativity and provide acollaborative environment that will bring out the best in people,you will want this book by your side at all times." —Bill Moggridge, Director of the Smithsonian'sCooper-Hewitt National Design Museum "Make Space is an articulate account about theimportance of space; how we think about it, build it and thrive init." —James P. Hackett, President and CEO, Steelcase An inspiring guidebook filled with ways to alter space tofuel creative work and foster collaboration. Based on the work at the Stanford University d.school and itsEnvironments Collaborative Initiative, MakeSpace is a tool that shows how space can be intentionallymanipulated to ignite creativity. Appropriate for designers chargedwith creating new spaces or anyone interested in revamping anexisting space, this guide offers novel and non-obvious strategiesfor changing surroundings specifically to enhance the ways in whichteams and individuals communicate, work, play--and innovate. Inside are: Tools--tips on how to build everything from furniture, towall treatments, and rigging Situations--scenarios, and layouts for sparking creativeactivities Insights--bite-sized lessons designed to shortcut yourlearning curve Space Studies--candid stories with lessons on creatingspaces for making, learning, imagining, and connecting Design Template--a framework for understanding, planning,and building collaborative environments Make Space is a new and dynamic resource for activatingcreativity, communication and innovation across institutions,corporations, teams, and schools alike. Filled with tips andinstructions that can be approached from a wide variety ofangles, Make Space is a ready resource forempowering anyone to take control of an environment.`,
    year: '2012',
    image_url: 'http://books.google.com/books/content?id=NgRkVn3b5v0C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    avg_rating: '1.0',
    authors_string: 'Jennifer Read',
    authors: '["Jennifer Read"]',
    tags: '[{"book_id":7,"tag_name":"acollaborative","count":2}, \n' +
      ' {"book_id":7,"tag_name":"want","count":1}, \n' +
      ' {"book_id":7,"tag_name":"bring","count":1}, \n' +
      ' {"book_id":7,"tag_name":"peopleyou","count":1}, \n' +
      ' {"book_id":7,"tag_name":"creativity","count":1}, \n' +
      ' {"book_id":7,"tag_name":"provide","count":1}, \n' +
      ' {"book_id":7,"tag_name":"encourage","count":1}, \n' +
      ' {"book_id":7,"tag_name":"best","count":1}, \n' +
      ' {"book_id":7,"tag_name":"determined","count":1}]',
    tags_string: 'acollaborative,want,bring,peopleyou,creativity,provide,encourage,best,determined'
}

  return (
    <Layout>
      <BookBanner book={book} />
      <UsersComments />
    </Layout>
  );
};

export default ReadingView;