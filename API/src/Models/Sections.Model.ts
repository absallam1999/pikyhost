import { db } from "../Config/index";
import { ResultSetHeader } from 'mysql2';

export class SectionModel {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM sections");
    return rows;
  }

  static async getByKeyName(keyName: string) {
    const [rows] = await db.query(
      "SELECT * FROM sections WHERE `key_name` = ?",
      [keyName]
    );
    return Array.isArray(rows) ? rows[0] : null;
  }

static async create(data: {
  key_name: string;
  title?: string;
  description?: any;
  subtitle_en?: string;
  subtitle_ar?: string;
  description_en?: string;
  description_ar?: string;
  button_label?: string;
}) {
  const [result] = await db.query<ResultSetHeader>(
    `INSERT INTO sections 
    (key_name, title, description, subtitle_en, subtitle_ar, description_en, description_ar, button_label) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.key_name,
      data.title || null,
      JSON.stringify(data.description || null),
      data.subtitle_en || null,
      data.subtitle_ar || null,
      data.description_en || null,
      data.description_ar || null,
      data.button_label || null,
    ]
  );

  return {
    id: result.insertId,
    ...data
  };
}

  static async update(
    keyName: string,
    data: {
      title?: string;
      description?: any;
      subtitle_en?: string;
      subtitle_ar?: string;
      description_en?: string;
      description_ar?: string;
      button_label?: string;
    }
  ) {
    const [result] = await db.query(
      `UPDATE sections 
      SET title = ?, description = ?, subtitle_en = ?, subtitle_ar = ?, description_en = ?, description_ar = ?, button_label = ?
      WHERE key_name = ?`,
      [
        data.title || null,
        JSON.stringify(data.description || null),
        data.subtitle_en || null,
        data.subtitle_ar || null,
        data.description_en || null,
        data.description_ar || null,
        data.button_label || null,
        keyName,
      ]
    );
    return result;
  }

  static async deleteByKeyName(keyName: string) {
    const [result] = await db.query(
      "DELETE FROM sections WHERE `key_name` = ?",
      [keyName]
    );
    return result;
  }
}
