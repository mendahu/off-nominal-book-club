import classes from "*.module.css";
import {
  Button,
  CircularProgress,
  Grid,
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
  list: {
    marginTop: theme.spacing(3),
    paddingLeft: 0,
  },
  milestone: {
    marginTop: theme.spacing(3),
    listStyle: "none",
  },
  deleteContainer: {
    textAlign: "right",
    [theme.breakpoints.only("xs")]: {
      paddingTop: theme.spacing(1),
    },
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

        <ul className={classes.list}>
          {milestones &&
            milestones.map((milestone) => (
              <Grid
                container
                key={milestone.id}
                justify="space-between"
                component="li"
                className={classes.milestone}
                spacing={0}
              >
                <Grid container item xs={10}>
                  <Grid item xs={12} sm={8}>
                    <Typography component="span" variant="h6">
                      {milestone.label}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="body2">
                      🗓 {format(new Date(milestone.date), "EEE, MMM do")}
                    </Typography>
                  </Grid>
                </Grid>
                {isHost && (
                  <Grid item xs={2} className={classes.deleteContainer}>
                    <ReadingMilestoneIcon
                      onClick={() => handleRemove(milestone.id)}
                    />
                  </Grid>
                )}
              </Grid>
            ))}
        </ul>
      </Paper>

      <ReadingMilestoneDialogue
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        addMilestone={addMilestone}
      />
    </>
  );
}
