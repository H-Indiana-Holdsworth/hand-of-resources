const pool = require('../utils/pool');

module.exports = class Movie {
  id;
  title;
  genre;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
  }

  static async insert({ title, genre }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          movies (title, genre)
        VALUES
          ($1, $2)
        RETURNING
          *
        `,
      [title, genre]
    );

    return new Movie(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM 
          movies
        `
    );

    return rows.map((row) => new Movie(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          movies
        WHERE
        id=$1
        `,
      [id]
    );

    return new Movie(rows[0]);
  }
};
