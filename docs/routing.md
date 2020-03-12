# Routes

## Pages

| Route                        | Page              |
| ---------------------------- | ----------------- |
| /                            | Communities       |
| /        | Example Community |
| /b/[id] | Example Book      |
| /b/add  | Add Book          |
| /u/[id] | User Profile      |

## API

| Route                                   | Action                                                        |
| --------------------------------------- | ------------------------------------------------------------- |
| /api/books                              | GET Query for book collection                                 |
|                                         | GET for Amazon?????                                           |
|                                         | POST Add a book to community collection                       |
| /api/users                              | POST add a user                                               |
| /api/tags                               | POST Create a new tag                                         |
|                                         | ????? Add a tag to a book                                     |
|                                         | ????? Remove a tag from a book                                |
| /api/tags/relate                        | POST Create a new relationship                                |
|                                         | DELETE remove a relationsip                                   |
| /api/books/[id]/reads                   | POST add a book to read list (route for each one?)            |
| /api/books/[id]/metadata                | POST add new metadata { type: read } ???????????              |
|                                         | DELETE remove metadata                                        |
| /api/readings                           | POST add a new reading                                        |
|                                         | DELETE remove a reading                                       |
| /api/readings/[id]/join                 | POST join a reading                                           |
|                                         | DELETE leave a reading                                        |
| /api/readings/[id]/comment              | POST join a reading                                           |
|                                         | DELETE leave a reading                                        |
| /api/mailings                           | PUT change activation/content setting ??????????????????????? |
|                                         | POST to send a mailing                                        |
| /api/bom                                | POST to add a book of the month                               |
|                                         | DELETE to remove book of the month                            |
