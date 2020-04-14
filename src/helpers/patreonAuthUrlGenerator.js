
export default function patreonAuthUrlGenerator(options) {
  // return (
  //   'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=' +
  //   options.client_id +
  //   '&redirect_uri=' +
  //   options.redirect_uri +
  //   (options.scope ? '&scope=' + options.scope : "") +
  //   (options.state ? '&state=' + options.state : "")
  // )

  return 'https://www.patreon.com/oauth2/authorize?response_type=code&client_id=yMa6NmXk1WOvHFG15OYs2nGoFaH7VEt_r97NHn4_z7DultKm5EDuWwGvcMSsestY&redirect_uri=https://onbc.ngrok.io/users/register'
}

