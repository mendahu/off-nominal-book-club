import {
  Button,
  CircularProgress,
  Grid,
  List,
  Paper,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";
import ReadingMilestoneDialogue from "./ReadingMilestoneDialogue/ReadingMilestoneDialogue";

import ReadingMilestone from "./ReadingMilestone/ReadingMilestone";
import { formatISO } from "date-fns";

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
  const [date, setDate] = useState<Date | null>(new Date());
  const [label, setLabel] = useState("");
  const [milestoneId, setMilestoneId] = useState<null | string>(null);

  const {
    milestones,
    hostId,
    addMilestone,
    editMilestone,
    removeMilestone,
    milestoneLoading,
  } = props;

  const isHost = user?.onbc_id === Number(hostId);

  const handleEdit = (id: string, label: string, date: string) => {
    setMode("edit");
    setLabel(label);
    setDate(date);
    setMilestoneId(id);
    setIsOpen(true);
  };

  const handleAdd = () => {
    setIsOpen(false);
    return addMilestone(label, formatISO(date))
      .then(() => {
        setDate(null);
        setLabel("");
      })
      .catch((err) => {
        throw err;
      });
  };

  const toggleAddMode = () => {
    setMode("add");
    setIsOpen(true);
    setLabel("");
    setDate(new Date());
  };

  const AddButton = () => {
    return (
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleAddMode}
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
                editMilestone={handleEdit}
                loading={milestone.loading}
              />
            ))}
          </List>
        )}
      </Paper>

      <ReadingMilestoneDialogue
        isOpen={isOpen}
        label={label}
        date={date}
        setLabel={setLabel}
        setDate={setDate}
        close={() => setIsOpen(false)}
        addMilestone={handleAdd}
        editMilestone={() => editMilestone(milestoneId, label, date)}
        mode={mode}
      />
    </>
  );
}
