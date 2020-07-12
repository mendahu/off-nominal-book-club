import { DisplayUser } from '../types/common';

const userDataFormatter = (user): DisplayUser => {
  const {
    email,
    picture,
    app_metadata: { patreon, onbc_id },
  } = user;

  const patreonStateChecker = (patreonAttribute): string => {
    if (typeof patreonAttribute === 'string') {
      return patreonAttribute;
    } else {
      return 'connected';
    }
  };

  const formattedUser: DisplayUser = {
    onbc_id,
    name: '',
    email,
    avatar: picture,
    bio: '',
    patreon: {
      state: patreonStateChecker(patreon),
    },
    favourites: [],
    reads: [],
    wishlist: [],
    ratings: [],
    get isPatron(): boolean {
      let status: boolean = false;
      if (this.patreon.campaigns) {
        this.patreon.campaigns.forEach((campaign) => {
          if (campaign.status === 'active_patron') {
            status = true;
          }
        });
      }
      return status;
    },
  };

  return formattedUser;
};

export default userDataFormatter;
