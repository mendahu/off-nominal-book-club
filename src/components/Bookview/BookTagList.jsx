import { makeStyles } from '@material-ui/core/styles';
import { 
  Avatar, 
  Chip, 
  Grid,
  Paper } from "@material-ui/core";
import { useState } from 'react';
import axios from 'axios';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  tagInput: {
    borderRadius: "2px",
    border: "none",
    backgroundColor: "#f0f0f0",
  }
}));

const BookTagList = (props) => {
  const classes = useStyles();

  const [ state, setState ] = useState({
    tags: props.tags || [],
    userTags: props.userTags || [],
    addMode: false
  })

  const [ newTagInput, setNewTagInput ] = useState("")
  
  //helper function to check if tag count is too high
  const hasTooManyTags = () => (state.userTags.length >= 5)

  //default tag object to submit new tag relationship
  const userTagBook = {
      userId: props.userId,
      bookId: props.bookId,
    }

  const toggleTag = (tagName, tagId) => {

    //create shallow copy of book tags state for mutating, find the index of the selected tag
    const newTags = [...state.tags]
    const tagIndex = newTags.findIndex((tag) => tag.tag_name === tagName)

    //locate the index of the tag relationship in state. -1 is returned if there is no relationship
    const userTagIndex = state.userTags.findIndex((tag) => tag.name === tagName)
    
    //two control flows for if the user has already selected this tag or not
    if (userTagIndex >= 0) { //user has selected this tag already, let's unselect it

      const tagRelId = state.userTags[userTagIndex].tag_rel_id
      const newUserTags = [...state.userTags].filter((tag) => !(tag.name == tagName))
      newTags[tagIndex].count--

      axios.delete(`/api/tagRels/${tagRelId}/delete`)
        .then(() => setState({tags: newTags, userTags: newUserTags}))
        .catch(err => console.error(err))

    } else { //user has not selected this tag already, let's select it
      if (hasTooManyTags()) {
        alert("You can only add up to 5 tags per book.")
        return;
      }
      let selectedTag
      if (tagIndex > -1) {
        selectedTag = newTags[tagIndex]
        selectedTag.count++
      } else {
        selectedTag = {
          tag_id: tagId,
          tag_name: tagName,
          count: 1
        }
      }

      axios.post(`/api/tagRels/new`, {...userTagBook, tagId: selectedTag.tag_id})
        .then((res) => {
          if (tagIndex > -1) {
            return setState({tags: newTags, userTags: [...state.userTags, {tag_id: tagId, tag_rel_id: res.data[0], name: tagName}]})
          } else {
            return setState({tags: [...newTags, selectedTag], userTags: [...state.userTags, {tag_id: tagId, tag_rel_id: res.data[0], name: tagName}]})
          }
        })
        .catch(err => console.error(err))
    }
  }

  const toggleAddMode = () => {
    props.isPatron ? setState({...state, addMode: !state.addMode}) : alert("Only logged in patrons may add tags to books. Consider supporting us for as little as $1/month!")
  }

  const stopClick = (event) => event.stopPropagation();

  const addTag = (e) => {
    e.preventDefault();
    if (!newTagInput) {
      toggleAddMode();
      return;
    }
    if (hasTooManyTags()) {
      alert("You can only add up to 5 tags per book.")
      toggleAddMode();
      setNewTagInput("")
      return;
    }
    axios.post(`/api/tags/new`, { tagName: newTagInput })
        .then(res => toggleTag(newTagInput, res.data[0]))
        .catch(err => console.error(err))
    setNewTagInput("")
    toggleAddMode()
  }

  return (
    <Grid item xs={12}>
      <Paper className={classes.root}>
        {(state.tags.length > 0) &&
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
                  onClick={() => props.isPatron ? toggleTag(t.tag_name, t.tag_id) : alert("Only logged in patrons may add tags to books. Consider supporting us for as little as $1/month!")}
                />)
              }
            })}
            
        <Chip
          key={"add"}
          label={state.addMode 
            ? (
              <form onSubmit={(e) => addTag(e)}>
                <span># 
                  <input 
                    autoFocus
                    type="text" 
                    id="tagInputField" 
                    className={classes.tagInput}
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onClick={(e) => stopClick(e)}>
                  </input>
                  <button type="submit" hidden></button>
                </span>
              </form>
              )
            : "Add Tag"}
          icon={state.addMode ? <DoneIcon></DoneIcon> : <AddCircleIcon></AddCircleIcon>}
          onClick={state.addMode ? (e) => addTag(e) : toggleAddMode}
          className={classes.chip}>
        </Chip> 
      </Paper>
    </Grid>
  )
}

export default BookTagList;