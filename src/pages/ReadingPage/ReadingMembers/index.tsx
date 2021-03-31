import {
  Avatar,
  Button,
  Chip,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { ApiReadingMember } from "../../../types/api/apiTypes";

export type ReadingMembersProps = {
  members: ApiReadingMember[];
  hostId?: string;
  joinReading: () => void;
  leaveReading: () => void;
  membershipLoading: boolean;
};

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2),
  },
  list: {
    marginTop: theme.spacing(3),
    paddingLeft: 0,
  },
}));

export default function ReadingMembers(props: ReadingMembersProps) {
  const classes = useStyles();
  const { user, loading } = useBookClubUser();
  const triggerSnackbar = useSnackbarContext();
  const router = useRouter();

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

  const handleClick = (id: string) => {
    router.push(`/users/${id}`);
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
      <Grid item>
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
      <Paper>
        <Grid container justify="space-between" className={classes.header}>
          <Grid item>
            <Typography component="h2" variant="h5">
              Members
            </Typography>
          </Grid>
          <ParticipantButton />
        </Grid>

        {members && (
          <List className={classes.list}>
            {members.map((member) => (
              <ListItem button onClick={() => handleClick(member.id)}>
                <ListItemAvatar>
                  <Avatar src={member.avatar} />
                </ListItemAvatar>
                <ListItemText primary={member.name} />

                {hostId === member.id && (
                  <ListItemIcon>
                    <Chip label="Host" color="primary" size="small" />
                  </ListItemIcon>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </>
  );
}
