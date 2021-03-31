import {
  CircularProgress,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from "@material-ui/core";
import EventIcon from "@material-ui/icons/Event";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { format } from "date-fns";
import { useState } from "react";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";

export type ReadingMilestoneProps = {
  id: string;
  label: string;
  date: string;
  showMenu: boolean;
  deleteMilestone: (id: string) => Promise<void>;
  editMilestone: (id: string, label: string, date: string) => Promise<void>;
};

export default function ReadingMilestone(props: ReadingMilestoneProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setIsLoading] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const handleEdit = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    setIsLoading(true);
    props
      .deleteMilestone(props.id)
      .catch((err) => {
        triggerSnackbar({
          active: true,
          variant: "error",
          message: "Error deleting milestone.",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <ListItem>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText
          primary={props.label}
          secondary={format(new Date(props.date), "EEE, MMM do h:mm a")}
        />
        {props.showMenu && (
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit">
              {loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : (
                <MoreVertIcon
                  aria-controls="edit-menu"
                  aria-haspopup="true"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                />
              )}
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItem>
      <Menu
        id="edit-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
}
