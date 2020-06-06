import { Campaign } from '../../types/common';

export default function profileFormatter(patreonData) {
  const campaigns: Campaign[] = [];

  const campaignRef = {
    '417799': 'wemartians',
    '410513': 'meco',
  };

  const {
    data: {
      attributes: { image_url },
    },
    included,
  } = patreonData.data;

  if (included?.length) {
    included.forEach((campaign, index) => {
      const campaignId = included[index].relationships?.campaign.data.id;

      if (campaignRef[campaignId]) {
        const campaignObj: Campaign = {
          name: campaignRef[campaignId],
          id: campaignId,
          status: campaign.attributes.patron_status,
          pledge: campaign.attributes.currently_entitled_amount_cents,
        };

        campaigns.push(campaignObj);
      }
    });
  }

  const formattedData = {
    image_url,
    campaigns,
  };

  return formattedData;
}
