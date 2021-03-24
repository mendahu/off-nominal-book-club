import { Button, CircularProgress, Grid, Typography } from "@material-ui/core";
import { format } from "date-fns";
import { useState } from "react";
import { useBookClubUser } from "../../../../lib/bookClubUser";
import LayoutComponent from "../../../components/General/LayoutComponent";
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

export default function index(props: ReadingMilestonesProps) {
  const { user, loading } = useBookClubUser();
  const [isOpen, setIsOpen] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const {
    milestones,
    hostId,
    addMilestone,
    removeMilestone,
    milestoneLoading,
    ...rest
  } = props;

  const isHost = user?.onbc_id === Number(hostId);

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
                  onClick={() => handleRemove(milestone.id)}
                />
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
      <ReadingMilestoneDialogue
        isOpen={isOpen}
        close={() => setIsOpen(false)}
        addMilestone={props.addMilestone}
      />
    </>
  );
}
