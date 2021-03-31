import classes from "*.module.css";
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";
import ReadingMilestoneDialogue from "./ReadingMilestoneDialogue/ReadingMilestoneDialogue";
import ReadingMilestoneIcon from "./ReadingMilestoneIcon/ReadingMilestoneIcon";
import EventIcon from "@material-ui/icons/Event";
import { Delete, DeleteOutline } from "@material-ui/icons";

export type ReadingMilestonesProps = {
  milestones: ApiReadingMilestone[];
  hostId: string;
  addMilestone: (label: string, date: string) => Promise<void>;
  removeMilestone: (milestoneId: string) => Promise<void>;
  milestoneLoading: boolean;
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default function index(props: ReadingMilestonesProps) {
  const classes = useStyles();
  const { user, loading } = useBookClubUser();
  const [isOpen, setIsOpen] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const {
    milestones,
    hostId,
    addMilestone,
    removeMilestone,
    milestoneLoading,
  } = props;

  const isHost = user?.onbc_id === Number(hostId);

  const AddButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setIsOpen(!isOpen)}
          startIcon={
            milestoneLoading && <CircularProgress color="inherit" size={20} />
          }
        >
          {milestoneLoading ? "Adding..." : "Add"}
        </Button>
      </Grid>
    );
  };

  const handleRemove = (id) => {
    return removeMilestone(id).catch((err) => {
      triggerSnackbar({
        active: true,
        message: "Error Deleteing your Milestone",
        severity: "error",
      });
      throw err;
    });
  };

  return (
    <>
      <Paper className={classes.root}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h5" component="h1">
              Schedule
            </Typography>
          </Grid>
          {isHost && <AddButton />}
        </Grid>

        {milestones && (
          <List>
            {milestones.map((milestone) => (
              <ListItem>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText
                  primary={milestone.label}
                  secondary={format(new Date(milestone.date), "EEE, MMM do")}
                />
                {isHost && (
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete">
                      <ReadingMilestoneIcon
                        onClick={() => handleRemove(milestone.id)}
                      />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </Paper>

      <ReadingMilestoneDialogue
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        addMilestone={addMilestone}
      />
    </>
  );
}
