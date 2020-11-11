import { Dispatch, SetStateAction, useState } from 'react';
import {
  Flag,
  MetaFlagData,
  MetaFlagDatum,
} from '../../components/MetaFlags/MetaFlags';
import { SnackbarContent } from '../useSnackbar/useSnackbar';
import { errorMessages } from '../../components/MetaFlags/config.json';
import axios from 'axios';

export const useMetaFlags = (
  data: MetaFlagData,
  bookId: number,
  userId: number | null,
  errorHandler: (error: SnackbarContent) => void
) => {
  const [reads, setReads] = useState(data.reads);
  const [wishlist, setWishlist] = useState(data.wishlist);
  const [favourites, setFavourites] = useState(data.favourites);

  const triggerApiError = () =>
    errorHandler({
      active: true,
      message: 'Something went wrong toggling this data.',
      severity: 'error',
    });

  const markFlag = async (dataType: Flag, state: MetaFlagDatum, setter) => {
    setter({ ...state, loading: true });
    try {
      const response = await axios.post(`/api/${dataType}/new`, {
        bookId,
        userId,
      });
      const newFlagId = await response.data[0];
      const newCount = state.count + 1;
      setter({ count: newCount, id: newFlagId, loading: false });
    } catch {
      triggerApiError();
      setter({ ...state, loading: false });
    }
  };

  const unMarkFlag = async (dataType: Flag, state: MetaFlagDatum, setter) => {
    setter({ ...state, loading: true });
    try {
      const response = await axios.post(`/api/${dataType}/${state.id}/delete`);
      const newCount = state.count - 1;
      setter({ count: newCount, id: undefined, loading: false });
    } catch {
      triggerApiError();
      setter({ ...state, loading: false });
    }
  };

  const toggleFlag = (type: Flag) => {
    let state: MetaFlagDatum;
    let setState: Dispatch<SetStateAction<MetaFlagDatum>>;

    switch (type) {
      case Flag.reads:
        state = reads;
        setState = setReads;
        break;
      case Flag.wishlist:
        state = wishlist;
        setState = setWishlist;
        break;
      case Flag.favourites:
        state = favourites;
        setState = setFavourites;
        break;
      default:
        return;
    }

    if (state.loading) {
      return;
    }

    if (state.id) {
      unMarkFlag(type, state, setState);
    } else {
      markFlag(type, state, setState);
    }
  };

  const clickHandler = (type: Flag) => () => {
    if (userId) {
      toggleFlag(type);
    } else {
      errorHandler({
        active: true,
        message: errorMessages[type],
        severity: 'warning',
      });
    }
  };

  return {
    reads,
    wishlist,
    favourites,
    clickHandler,
  };
};
