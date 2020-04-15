import Message from '../components/Utility/Message'

const errorMessages = {
  'missing_meta': 'No app metadata container in your user profile. This shouldn\'t have happened as it is generated automatically when you register. Please contact the administrator to notify them of this issue!',
  'missing_onbcId': 'No Book Club ID associated with this user. This shouldn\'t have happened as it is generated automatically at registration. Please contact the administrator to notify them of this issue!',
  'missing_patreon': 'No Premium (Patreon) User data container structure present in your user Id. This shouldn\'t have happened as it is generated automatically at registration, even if you\'re not a patron. Please contact the administrator to notify them of this issue!',
}


export default function userProfileValidator(user) {

  if (!user.app_metadata) {
    return <Message message={errorMessages['missing_meta']} variant="warning"/>
  }

  if (!user.app_metadata.onbc_id) {
    return <Message message={errorMessages['missing_onbcId']} variant="warning"/>
  }

  if (!user.app_metadata.patreon) {
    return <Message message={errorMessages['missing_patreon']} variant="warning"/>
  }

  return false;

}