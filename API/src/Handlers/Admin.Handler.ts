import { Request, Response } from 'express';
import { AdminPasswordModel } from '../Models/Admin.Model';
import { generateToken } from '../Utils/Util.auth';
import bcrypt from 'bcrypt';

export const AdminPasswordController = {
  async getAll(_req: Request, res: Response) {
    try {
      const passwords = await AdminPasswordModel.getAll();
      res.json({ success: true, data: passwords });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch admin passwords' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
      }

      await AdminPasswordModel.create(password);

      res.status(201).json({ success: true, message: 'Admin password created successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error creating admin password' });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ success: false, message: 'ID is required' });
      }

      await AdminPasswordModel.deleteById(Number(id));
      res.json({ success: true, message: 'Admin password deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error deleting admin password' });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
      }

      const adminPasswords = await AdminPasswordModel.getAll();

      let valid = false;
      for (const entry of adminPasswords) {
        if (await bcrypt.compare(password, entry.password_hash)) {
          valid = true;
          break;
        }
      }

      if (!valid) {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }

      const token = generateToken({ role: 'admin' }, 86400); // 1 day token

      res.json({ success: true, token });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error validating admin password' });
    }
  }
};
