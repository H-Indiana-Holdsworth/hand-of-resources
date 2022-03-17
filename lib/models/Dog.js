const pool = require('../utils/pool');

module.exports = class Dog {
  id;
  name;
  type;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
  }

  static async insert({ name, type }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
          dogs (name, type)
        VALUES
          ($1, $2)
        RETURNING
          *;
        `,
      [name, type]
    );

    return new Dog(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM 
          dogs
        `
    );

    return rows.map((row) => new Dog(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `
        SELECT
          *
        FROM
          dogs
        WHERE 
          id=$1;
        `,
      [id]
    );

    if (!rows[0]) return null;

    return new Dog(rows[0]);
  }

  static async updateById(id, attributes) {
    const existingDog = await Dog.getById(id);

    const updatedDog = { ...existingDog, ...attributes };

    const name = updatedDog.name ?? existingDog.name;
    const type = updatedDog.type ?? existingDog.type;

    if (!existingDog) {
      const error = new Error(`Dog ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      `
        UPDATE
          dogs
        SET
          name=$2, type=$3
        WHERE
          id=$1
        RETURNING
          *;
        `,
      [id, name, type]
    );

    return new Dog(rows[0]);
  }
};
