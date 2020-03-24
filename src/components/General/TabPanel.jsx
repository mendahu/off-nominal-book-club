import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Typography, Tabs, Tab, AppBar, Box } from "@material-ui/core";
import List from "./List";
import Comments from "../Readings/Comments";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%"
  },
  listContainer: {
    backgroundColor: theme.palette.grey["900"],
    backgroundImage:
      "url('https://www.transparenttextures.com/patterns/light-paper-fibers.png')",
    padding: 0
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  const classes = useStyles();

  return (
    <Typography
      className={classes.find}
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box className={classes.listContainer} p={4}>
          {children}
        </Box>
      )}
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
