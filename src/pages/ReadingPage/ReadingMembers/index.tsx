import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@material-ui/core";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { ApiReadingMember } from "../../../types/api/apiTypes";

export type ReadingMembersProps = {
  members: ApiReadingMember[];
  hostId?: string;
  joinReading: () => void;
  leaveReading: () => void;
  membershipLoading: boolean;
};

export default function ReadingMembers(props: ReadingMembersProps) {
  const { user, loading } = useBookClubUser();
  const triggerSnackbar = useSnackbarContext();

  const {
    hostId,
    members,
    joinReading,
    leaveReading,
    membershipLoading,
    ...rest
  } = props;

  const isHost = Number(hostId) === user?.onbc_id;
  const isMember = members.find(
    (member) => Number(member.id) === user?.onbc_id
  );

  const validatePatreon = (callback: () => void) => {
    if (!user.isPatron) {
      triggerSnackbar({
        active: true,
        message: "Only premium Book Club members may join readings.",
        severity: "error",
      });
    } else {
      callback();
    }
  };

  const ParticipantButton = () => {
    let color: "primary" | "secondary";
    let label: "Join" | "Leave";
    let labelLoading: "Joining" | "Leaving";
    let clickHandler;

    if (loading || isHost) {
      return null;
    } else if (!isHost && !isMember) {
      color = "primary";
      label = "Join";
      labelLoading = "Joining";
      clickHandler = joinReading;
    } else if (!isHost && isMember) {
      color = "secondary";
      label = "Leave";
      labelLoading = "Leaving";
      clickHandler = leaveReading;
    }

    return (
      <Grid item xs={3}>
        <Button
          variant="contained"
          color={color}
          onClick={() => validatePatreon(clickHandler)}
          startIcon={
            membershipLoading && <CircularProgress size={20} color="inherit" />
          }
        >
          {membershipLoading ? labelLoading : label}
        </Button>
      </Grid>
    );
  };

  return (
    <>
      <LayoutComponent {...rest}>
        <Grid container justify="space-between">
          <Grid item xs={isHost ? 12 : 8}>
            <Typography component="h2" variant="h5">
              Participants
            </Typography>
          </Grid>
          <ParticipantButton />
        </Grid>
      </LayoutComponent>
      {members &&
        members.map((member) => (
          <LayoutComponent {...rest} key={member.id}>
            <Grid container>
              <Grid item xs={2}>
                <Avatar src={member.avatar} />
              </Grid>
              <Grid item xs={8}>
                <Typography component="p" variant="h6">
                  {member.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                {hostId === member.id && <Chip label="Host" color="primary" />}
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
    </>
  );
}
