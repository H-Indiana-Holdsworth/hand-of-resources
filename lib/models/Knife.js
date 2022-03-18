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

    if (!rows[0]) return null;

    return new Knife(rows[0]);
  }

  static async updateKnife(id, attributes) {
    const existingKnife = await Knife.getKnifeById(id);

    const updatedKnife = { ...existingKnife, ...attributes };

    const brand = updatedKnife.brand ?? existingKnife.brand;
    const type = updatedKnife.type ?? existingKnife.type;

    if (!existingKnife) {
      const error = new Error(`Knife ${id} not found`);
      error.status = 404;
      throw error;
    }

    const { rows } = await pool.query(
      `
        UPDATE
          knives
        SET
          brand=$2, type=$3
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id, brand, type]
    );

    return new Knife(rows[0]);
  }

  static async deleteKnife(id) {
    const { rows } = await pool.query(
      `
        DELETE FROM 
          knives
        WHERE
          id=$1
        RETURNING
          *
        `,
      [id]
    );

    return new Knife(rows[0]);
  }
};
