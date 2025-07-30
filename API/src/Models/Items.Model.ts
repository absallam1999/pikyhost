import { db } from '../Config/index';
import { ResultSetHeader } from 'mysql2';

export class SectionItemModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM section_items ORDER BY `order_index` ASC');
    return rows;
  }

  static async getBySectionId(sectionId: number) {
    const [rows] = await db.query(
      'SELECT * FROM section_items WHERE `section_id` = ? ORDER BY `order_index` ASC',
      [sectionId]
    );
    return rows;
  }

  static async getById(id: number) {
    const [rows] = await db.query('SELECT * FROM section_items WHERE `id` = ?', [id]);
    return Array.isArray(rows) ? rows[0] : null;
  }

  static async create(data: {
    section_id: number;
    title?: string;
    body_en?: any;
    body_ar?: any;
    subtitle_en?: string;
    subtitle_ar?: string;
    description_en?: string;
    description_ar?: string;
    pricing?: string;
    order_index?: number;
  }) {
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO section_items 
      (section_id, title, body_en, body_ar, subtitle_en, subtitle_ar, description_en, description_ar, pricing, order_index) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.section_id,
        data.title || null,
        data.body_en ? JSON.stringify(data.body_en) : null,
        data.body_ar ? JSON.stringify(data.body_ar) : null,
        data.subtitle_en || null,
        data.subtitle_ar || null,
        data.description_en || null,
        data.description_ar || null,
        data.pricing || null,
        data.order_index ?? 0
      ]
    );

    return {
      id: result.insertId,
      ...data
    };
  }

  static async update(
    id: number,
    data: {
      title?: string;
      body_en?: any;
      body_ar?: any;
      subtitle_en?: string;
      subtitle_ar?: string;
      description_en?: string;
      description_ar?: string;
      pricing?: string;
      order_index?: number;
    }
  ) {
    const [result] = await db.query(
      `UPDATE section_items 
      SET title = ?, body_en = ?, body_ar = ?, subtitle_en = ?, subtitle_ar = ?, description_en = ?, description_ar = ?, pricing = ?, order_index = ? 
      WHERE id = ?`,
      [
        data.title || null,
        data.body_en ? JSON.stringify(data.body_en) : null,
        data.body_ar ? JSON.stringify(data.body_ar) : null,
        data.subtitle_en || null,
        data.subtitle_ar || null,
        data.description_en || null,
        data.description_ar || null,
        data.pricing || null,
        data.order_index ?? 0,
        id
      ]
    );
    return result;
  }

  static async deleteById(id: number) {
    const [result] = await db.query('DELETE FROM section_items WHERE `id` = ?', [id]);
    return result;
  }

  static async deleteBySectionId(sectionId: number) {
    const [result] = await db.query('DELETE FROM section_items WHERE `section_id` = ?', [sectionId]);
    return result;
  }
}
