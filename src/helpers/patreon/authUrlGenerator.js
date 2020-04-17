import { tokenOptions as options } from '../../../config/patreon/api_config'

export default function patreonAuthUrlGenerator() {

  console.log(options)

  const baseURL = 'https://www.patreon.com/oauth2/authorize'
  const response_type = 'code'

  const url = (
    baseURL + 
    '?response_type=' + response_type +
    '&client_id=' + options.client_id +
    '&redirect_uri=' + options.redirect_uri +
    (options.scope ? '&scope=' + options.scope : "") +
    (options.state ? '&state=' + options.state : "")
  )

  console.log(url)
  return url;
}

