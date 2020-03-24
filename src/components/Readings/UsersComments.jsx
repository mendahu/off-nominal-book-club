import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useState } from "react";

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

  const [value, setValue] = useState(0);

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
          <Comments
            comments={props.comments}
            readingId={props.readingId}
            userId={props.userId}
            joinedUsers={props.joinedUsers}
          />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}

// import Layout from "../../src/components/DefaultLayout"
// import BookBanner from "../../src/components/Readings/BookBanner"
// import UsersComments from "../../src/components/Readings/UsersComments"
// import queries from "../../db/queries/readings"
// import UserContext from "../../src/UserContext"
// import TabPanel from "../../src/components/General/TabPanel"
// import { useContext, useState } from "react"

// function ReadingView( {readingData, readingId} ) {
//   const { userId } = useContext(UserContext)

//   const [users, setUsers] = useState(readingData.users)

//   const [usersIdArray, setUsersIdArray] = useState(readingData.users.map(user => {
//     return user.id;
//   }))

//   const displayData = {
//     image: "avatar_url",
//     title: "name",
//   };

//   return (
//     <Layout>
//       {console.log(readingData)}
//       <BookBanner
//         userId={userId}
//         readingId={readingId}
//         book={readingData.book}
//         joinedUsers={usersIdArray}
//         setUsers={setUsers}
//         setJoinedUsers={setUsersIdArray}
//       />
// <TabPanel
//   tabs={["Users", "Comments"]}
//   lists={[readingData.users, readingData.comments]}
//   displayData={displayData}
//   joinedUsers={usersIdArray}
//   userId={userId}
// />
//     </Layout>
//   );
// };

// export async function getServerSideProps(context) {
//   const readingId = context.params.id

//   const readingData = await queries.readings.fetch(readingId)

//   return { props: {readingData, readingId} }
// }
// export default ReadingView;
