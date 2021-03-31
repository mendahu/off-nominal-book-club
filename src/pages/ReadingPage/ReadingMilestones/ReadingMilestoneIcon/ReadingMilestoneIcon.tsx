import { CircularProgress } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useState } from "react";
import { useSnackbarContext } from "../../../../contexts/SnackbarContext";

export type ReadingMilestoneIconProps = {
  onClick: () => Promise<void>;
};

export default function ReadingMilestoneIcon(props: ReadingMilestoneIconProps) {
  const [loading, setLoading] = useState(false);
  const triggerSnackbar = useSnackbarContext();

  const clickHandler = () => {
    setLoading(true);
    props.onClick().catch((err) => {
      setLoading(false);
      triggerSnackbar({
        active: true,
        message: "Error Deleteing your Milestone",
        severity: "error",
      });
    });
  };

  return (
    <>
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <Delete onClick={clickHandler} />
      )}
    </>
  );
}
