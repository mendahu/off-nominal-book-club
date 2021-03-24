import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export type NewReadingDialogProps = {
  isOpen: boolean;
  close: () => void;
  createReading: () => void;
  loading: boolean;
};

export default function NewReadingDialog(props: NewReadingDialogProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="form-dialogue-title"
    >
      <DialogTitle id="form-dialogue-title">Create a Reading</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Readings are a way for users to read a book together, just like a
          regular book club. Other Book Club members can join your reading, and
          you can set milestones along the way for discussion points.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="default" variant="contained">
          No thanks
        </Button>
        <Button
          onClick={props.createReading}
          color="primary"
          variant="contained"
          startIcon={
            props.loading && <CircularProgress color="inherit" size={20} />
          }
        >
          Create Reading
        </Button>
      </DialogActions>
    </Dialog>
  );
}
