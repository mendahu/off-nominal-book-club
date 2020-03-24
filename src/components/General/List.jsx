import ListItem from "./ListItem";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core/styles";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0
  }
}));

export default function List(props) {
  const classes =useStyles()
  return (
    <section className={classes.root}>
      {props.list.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          displayData={props.displayData}
          link={props.link}
        />
      ))}
    </section>
  );
}
