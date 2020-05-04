import { tokenOptions } from '../../../config/patreon/api_config'

export default function patreonAuthUrlGenerator(): string {

  const { client_id, redirect_uri, scope, state } = tokenOptions;

  const baseURL: string = 'https://www.patreon.com/oauth2/authorize'
  const response_type: string = 'code'

  const url: string = (
    baseURL + 
    '?response_type=' + response_type +
    '&client_id=' + client_id +
    '&redirect_uri=' + redirect_uri +
    (scope ? '&scope=' + scope : "") +
    (state ? '&state=' + state : "")
  )

  return url;
}