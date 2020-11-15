import Fuse from 'fuse.js';
import { Book, Tag } from '../../../types/apiTypes';

export default {
  bookOptions: {
    threshold: 0.6,
    keys: [
      {
        name: 'title',
        weight: 0.35,
      },
      {
        name: 'tags.label',
        weight: 0.45,
      },
      {
        name: 'authors_string',
        weight: 0.1,
      },
      {
        name: 'description',
        weight: 0.1,
      },
    ],
  } as Fuse.IFuseOptions<Book>,
  tagOptions: {
    threshold: 0.4,
    keys: [
      {
        name: 'label',
        weight: 0.9,
      },
      {
        name: 'count',
        weight: 0.1,
      },
    ],
  } as Fuse.IFuseOptions<Tag>,
};
