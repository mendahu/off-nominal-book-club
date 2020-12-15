import { useEffect, useState } from 'react';
import axios from 'axios';
import { Author } from '../../../../types/common';

export enum Recommend {
  random = 'random',
  favourite = 'favourite',
  highestRated = 'highest_rated',
}

export type Recommendation = {
  type: Recommend;
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  google_id: string;
  year: string;
  authors: Author[];
  userdata: {
    reads: number;
    wishlist: number;
    favourites: number;
    rating: {
      avg: number | null;
      count: number;
    };
  };
  favs?: string;
  authorString: string;
  slug: string;
  headline: string;
  subline: string;
};

export const useCarousel = () => {
  const [carouselItems, setCaoruselItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  const config = {
    random: {
      headline: 'Try a random book!',
      subline: 'Chosen from our collection',
    },
    favourite: {
      headline: 'Community Favourite',
      subline: "The community's favourite this month",
    },
    highest_rated: {
      headline: "Community's Highest Rated",
      subline: 'Best rated this month',
    },
  };

  const fetchRecommendations = async () => {
    try {
      const response = await axios.get('/api/recommendations');
      const recommends = await response.data.map((reco) => ({
        ...reco,
        headline: config[reco.type].headline,
        subline: config[reco.type].subline,
      }));
      setCaoruselItems(recommends);
    } catch (err) {
      // fail silently
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return { carouselItems, loading };
};
