import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import List from "./List";
import Comments from "../Readings/Comments";

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
    width: "100%"
  }
}));

export default function FullWidthTabs(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

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
          {props.tabs.map((tab, index) => (
            <Tab label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}>
        {props.lists.map((list, index) =>
          Object.keys(list)[0] !== "comments" ? (
            <TabPanel value={value} index={index} dir={theme.direction}>
              <List
                list={list[Object.keys(list)[0]]}
                displayData={props.displayData}
                link={props.link}
              />
            </TabPanel>
          ) : (
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Comments
                comments={list[Object.keys(list)[0]]}
                readingId={props.readingId}
                userId={props.userId}
                joinedUsers={props.joinedUsers}
              />
            </TabPanel>
          )
        )}
      </SwipeableViews>
    </div>
  );
}

// list !== readingData.comments ? (
//   <TabPanel value={value} index={index} dir={theme.direction}>
//     <List list={list} displayData={props.displayData} />
//   </TabPanel>
// ) : (

/* <TabPanel value={value} index={1} dir={theme.direction}>
  <Comments
    comments={props.comments}
    readingId={props.readingId}
    userId={props.userId}
    joinedUsers={props.joinedUsers}
  />
</TabPanel>; */
