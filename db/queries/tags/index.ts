import { QueryResult } from 'pg';
import { ApiTag } from '../../../src/types/api/apiTypes';
import knex from '../../knex';

export const getTagIdByName = (name: string) => {
  return knex.select('id').from('tags').where('name', name);
};

export const addTag = (name: string) => {
  return knex('tags').returning('id').insert({ name });
};

export enum SortBy {
  label = 'label',
  count = 'count',
}

export const getAllTags = (sortBy = SortBy.label) => {
  return knex<ApiTag[]>('tags as t')
    .join<ApiTag[]>('user_tag_book as tr', 'tr.tag_id', 't.id')
    .select<ApiTag[]>('t.id', 't.name as label')
    .count<ApiTag[]>('tr.id as count')
    .groupBy<ApiTag[]>('t.id')
    .orderBy(sortBy, sortBy === SortBy.count ? 'DESC' : 'ASC');
};
