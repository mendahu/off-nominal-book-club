import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import { Dispatch, SetStateAction, useState } from "react";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";

export type ReadingMilestoneDialogueProps = {
  isOpen: boolean;
  close: () => void;
  label: string;
  setLabel: (label: string) => void;
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  addMilestone: () => Promise<any>;
  editMilestone: () => Promise<void>;
  mode: "add" | "edit";
};

export default function ReadingMilestoneDialogue(
  props: ReadingMilestoneDialogueProps
) {
  const [labelError, setLabelError] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const handleAdd = () => {
    if (props.label === "") {
      return setLabelError(true);
    }
    setLabelError(false);
    props.close();
    props.addMilestone().catch((err) => {
      triggerSnackbar({
        active: true,
        variant: "error",
        message: "Error creating milestone.",
      });
    });
  };

  const handleEdit = () => {
    if (props.label === "") {
      return setLabelError(true);
    }
    setLabelError(false);
    props.close();
    props.editMilestone().catch((err) => {
      triggerSnackbar({
        active: true,
        variant: "error",
        message: "Error editing milestone.",
      });
    });
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
          error={labelError}
          helperText={labelError && "Please enter a label"}
          autoFocus
          margin="dense"
          id="label"
          label="Label your milestone"
          type="text"
          fullWidth
          onChange={(event) => {
            const newLabel = event.target.value;
            if (newLabel !== "") {
              setLabelError(false);
            } else {
              setLabelError(true);
            }
            props.setLabel(newLabel);
          }}
          value={props.label}
        />

        <KeyboardDateTimePicker
          variant="inline"
          format="MM/dd/yyyy HH:mm"
          margin="normal"
          id="date-picker-inline"
          label="Milestone date"
          value={props.date}
          onChange={(date) => props.setDate(date)}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="default" variant="contained">
          Cancel
        </Button>
        <Button
          onClick={props.mode === "edit" ? handleEdit : handleAdd}
          color="primary"
          variant="contained"
        >
          {props.mode === "edit" ? "Update Milestone" : "Add Milestone"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
