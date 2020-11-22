import { QueryResult } from 'pg';
import { ApiTag } from '../../../src/types/api/apiTypes';
import knex from '../../knex';

export const getTagIdByName = (name: string) => {
  return knex.select('id').from('tags').where('name', name);
};

export const addTag = (name: string) => {
  return knex('tags').returning('id').insert({ name });
};

export const getAllTags = () => {
  return knex.raw<QueryResult<ApiTag>>(
    `
      SELECT t.id, t.name AS label, COUNT(tr.id) as count
        FROM tags as t
      JOIN user_tag_book as tr
        ON tr.tag_id = t.id
      GROUP BY t.id
      ORDER BY t.name
    `
  );
};
