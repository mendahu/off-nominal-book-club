import { QueryUserMetadatum } from '../../../src/types/query';
import knex from '../../knex';

export const getUserData = (userId: string, bookId?: string) => {
  return knex
    .select<QueryUserMetadatum[]>(
      knex.raw('book_id, reads_id, wishlist_id, favourites_id')
    )
    .from(
      knex.raw(
        `(SELECT 
        b.id::integer as book_id, 
        (SELECT id FROM reads WHERE reads.book_id = b.id AND reads.user_id = :userId)::integer as reads_id ,
        (SELECT id FROM wishlist WHERE wishlist.book_id = b.id AND wishlist.user_id = :userId)::integer as wishlist_id,
        (SELECT id FROM favourites WHERE favourites.book_id = b.id AND favourites.user_id = :userId)::integer as favourites_id 
      FROM books as b
      GROUP BY book_id
      ORDER BY book_id) as m
    `,
        { userId }
      )
    )
    .modify<any, QueryUserMetadatum[]>(function (queryBuilder) {
      if (bookId) {
        queryBuilder.whereRaw(
          '(m.reads_id IS NOT NULL OR m.wishlist_id IS NOT NULL OR m.favourites_id IS NOT NULL) AND m.book_id = ?',
          bookId
        );
      } else {
        queryBuilder.whereRaw(
          '(m.reads_id IS NOT NULL OR m.wishlist_id IS NOT NULL OR m.favourites_id IS NOT NULL)'
        );
      }
    });
};
