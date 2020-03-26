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
  Card,
  Typography,
  Button,
  Avatar,
  CardActionArea,
  Container
} from "@material-ui/core";
import Link from "next/link";
import PeopleIcon from "@material-ui/icons/People";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    width: "100%"
  },
  card: {
    display: "flex",
    width: "100%",
    height: "7vh",
    flexDirection: "row",
    margin: "2px",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
      flexWrap: "wrap",
      width: "100%",
      height: "11vh",
      flexDirection: "row"
    }
  },
  imageContainer: {
    height: "7vh",
    width: "7vh",
    padding: "5px",
    marginLeft: "0",
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
    display: "flex",
    flexDirection: "row",
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
      <Link
        href={`${props.link}/[id]`}
        as={`${props.link}/${props.item.id}`}
        passHref>
        <Card className={classes.card}>
          <Container className={classes.imageContainer}>
            <Avatar
              variant='rounded'
              className={classes.image}
              alt={props.item[props.displayData.title]}
              src={props.item[props.displayData.image]}
            />
          </Container>
          <Container className={classes.dataContainer}>
            <Container className={classes.titleContainer}>
              <Typography className={classes.title} variant='subtitle1'>
                {props.item[props.displayData.title]}
              </Typography>
            </Container>
            {props.displayData.secondary && (
              <Container className={classes.secondaryContainer}>
                {props.item.user_count && <PeopleIcon color='primary' />}
                <Typography
                  className={classes.secondary}
                  variant='subtitle2'
                  color='primary'>
                  {props.item[props.displayData.secondary]}
                </Typography>
              </Container>
            )}
            {props.item.rating && (
              <Container className={classes.secondaryContainer}>
                <Rating
                  className={classes.secondary}
                  name='read-only'
                  value={props.item.rating}
                  readOnly
                />
              </Container>
            )}
          </Container>
        </Card>
      </Link>
    </Button>
  );
}
