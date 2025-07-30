import { AdminPasswordModel } from '../../Models/Admin.Model';

export async function initAdminPassword() {
  try {
    const existing = await AdminPasswordModel.getAll();

    if (!Array.isArray(existing) || existing.length === 0) {
      await AdminPasswordModel.create('default@123');
      console.log('Default admin password created.');
    } else {
      console.log('Admin password(s) already exist.');
    }
  } catch (err) {
    console.error('Failed to initialize admin password:', err);
  }
}