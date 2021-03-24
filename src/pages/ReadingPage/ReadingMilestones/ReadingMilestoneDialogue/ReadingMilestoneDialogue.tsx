import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { formatISO } from "date-fns";
import { useState } from "react";

export type ReadingMilestoneDialogueProps = {
  isOpen: boolean;
  close: () => void;
  addMilestone: (label: string, date: string) => void;
};

export default function ReadingMilestoneDialogue(
  props: ReadingMilestoneDialogueProps
) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [milestoneLabel, setMilestoneLabel] = useState("");

  const handleAdd = () => {
    props.close();
    props.addMilestone(milestoneLabel, formatISO(selectedDate));
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="form-dialogue-title"
    >
      <DialogTitle id="form-dialogue-title">
        Add a Reading Milestone
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Milestones help mark points in a Reading that participants should try
          to reach! They are great places to start, stop and discuss parts of
          the book.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="label"
          label="Label your milestone"
          type="text"
          fullWidth
          onChange={(event) => setMilestoneLabel(event.target.value)}
          value={milestoneLabel}
        />

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Milestone date"
          value={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="default" variant="contained">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary" variant="contained">
          Add Milestone
        </Button>
      </DialogActions>
    </Dialog>
  );
}
