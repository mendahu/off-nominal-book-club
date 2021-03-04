import { Typography } from "@material-ui/core";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";

export type ReadingMilestonesProps = {
  milestones: ApiReadingMilestone[];
};

export default function index(props: ReadingMilestonesProps) {
  const { milestones, ...rest } = props;

  return (
    <LayoutComponent {...rest}>
      <Typography variant="h5" component="h1">
        Reading Schedule
      </Typography>
      <div>
        {milestones &&
          milestones.map((milestone) => (
            <div>
              <Typography>🗓</Typography>
              <Typography>{milestone.date}</Typography>
              <Typography>{milestone.label}</Typography>
            </div>
          ))}
      </div>
    </LayoutComponent>
  );
}
