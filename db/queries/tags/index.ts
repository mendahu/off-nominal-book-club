import knex from '../../knex';

export const add = (input: string) => {
  if (!input) {
    throw new Error('Cannot add tag of null value');
  }

  const tagName = input.toLowerCase();

  return knex
    .select('id')
    .from('tags')
    .where('name', tagName)
    .then((res) =>
      res.length
        ? [res[0].id]
        : knex('tags').returning('id').insert({ name: tagName })
    )
    .catch((err) => {
      throw new Error(err);
    });
};

export const getAllTags = () => {
  return knex
    .raw(
      `
      SELECT t.id, t.name AS label, COUNT(tr.id) as count
        FROM tags as t
        JOIN user_tag_book as tr
        ON tr.tag_id = t.id
        GROUP BY t.id
        ORDER BY t.name
      `
    )
    .catch(() => {
      throw new Error('Error reading database.');
    });
};

export default {
  add,
  getAllTags,
};
