const pool = require('../utils/pool');

module.exports = class Car {
  id;
  brand;
  type;

  constructor(row) {
    this.id = row.id;
    this.brand = row.brand;
    this.type = row.type;
  }

  static async createCar({ brand, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          cars (brand, type)
        VALUES
          ($1, $2)
        RETURNING
          *
        `,
      [brand, type]
    );

    return new Car(rows[0]);
  }
};
