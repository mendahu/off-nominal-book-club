import { Grid, Typography } from "@material-ui/core";
import { format } from "date-fns";
import LayoutComponent from "../../../components/General/LayoutComponent";
import { ApiReadingMilestone } from "../../../types/api/apiTypes";

export type ReadingMilestonesProps = {
  milestones: ApiReadingMilestone[];
};

export default function index(props: ReadingMilestonesProps) {
  const { milestones, ...rest } = props;

  return (
    <>
      <LayoutComponent {...rest}>
        <Typography variant="h5" component="h1">
          Reading Schedule
        </Typography>
      </LayoutComponent>

      {milestones &&
        milestones.map((milestone) => (
          <LayoutComponent {...rest} key={milestone.id}>
            <Grid container>
              <Grid item xs={12} md={8}>
                <Typography component="p" variant="h6">
                  {milestone.label}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography component="p" variant="h6">
                  🗓 {format(new Date(milestone.date), "EEE, MMM do")}
                </Typography>
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
    </>
  );
}
