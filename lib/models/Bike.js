const pool = require('../utils/pool');
const Dog = require('./Dog');

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

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          bikes
        WHERE
          id=$1
        `,
      [id]
    );

    if (!rows[0]) return null;

    return new Bike(rows[0]);
  }

  static async update(id, attributes) {
    const existingBike = await Bike.getById(id);

    const updatedBike = { ...existingBike, ...attributes };

    const brand = updatedBike.brand ?? existingBike.brand;
    const type = updatedBike.type ?? existingBike.type;

    if (!existingBike) {
      const error = new Error(`Bike ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      `
        UPDATE
          bikes
        SET
          brand=$2, type=$3
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id, brand, type]
    );

    return new Bike(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          bikes
        WHERE
          id=$1
        RETURNING
          *        
          `,
      [id]
    );

    return new Bike(rows[0]);
  }
};
