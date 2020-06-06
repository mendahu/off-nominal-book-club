import React from 'react';
import { render, cleanup } from '@testing-library/react';
import profileFormatter from '../patreon/profileFormatter';

describe('User Profile Formatter', () => {
  const user_nometa = {
    sub: 'auth0|123456',
    email: 'test@test.test',
  };
  const user_noid = {
    sub: 'auth0|123456',
    email: 'test@test.test',
    app_metadata: {
      patreon: 'skipped',
    },
  };
  const user_nopat = {
    sub: 'auth0|123456',
    email: 'test@test.test',
    app_metadata: {
      onbc_id: 10,
    },
  };

  it('should return formattedData if there are no included campaigns', () => {
    const patreonData = {
      data: {
        data: {
          attributes: {
            about: 'A Patreon Platform User',
            created: '2018-04-01T00:36:26+00:00',
            email: 'platform@patreon.com',
            first_name: 'Platform',
            full_name: 'Platform Team',
            image_url: 'https://url.example',
            last_name: 'Platform',
            social_connections: {
              deviantart: null,
              discord: null,
              facebook: null,
              reddit: null,
              spotify: null,
              twitch: null,
              twitter: { user_id: '12345' },
              youtube: null,
            },
            thumb_url: 'https://url.example',
            url: 'https://www.patreon.com/example',
            vanity: 'platform',
          },
          id: '12345',
          type: 'user',
        },
      },
    };

    const formattedData = {
      image_url: 'https://url.example',
      campaigns: [],
    };

    const returnValue = profileFormatter(patreonData);

    expect(returnValue).toEqual(formattedData);
  });

  it('should return correctly formatted Data', () => {
    const patreonData = {
      data: {
        data: {
          attributes: {
            about: 'A Patreon Platform User',
            created: '2018-04-01T00:36:26+00:00',
            email: 'platform@patreon.com',
            first_name: 'Platform',
            full_name: 'Platform Team',
            image_url: 'https://url.example',
            last_name: 'Platform',
            social_connections: {
              deviantart: null,
              discord: null,
              facebook: null,
              reddit: null,
              spotify: null,
              twitch: null,
              twitter: { user_id: '12345' },
              youtube: null,
            },
            thumb_url: 'https://url.example',
            url: 'https://www.patreon.com/example',
            vanity: 'platform',
          },
          id: '12345',
          type: 'user',
        },
        included: [
          {
            relationships: {
              campaign: {
                data: {
                  id: '417799',
                },
              },
            },
            attributes: {
              patron_status: 'active',
              currently_entitled_amount_cents: '500',
            },
          },
        ],
      },
    };

    const formattedData = {
      image_url: 'https://url.example',
      campaigns: [
        {
          name: 'wemartians',
          id: '417799',
          status: 'active',
          pledge: '500',
        },
      ],
    };

    const returnValue = profileFormatter(patreonData);

    expect(returnValue).toEqual(formattedData);
  });
});
