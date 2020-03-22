import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import Comments from "./Comments";

import UserList from "./UsersList";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box p={4}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "80vw"
  }
}));

export default function UsersComments(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const users = [
    { id: 1, name: "Jake RobERDs" },
    { id: 2, name: "Matthew Chan" },
    { id: 3, name: "HoHo Hoang" }
  ];

  const comments = [
    {
      name: "Jake RobERDS",
      avatar_url:
        "https://gravatar.com/avatar/360be8daf96cd072088f5a68ca623980?s=400&d=robohash&r=x",
      comment: "I love Space"
    },
    {
      name: "Matthew Chan",
      avatar_url:
        "https://gravatar.com/avatar/360be8daf96cd072088f5a68ca623980?s=400&d=robohash&r=x",
      comment: "I love space, too"
    },
    {
      name: "HoHo Hoang",
      avatar_url:
        "https://gravatar.com/avatar/360be8daf96cd072088f5a68ca623980?s=400&d=robohash&r=x",
      comment: "I like tortles"
    }
  ];
  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='UserBooks'>
          <Tab label='Users' {...a11yProps(0)} />
          <Tab label='Comments' {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <UserList users={props.users} />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Comments comments={comments} />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
