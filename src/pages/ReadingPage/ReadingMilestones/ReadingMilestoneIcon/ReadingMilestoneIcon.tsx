import { CircularProgress } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import { useState } from "react";

export type ReadingMilestoneIconProps = {
  onClick: () => Promise<void>;
};

export default function ReadingMilestoneIcon(props: ReadingMilestoneIconProps) {
  const [loading, setLoading] = useState(false);

  const clickHandler = () => {
    setLoading(true);
    return props.onClick().catch((err) => {
      setLoading(false);
      console.log("yerp");
      throw err;
    });
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
