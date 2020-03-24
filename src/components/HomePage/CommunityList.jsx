import { Grid } from "@material-ui/core";
import CommunityItem from './CommunityItem'

const CommunityList = (props) => { 

  return (
    <Grid container spacing={2} justify='space-evenly'>
      {props.commData.map((community, index) => <CommunityItem key={index} data={community}/>)}
    </Grid>
  )
}

export default CommunityList;