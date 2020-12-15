import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';
import { makeStyles, Theme } from '@material-ui/core/styles';
import clsx from 'clsx';

export type DrawerItemProps = {
  url: string;
  text: string;
  icon: JSX.Element;
  extraPadding?: boolean;
};

const useStyles = makeStyles((theme: Theme) => ({
  lowerPadding: {
    paddingBottom: theme.spacing(2),
  },
}));

const DrawerItem = ({
  url,
  text,
  icon,
  extraPadding = false,
}: DrawerItemProps) => {
  const classes = useStyles();

  return (
    <Link href={url} passHref>
      <ListItem button className={clsx(extraPadding && classes.lowerPadding)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default DrawerItem;
