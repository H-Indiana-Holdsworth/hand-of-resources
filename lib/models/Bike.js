const pool = require('../utils/pool');

module.exports = class Bike {
  id;
  brand;
  type;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.type = row.type;
  }

  static async insert({ brand, type }) {
    const { rows } = await pool.query(
      `
    INSERT INTO
      bikes (brand, type)
    VALUES
      ($1, $2)
    RETURNING
      *;
    `,
      [brand, type]
    );

    return new Bike(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT 
          * 
        FROM 
          bikes
          `
    );

    return rows.map((row) => new Bike(row));
  }
};
