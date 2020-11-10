import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';

export type DrawerItemProps = {
  url: string;
  text: string;
  icon: JSX.Element;
};

const DrawerItem = ({ url, text, icon }: DrawerItemProps) => {
  return (
    <Link href={url} passHref>
      <ListItem button>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Link>
  );
};

export default DrawerItem;
