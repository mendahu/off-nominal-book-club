Actors: 
* User: A book club user
* Client: The book club app
* OAuth: Patreon's OAuth Server
* Patreon: Where the data is

1. Create a Login Button which makes GET request to
  www.patreon.com/oauth2/authorize?response_type=code&client_id=yMa6NmXk1WOvHFG15OYs2nGoFaH7VEt_r97NHn4_z7DultKm5EDuWwGvcMSsestY&redirect_url=https%3A%2F%2Fbooks.offnominal.space%2Fapi%2Foauth%2Fredirect&scope=identity

2. Users will authenticate through Patreon