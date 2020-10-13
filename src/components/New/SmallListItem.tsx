import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import urlGenerator from '../../helpers/urlGenerator';

type SmallListItemProps = {
  imageUrl: string;
  title: string;
  authorString: string;
  button?: {
    id: number;
  };
};

const useStyles = makeStyles((theme) => ({
  matchedSelection: {
    display: 'flex',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    alignItems: 'center',
  },
  smallThumb: {
    width: '60px',
  },
  matchedSelectionInfoBox: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    flexGrow: 1,
  },
  buttonContainer: {
    minWidth: '100px',
  },
}));

export const SmallListItem = ({
  imageUrl,
  title,
  authorString,
  button,
}: SmallListItemProps) => {
  const classes = useStyles();

  return (
    <div className={classes.matchedSelection}>
      <div>
        <img src={imageUrl} className={classes.smallThumb} />
      </div>
      <div className={classes.matchedSelectionInfoBox}>
        <Typography component="h3" variant="h6">
          {title}
        </Typography>
        <Typography component="h4" variant="subtitle1">
          {authorString}
        </Typography>
      </div>
      {button && (
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            href={urlGenerator(button.id, authorString, title)}
          >
            Take me!
          </Button>
        </div>
      )}
    </div>
  );
};

export default SmallListItem;
