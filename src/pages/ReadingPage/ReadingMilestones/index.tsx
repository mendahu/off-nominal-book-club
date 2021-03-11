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
          <LayoutComponent {...rest}>
            <Grid container>
              <Grid item xs={8}>
                <Typography>{milestone.label}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography>
                  🗓 {format(new Date(milestone.date), "E, LLL wo")}
                </Typography>
              </Grid>
            </Grid>
          </LayoutComponent>
        ))}
    </>
  );
}
