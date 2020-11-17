import { NextApiRequest, NextApiResponse } from 'next';
import {
  getFavourite,
  getRandom,
  getHighestRated,
} from '../../../db/queries/recommendations';
import generateAuthorString from '../../../src/helpers/generateAuthorString';
import urlGenerator from '../../../src/helpers/urlGenerator';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== 'GET') {
    return res.status(405).json({
      error: `Method ${method} Not Allowed`,
    });
  }

  const {
    query: { type },
  } = req;

  if (typeof type !== 'string' && typeof type !== 'undefined') {
    return res.status(400).json({
      error: `Query string must be a string of comma-separated values (ie. 'random' or 'random,favourite')`,
    });
  }

  const types = type ? type.split(',') : ['all'];

  const recommendsRequired = {
    getRandom: {
      dispatch: false,
      util: getRandom,
    },
    getFavourite: {
      dispatch: false,
      util: getFavourite,
    },
    getHighestRated: {
      dispatch: false,
      util: getHighestRated,
    },
  };

  let invalidQueryString = false;

  types.forEach((type) => {
    switch (type) {
      case 'all':
        recommendsRequired.getRandom.dispatch = true;
        recommendsRequired.getFavourite.dispatch = true;
        recommendsRequired.getHighestRated.dispatch = true;
        break;
      case 'random':
        recommendsRequired.getRandom.dispatch = true;
        break;
      case 'favourite':
        recommendsRequired.getFavourite.dispatch = true;
        break;
      case 'highestrate':
        recommendsRequired.getHighestRated.dispatch = true;
        break;
      default:
        invalidQueryString = true;
    }
  });

  const promises = [];

  Object.keys(recommendsRequired).forEach((recommend) => {
    if (recommendsRequired[recommend].dispatch) {
      promises.push(recommendsRequired[recommend].util());
    }
  });

  if (invalidQueryString && !promises.length) {
    return res.status(400).json({
      error: `The Recommendation type supplied in your query string is not suppored.`,
    });
  }

  return Promise.all(promises)
    .then((response) => {
      const data = [];
      response.forEach((item) => {
        if (item.rows[0]) {
          const recommend = item.rows[0];
          recommend.authorString = generateAuthorString(recommend.authors);
          recommend.slug = urlGenerator(
            recommend.id,
            recommend.authorString,
            recommend.title
          );
          data.push(recommend);
        }
      });
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message: 'Error reading database',
      });
    });
};
