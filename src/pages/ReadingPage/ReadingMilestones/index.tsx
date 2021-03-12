import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import { format, formatISO } from "date-fns";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { useSnackbarContext } from "../../../contexts/SnackbarContext";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";
import ReadingMilestoneIcon from "./ReadingMilestoneIcon/ReadingMilestoneIcon";

export type ReadingMilestonesProps = {
  milestones: ApiReadingMilestone[];
  hostId: string;
  addMilestone: (label: string, date: string) => void;
  removeMilestone: (milestoneId: string) => void;
  milestoneLoading: boolean;
};

export default function index(props: ReadingMilestonesProps) {
  const { user, loading } = useBookClubUser();
  const triggerSnackbar = useSnackbarContext();
  const [isOpen, setIsOpen] = useState(false);

  const {
    milestones,
    hostId,
    addMilestone,
    removeMilestone,
    milestoneLoading,
    ...rest
  } = props;

  const isHost = user?.onbc_id === Number(hostId);

  const handleAdd = () => {
    setIsOpen(false);
    addMilestone("Chapter 2", formatISO(new Date()));
  };

  const Dialogue = () => {
    return (
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(!isOpen)}
        aria-labelledby="form-dialogue-title"
      >
        <DialogTitle id="form-dialogue-title">
          Add a Reading Milestone
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Milestones help mark points in a Reading that participants should
            try to reach! They are great places to start, stop and discuss parts
            of the book.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setIsOpen(!isOpen)}
            color="default"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary" variant="contained">
            Add Milestone
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const AddButton = () => {
    if (!isHost) {
      return null;
    } else {
      return (
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsOpen(!isOpen)}
            startIcon={
              milestoneLoading && <CircularProgress color="inherit" size={20} />
            }
          >
            {milestoneLoading ? "Adding..." : "Add Milestone"}
          </Button>
        </Grid>
      );
    }
  };

  return (
    <>
      <LayoutComponent {...rest}>
        <Grid container>
          <Grid item xs={isHost ? 8 : 12}>
            <Typography variant="h5" component="h1">
              Reading Schedule
            </Typography>
          </Grid>
          <AddButton />
        </Grid>
      </LayoutComponent>

      {milestones &&
        milestones.map((milestone) => (
          <LayoutComponent {...rest} key={milestone.id}>
            <Grid container>
              <Grid item xs={12} md={7}>
                <Typography component="p" variant="h6">
                  {milestone.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="p" variant="h6">
                  🗓 {format(new Date(milestone.date), "EEE, MMM do")}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <ReadingMilestoneIcon
                  onClick={() => removeMilestone(milestone.id)}
                />
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
      <Dialogue />
    </>
  );
}
