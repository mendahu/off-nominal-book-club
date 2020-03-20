import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Chip, Paper } from "@material-ui/core";
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const BookTagList = (props) => {
  const classes = useStyles();

  const [ state, setState ] = useState({
    tags: props.tags || {},
    userTags: props.userTags
  })

  console.log("book tags", state.tags)
  console.log("user tags", state.userTags)

  const toggleTag = (tagName, tagId) => {
    const newTags = [...state.tags]
    const tagIndex = newTags.findIndex((tag) => tag.tag_name === tagName)
    
    if (state.userTags.findIndex((tag) => tag.name === tagName) >= 0) {
      const newUserTags = [...state.userTags].filter((tag) => !(tag.name == tagName))
      newTags[tagIndex].count--
      setState({tags: newTags, userTags: newUserTags})
      //send delete db command
    } else {
      newTags[tagIndex].count++
      setState({tags: newTags, userTags: [...state.userTags, {tag_id: tagId, tag_rel_id: 0, name: tagName}]})
      //send add to db command 
    }

  }

  return (
    <Paper className={classes.root}>
        {state.tags &&
          state.tags.map((t, index) => {
            if (t.count) {
              const isUserTag = state.userTags && (state.userTags.findIndex((tag) => tag.tag_id === t.tag_id) >= 0)

              return (
                <Chip
                  key={index}
                  label={"#" + t.tag_name} 
                  avatar={<Avatar>{t.count}</Avatar>}
                  className={classes.chip}
                  color={isUserTag ? "primary" : "default"}
                  onClick={() => toggleTag(t.tag_name, t.tag_id)}
                  onDelete={(t.count === 1 && isUserTag) ? true : false}
                />)
              }
            })}
    </Paper>
  )
}

export default BookTagList;