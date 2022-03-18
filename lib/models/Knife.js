const pool = require('../utils/pool');

module.exports = class Knife {
  id;
  brand;
  type;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.type = row.type;
  }

  static async createKnife({ brand, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          knives (brand, type)
        VALUES
          ($1, $2)
        RETURNING
          *
        `,
      [brand, type]
    );

    return new Knife(rows[0]);
  }

  static async getKnives() {
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM 
          knives
        `
    );

    return rows.map((row) => new Knife(row));
  }

  static async getKnifeById(id) {
    const { rows } = await pool.query(
      `
        SELECT 
          *
        FROM 
          knives
        WHERE
          id=$1
        `,
      [id]
    );

    return new Knife(rows[0]);
  }
};
