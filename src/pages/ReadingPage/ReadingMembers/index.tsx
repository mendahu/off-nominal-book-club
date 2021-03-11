import { Avatar, Grid, Typography } from "@material-ui/core";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { ApiReadingMember } from "../../../types/api/apiTypes";

export type ReadingMembersProps = {
  members: ApiReadingMember[];
};

export default function index(props: ReadingMembersProps) {
  const { ...rest } = props;
  return (
    <>
      <LayoutComponent {...rest}>
        <Typography component="h2" variant="h5">
          Members
        </Typography>
      </LayoutComponent>
      {props.members &&
        props.members.map((member) => (
          <LayoutComponent {...rest} key={member.id}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar src={member.avatar} />
              </Grid>
              <Grid item xs={7}>
                <Typography component="p" variant="h6">
                  {member.name}
                </Typography>
              </Grid>
              <Grid item xs={3}>
                Leave
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
    </>
  );
}
