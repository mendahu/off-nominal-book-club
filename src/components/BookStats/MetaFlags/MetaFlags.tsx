import { Tooltip, Chip, CircularProgress } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { tooltip } from "./config.json";
import { useMetaFlags } from "./useMetaFlags/useMetaFlags";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { useBookClubUser } from "../../../../lib/bookClubUser";

export type MetaFlagDatum = {
  count: number;
  id?: number;
  loading: boolean;
};

export type MetaFlagData = {
  reads: MetaFlagDatum;
  wishlist: MetaFlagDatum;
  favourites: MetaFlagDatum;
};

export enum Flag {
  reads = "reads",
  wishlist = "wishlist",
  favourites = "favourites",
}

export type MetaFlagsProps = {
  metaData: MetaFlagData;
  bookId: number;
};

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5),
  },
}));

export const determineIcon = (
  type: Flag,
  id: number | undefined,
  loading: boolean
) => {
  if (loading) {
    return <CircularProgress size={24} color="inherit" />;
  }

  switch (type) {
    case Flag.reads:
      return id ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />;
    case Flag.wishlist:
      return id ? <BookmarkIcon /> : <BookmarkBorderIcon />;
    case Flag.favourites:
      return id ? <FavoriteIcon /> : <FavoriteBorderIcon />;
  }
};

export const MetaFlags = ({ metaData, bookId }: MetaFlagsProps) => {
  const classes = useStyles();

  const { user, loading } = useBookClubUser();
  const userId = user?.onbc_id;
  const triggerSnackbar = useSnackbarContext();

  const { reads, wishlist, favourites, clickHandler } = useMetaFlags(
    metaData,
    bookId,
    userId,
    triggerSnackbar
  );

  return (
    <>
      <Tooltip title={tooltip.reads} placement="left">
        <Chip
          className={classes.chip}
          onClick={clickHandler(Flag.reads)}
          label={reads.count}
          icon={determineIcon(Flag.reads, reads.id, reads.loading)}
          color={reads.id ? "primary" : "default"}
        />
      </Tooltip>
      <Tooltip title={tooltip.wishlist} placement="left">
        <Chip
          className={classes.chip}
          onClick={clickHandler(Flag.wishlist)}
          label={wishlist.count}
          icon={determineIcon(Flag.wishlist, wishlist.id, wishlist.loading)}
          color={wishlist.id ? "primary" : "default"}
        />
      </Tooltip>
      <Tooltip title={tooltip.favourites} placement="left">
        <Chip
          className={classes.chip}
          onClick={clickHandler(Flag.favourites)}
          label={favourites.count}
          icon={determineIcon(
            Flag.favourites,
            favourites.id,
            favourites.loading
          )}
          color={favourites.id ? "primary" : "default"}
        />
      </Tooltip>
    </>
  );
};

export default MetaFlags;
