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
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { format } from "date-fns";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";
import ReadingMilestoneDialogue from "./ReadingMilestoneDialogue/ReadingMilestoneDialogue";
import ReadingMilestoneIcon from "./ReadingMilestoneIcon/ReadingMilestoneIcon";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EventIcon from "@material-ui/icons/Event";
import ReadingMilestone from "./ReadingMilestone/ReadingMilestone";

export type ReadingMilestonesProps = {
  milestones: ApiReadingMilestone[];
  hostId: string;
  addMilestone: (label: string, date: string) => Promise<void>;
  removeMilestone: (milestoneId: string) => Promise<void>;
  editMilestone: (
    milestoneId: string,
    label: string,
    date: string
  ) => Promise<void>;
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
  const [mode, setMode] = useState("add");

  const {
    milestones,
    hostId,
    addMilestone,
    editMilestone,
    removeMilestone,
    milestoneLoading,
  } = props;

  const isHost = user?.onbc_id === Number(hostId);

  const handleAdd = () => {
    setMode("add");
    setIsOpen(true);
  };

  const handleEdit = () => {
    setMode("edit");
    setIsOpen(true);
  };

  const AddButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          startIcon={
            milestoneLoading && <CircularProgress color="inherit" size={20} />
          }
        >
          {milestoneLoading ? "Adding..." : "Add"}
        </Button>
      </Grid>
    );
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
              <ReadingMilestone
                id={milestone.id}
                label={milestone.label}
                date={milestone.date}
                showMenu={isHost}
                deleteMilestone={removeMilestone}
              />
            ))}
          </List>
        )}
      </Paper>

      <ReadingMilestoneDialogue
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        addMilestone={addMilestone}
        editMilestone={editMilestone}
        mode={mode}
      />
    </>
  );
}
