import Paper from "@material-ui/core/Paper";
import CommunityItem from './CommunityItem'

const CommunityList = (props) => { 

  return (
    <section>
      {props.commData.map((community, index) => <CommunityItem key={index} data={community}/>)}
    </section>
  )
}

export default CommunityList;