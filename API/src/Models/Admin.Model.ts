import { db } from '../Config/index';
import AdminPassword from '../Interfaces/AdminPassword.Interface';
import bcrypt from 'bcrypt';

export class AdminPasswordModel {
  static async getAll() {
    const [rows] = await db.query('SELECT * FROM admin_passwords');
    return rows as AdminPassword[];
  }

  static async create(plainPassword: string) {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    const [result] = await db.query(
      'INSERT INTO admin_passwords (`password_hash`, `created_at`) VALUES (?, NOW())',
      [hashedPassword]
    );
    return result;
  }

  static async deleteById(id: number) {
    const [result] = await db.query('DELETE FROM admin_passwords WHERE id = ?', [id]);
    return result;
  }

  static async exists(plainPassword: string) {
    const [rows]: any = await db.query('SELECT `password_hash` FROM admin_passwords');
    return rows.some((row: any) => bcrypt.compareSync(plainPassword, row.password_hash));
  }
}
