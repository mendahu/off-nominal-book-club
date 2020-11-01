import knex from '../../knex';

export const getTagIdByName = (name: string) => {
  return knex.select('id').from('tags').where('name', name);
};

export const add = (name: string) => {
  return knex('tags').returning('id').insert({ name });
};

export const getAllTags = () => {
  return knex.raw(
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

export default {
  getTagIdByName,
  add,
  getAllTags,
};
