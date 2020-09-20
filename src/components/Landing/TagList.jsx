import {
  Box,
  Paper,
  Chip,
  Avatar,
  makeStyles,
  GridList,
  GridListTile,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: 'auto',
    width: '100%',
  },
  chip: {
    margin: theme.spacing(1),
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  listItem: {
    height: '100%!important',
    width: 'auto!important',
  },
}));

export default function TagList(props) {
  const classes = useStyles();
  const tags = props.tags || [];

  return (
    <Box component="section">
      <Paper className={classes.root}>
        <GridList className={classes.gridList}>
          {tags.slice(0, 10).map((tag, index) => (
            <GridListTile key={index} classes={{ root: classes.listItem }}>
              <Chip
                onClick={() => props.onClick(tag.tag_name)}
                label={'#' + tag.tag_name}
                avatar={<Avatar>{tag.count}</Avatar>}
                className={classes.chip}
              />
            </GridListTile>
          ))}
        </GridList>
      </Paper>
    </Box>
  );
}
