import { DisplayUser } from '../types/common';

export default function userDataFormatter(user) {
  const { name, nickname, picture, app_metadata } = user;

  const formattedUser: DisplayUser = {
    name,
    nickname,
    picture,
    app_metadata: {
      onbc_id: app_metadata?.onbc_id,
    },
    get isPatron(): boolean {
      let status: boolean = false;
      if (this.app_metadata?.patreon?.campaigns) {
        this.app_metadata.patreon.campaigns.forEach((campaign) => {
          if (campaign.status === 'active_patron') {
            status = true;
          }
        });
      }
      return status;
    },
  };

  return formattedUser;
}
