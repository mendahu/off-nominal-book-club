# Routes

## Pages

| Route                    | Page              |
| ------------------------ | ----------------- |
| /                        | Home Page         |
| /c                       | Communities       |
| /c/[community-id]        | Example Community |
| /c/[community-id]/b/[id] | Example Book      |
| /c/[community-id]/b/add  | Add Book          |
| /c/[community-id]/u/[id] | User Profile      |

## API

| Route                                   | Action                                                        |
| --------------------------------------- | ------------------------------------------------------------- |
| /c/[community-id]/books                 | GET Query for book collection                                 |
|                                         | POST Add a book to community collection                       |
| /c/[community-id]/users                 | POST add a user                                               |
| /c/[community-id]/tags                  | POST Create a new tag                                         |
|                                         | ????? Add a tag to a book                                     |
|                                         | ????? Remove a tag from a book                                |
| /c/[community-id]/tags/relate           | POST Create a new relationship                                |
|                                         | DELETE remove a relationsip                                   |
| /c/[community-id]/books/[id]/reads      | POST add a book to read list (route for each one?)            |
| /c/[community-id]/books/[id]/metadata   | POST add new metadata { type: read } ???????????              |
|                                         | DELETE remove metadata                                        |
| /c/[community-id]/readings              | POST add a new reading                                        |
|                                         | DELETE remove a reading                                       |
| /c/[community-id]/readings/[id]/join    | POST join a reading                                           |
|                                         | DELETE leave a reading                                        |
| /c/[community-id]/readings/[id]/comment | POST join a reading                                           |
|                                         | DELETE leave a reading                                        |
| /c/[community-id]/mailings              | PUT change activation/content setting ??????????????????????? |
|                                         | POST to send a mailing                                        |
| /c/[community-id]/bom                   | POST to add a book of the month                               |
|                                         | DELETE to remove book of the month                            |
