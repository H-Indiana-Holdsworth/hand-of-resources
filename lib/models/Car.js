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

  static async getAllCars() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cars
        `
    );

    return rows.map((row) => new Car(row));
  }

  static async getCarById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          cars
        WHERE
          id=$1
        `,
      [id]
    );

    if (!rows[0]) return null;

    return new Car(rows[0]);
  }

  static async updateCar(id, attributes) {
    const existingCar = await Car.getCarById(id);

    const updatedCar = { ...existingCar, ...attributes };

    const brand = updatedCar.brand ?? existingCar.brand;
    const type = updatedCar.type ?? existingCar.type;

    if (!existingCar) {
      const error = new Error(`Car ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      `
        UPDATE
          cars 
        SET
          brand=$2, type=$3
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id, brand, type]
    );

    return new Car(rows[0]);
  }

  static async deleteCar(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM
          cars
        WHERE 
          id=$1
        RETURNING
          *
        `,
      [id]
    );

    return new Car(rows[0]);
  }
};
