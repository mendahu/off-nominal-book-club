export default function userDataFormatter(user) {

  const { name, nickname, picture, app_metadata: { onbc_id } } = user

  const formattedUser = {
    name,
    nickname,
    picture,
    app_metadata: {
      onbc_id
    },
    get isPatron() {
      let status = false;
      if (this.app_metadata?.patreon) {
        this.app_metadata.patreon.campaigns.forEach(campaign => {
          if (campaign.status === "active_patron") {
            status = true;
          };
        })
      }
      return status;
    }
  };

  return formattedUser;
}