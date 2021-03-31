import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export type DeleteReadingDialogProps = {
  isOpen: boolean;
  close: () => void;
  deleteReading: () => void;
  loading: boolean;
};

export default function DeleteReadingDialog(props: DeleteReadingDialogProps) {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.close}
      aria-labelledby="form-dialogue-title"
    >
      <DialogTitle id="form-dialogue-title">Delete Reading</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will permanently delete the reading. All milestones will be
          deleted and members will be removed from it. This action is
          irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="default" variant="contained">
          Go Back
        </Button>
        <Button
          onClick={props.deleteReading}
          color="secondary"
          variant="contained"
          startIcon={
            props.loading && <CircularProgress color="inherit" size={20} />
          }
        >
          Delete Reading
        </Button>
      </DialogActions>
    </Dialog>
  );
}
