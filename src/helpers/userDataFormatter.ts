import { DisplayUser } from '../types/common';

export default function userDataFormatter(user): DisplayUser {
  const {
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
    bio: '',
    gravatar_avatar_url: picture,
    patreon_avatar_url: '',
    avatar_select: '',
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
    get avatar(): string {
      return this.avatar_select === 'patreon'
        ? this.patreon_avatar_url
        : this.gravatar_avatar_url;
    },
  };

  return formattedUser;
}
