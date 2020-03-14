import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      margin: "auto"
    },
    image: {
      width: 128,
      height: 128
    },
    img: {
      margin: "auto",
      display: "block",
      maxWidth: "100%",
      maxHeight: "100%"
    }
  })
);

export default function BookNew(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt='complex' src={props.img} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction='column' spacing={2}>
              <Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom variant='subtitle1'>
                    {props.title}
                  </Typography>
                  <Grid item xs={2}>
                    <Typography
                      gutterBottom
                      variant='subtitle1'
                      color='textSecondary'>
                      F
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant='subtitle1' color='textSecondary'>
                  {props.author}
                </Typography>
                <Typography variant='body2' gutterBottom>
                  {props.description}
                </Typography>
              </Grid>
              {/* <Grid item>
              <Button variant='contained' color='primary'>
                <Typography variant='body2'>Add Book</Typography>
              </Button>
            </Grid> */}
            </Grid>
            <Grid item>
              <Typography variant='subtitle1' color='textSecondary'>
                {props.year}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
