import { CircularProgress } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { useState } from "react";

export type ReadingMilestoneIconProps = {
  onClick: () => void;
};

export default function ReadingMilestoneIcon(props: ReadingMilestoneIconProps) {
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    props.onClick();
  };

  return (
    <>
      {loading ? (
        <CircularProgress color="inherit" size={20} />
      ) : (
        <DeleteOutline color="secondary" onClick={clickHandler} />
      )}
    </>
  );
}
