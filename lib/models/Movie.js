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

    if (!rows[0]) return null;

    return new Movie(rows[0]);
  }

  static async update(id, attributes) {
    const existingMovie = await Movie.getById(id);

    const updatedMovie = { ...existingMovie, ...attributes };

    const title = updatedMovie.title ?? existingMovie.title;
    const genre = updatedMovie.genre ?? existingMovie.genre;

    if (!existingMovie) {
      const error = new Error(`Movie ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      `
        UPDATE
          movies
        SET
          title=$2, genre=$3
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id, title, genre]
    );

    return new Movie(rows[0]);
  }

  static async deleteMovie(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
          movies
        WHERE 
          id=$1
        RETURNING
          *
        `,
      [id]
    );

    return new Movie(rows[0]);
  }
};
