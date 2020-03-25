import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

import {
  Paper,
  div,
  Card,
  Typography,
  Button,
  Avatar,
  CardActionArea
} from "@material-ui/core";
import Link from "next/link";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%",
    padding: "2px"
  },
  card: {
    display: "flex",
    width: "100%",
    height: "9vh",
    flexDirection: "row",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      flexWrap: "wrap",
      width: "100%",
      height: "11vh",
      flexDirection: "row"
    }
  },
  imageContainer: {
    height: "9vh",
    width: "9vh",
    padding: "7px",
    [theme.breakpoints.down("xs")]: {
      width: "11vh",
      height: "11vh",
      padding: "4px",
      justifyContent: "center"
    }
  },
  dataContainer: {
    display: "flex",
    width: "85%",
    flexDirection: "row",
    padding: "5px",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      width: "70%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "11vh",
      paddingLeft: "3px"
    }
  },
  titleContainer: {
    margin: 0,
    width: "60%",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-start",
      width: "100%",
      padding: "0",
      width: "auto"
    }
  },
  secondaryContainer: {
    width: "auto",
    margin: 0,
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "flex-start",
      padding: "0"
    }
  },
  secondary: {
    fontSize: "1.5vh",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2vh",
      textAlign: "left"
    }
  },
  title: {
    fontSize: "1.5vh",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      fontSize: "2vh",
      textAlign: "left"
    }
  },
  image: {
    height: "100%",
    width: "100%"
  }
}));

export default function UserBookListItem(props) {
  const classes = useStyles();

  return (
    <Button className={classes.root}>
      <ThemeProvider>
        <Link href={`${props.link}/${props.item.id}`}>
          <Card className={classes.card}>
            <div className={classes.imageContainer}>
              <Avatar
                variant='rounded'
                className={classes.image}
                alt={props.item[props.displayData.title]}
                src={props.item[props.displayData.image]}
              />
            </div>
            <div className={classes.dataContainer}>
              <div className={classes.titleContainer}>
                <Typography className={classes.title} variant='subtitle1'>
                  {props.item[props.displayData.title]}
                </Typography>
              </div>
              {props.displayData.secondary && (
                <div className={classes.secondaryContainer}>
                  <Typography
                    className={classes.secondary}
                    variant='subtitle2'
                    color='primary'>
                    {props.item[props.displayData.secondary]}
                  </Typography>
                </div>
              )}
              {props.item.rating && (
                <div className={classes.secondaryContainer}>
                  <Rating
                    className={classes.secondary}
                    name='read-only'
                    value={props.item.rating}
                    readOnly
                  />
                </div>
              )}
            </div>
          </Card>
        </Link>
      </ThemeProvider>
    </Button>
  );
}
