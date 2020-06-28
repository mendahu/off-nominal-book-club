import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      margin: theme.spacing(2, 0),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    content: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      flex: '1 0 300px',
      order: 2,
      [theme.breakpoints.down('xs')]: {
        order: 3,
        flex: '1 0 100%',
      },
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
    button: {
      alignSelf: 'flex-end',
    },
  })
);

export default function SearchResultsListItem(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <img alt={props.book.title} src={props.book.image_url} />
      <CardContent className={classes.content}>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid>
              <Grid item xs={6}>
                <Typography gutterBottom variant="subtitle1">
                  {props.book.title}
                </Typography>
              </Grid>
              <Typography variant="subtitle1" color="textSecondary">
                {props.book.author && props.book.author[0]}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {props.book.description.split('.')[0]}
              </Typography>
            </Grid>
            <Grid item className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  {
                    props.isSearch === true
                      ? props.selectBook(props.book)
                      : props.redirectToBook(
                          props.book,
                          props.book.authors.map((author) => {
                            return { name: author };
                          })
                        );
                  }
                }}
              >
                <Typography variant="body2">{props.buttonText}</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" color="textSecondary">
              {props.book.year}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
