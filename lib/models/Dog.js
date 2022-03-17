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
};
