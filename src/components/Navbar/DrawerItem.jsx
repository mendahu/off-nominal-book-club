import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Link from 'next/link';

const DrawerItem = ({ url, text, icon }) => {
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
