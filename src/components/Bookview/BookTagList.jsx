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
import BookTagItem from './BookTagItem'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(0.5),
  },
  tagInput: {
    borderRadius: "2px",
    border: "none",
    backgroundColor: "#f0f0f0",
  }
}));

const BookTagList = (props) => {

  const classes = useStyles();

  const [ tags, setTags ] = useState(props.tags || [])
  const [ addMode, setAddMode ] = useState(false)
  const [ newTagInput, setNewTagInput ] = useState("")

  //helper function to check if tag count is too high
  const hasTooManyTags = () => (tags.length >= 5)

  //default tag object to submit new tag relationship
  const userTagBook = {
      userId: props.userId,
      bookId: props.bookId,
    }




  const incrementTag = (tag, mutableTags, index) => {

    const { tag_id } = tag;

    const targetTag = { ...tags[index] };
    targetTag.count++
    targetTag.tagRelId = true;
    mutableTags[index] = targetTag;

    setTags(mutableTags)

    return axios.post(`/api/tagRels/new`, { ...userTagBook, tag_id })
      .then(res => {
        targetTag.tagRelId = res.data[0]
        mutableTags[index] = targetTag;
        return setTags(mutableTags)
      })
      .catch(err => {
        throw err
      })
  }

  const decrementTag = (tagRelId, mutableTags, index) => {

    const targetTag = { ...tags[index] };
    
    if (targetTag.count > 1) {
      targetTag.count--
      delete targetTag.tagRelId;
      mutableTags[index] = targetTag
    } else {
      mutableTags.splice(index, 1)
    }

    setTags(mutableTags)

    return axios.delete(`/api/tagRels/${tagRelId}/delete`)
      .catch(err => {
        throw err
      })
  }

  const toggleTag = async (tag, index) => {

    const mutableTags = [ ...tags ] //for altering state
    const backupTags = [ ...tags ] //in case db fails we can reset state and stay in sync

    //two control flows for if we are adding or removing a tag Relationship
    try {
      return await tag.tagRelId 
        ? decrementTag(tag.tagRelId, mutableTags, index) 
        : incrementTag(tag, mutableTags, index)
    }
    catch(error) {
      setTags(backupTags) //reverts changes to state to keep db in sync
      throw error
    }

  }

  const toggleAddMode = () => {
    props.isPatron ? setAddMode(!addMode) : alert("Only logged in patrons may add tags to books. Consider supporting us for as little as $1/month!")
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
        {(tags.length > 0) &&
          tags.map((t, index) => {
            if (t.count) {

              return <BookTagItem 
                key={index}
                tagData={t}
                handleClick={() => toggleTag(t, index)}
              />
              }
            })}
            
        <Chip
          key={"add"}
          label={addMode 
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
          icon={addMode ? <DoneIcon></DoneIcon> : <AddCircleIcon></AddCircleIcon>}
          onClick={addMode ? (e) => addTag(e) : toggleAddMode}
          className={classes.chip}>
        </Chip> 
      </Paper>
    </Grid>
  )
}

export default BookTagList;