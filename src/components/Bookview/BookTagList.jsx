import { makeStyles } from '@material-ui/core/styles';
import { 
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
  const [ busy, setBusy ] = useState(false)
  
  //helper function to check if tag count is too high
  const hasTooManyTags = () => {
    const userTags = tags.filter(tag => tag.tagRelId)
    return userTags.length >= 5
  }

  //default tag object to submit new tag relationship
  const userTagBook = {
      userId: props.userId,
      bookId: props.bookId,
    }

  const incrementTag = (tag, mutableTags, index, options) => {

    if (hasTooManyTags()) {
      alert("You can only add up to 5 tags per book.")
      throw "user reached tag limit"
    }

    const { increment } = options
    const { tag_id } = tag;

    const targetTag = tag[index] ? { ...tags[index] } : tag;

    if (increment) { //short circuit for when creating a new tag and there is an earlier setState that accomplishes this
      targetTag.count++
      targetTag.tagRelId = true;
      mutableTags[index] = targetTag;
      setTags(mutableTags)
    } 

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
        : incrementTag(tag, mutableTags, index, { increment: true })
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

  const addTag = async (e) => {
    e.preventDefault();

    if (busy) return;

    if (!newTagInput) return toggleAddMode();

    if (hasTooManyTags()) {
      alert("You can only add up to 5 tags per book.")
      toggleAddMode();
      setNewTagInput("")
      return;
    }

    const existingTagIndex = tags.findIndex(tag => tag.tag_name === newTagInput)
    if (existingTagIndex >= 0) {
      if (!tags[existingTagIndex].tagRelId) {
        return toggleTag(tags[existingTagIndex], existingTagIndex)
      } else {
        return alert("you've already added that tag!")
      }
    }

    setBusy(true)

    const newTagIndex = tags.length
    const backupTags = [...tags]
    const newTag = {
      tag_id: true,
      tag_name: newTagInput,
      count: 1,
      tagRelId: true
    }
    const mutableTags = [...tags, newTag]

    setTags(mutableTags)
    toggleAddMode()

    try {
      const tagId = await axios.post(`/api/tags/new`, { tagName: newTagInput })
      newTag.tag_id = tagId.data[0]
      await incrementTag(newTag, mutableTags, newTagIndex, { increment: false })
    }
    catch(error) {
      setTags(backupTags)
      console.error(error)
    }

    setNewTagInput("")
    setBusy(false)
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
                    onChange={(e) => setNewTagInput(e.target.value.toLowerCase())}
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