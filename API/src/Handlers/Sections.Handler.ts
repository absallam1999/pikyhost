import { Request, Response } from 'express';
import { SectionModel } from '../Models/Sections.Model';

export const SectionsController = {
  async getAll(_req: Request, res: Response) {
    try {
      const sections = await SectionModel.getAll();
      res.json({ success: true, data: sections });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch sections' });
    }
  },

  async getByKeyName(req: Request, res: Response) {
    try {
      const { key_name } = req.params;
      if (!key_name) return res.status(400).json({ success: false, message: 'Key name is required' });

      const section = await SectionModel.getByKeyName(key_name);
      if (!section) return res.status(404).json({ success: false, message: 'Section not found' });

      res.json({ success: true, data: section });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching section' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const {
        key_name,
        title,
        description,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        button_label
      } = req.body;

      if (!key_name) return res.status(400).json({ success: false, message: 'Key name is required' });

      await SectionModel.create({
        key_name,
        title,
        description,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        button_label
      });

      res.status(201).json({ success: true, message: 'Section created successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error creating section' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { key_name } = req.params;
      const {
        title,
        description,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        button_label
      } = req.body;

      if (!key_name) return res.status(400).json({ success: false, message: 'Key name is required' });

      await SectionModel.update(key_name, {
        title,
        description,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        button_label
      });

      res.json({ success: true, message: 'Section updated successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error updating section' });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { key_name } = req.params;
      if (!key_name) return res.status(400).json({ success: false, message: 'Key name is required' });

      await SectionModel.deleteByKeyName(key_name);
      res.json({ success: true, message: 'Section deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error deleting section' });
    }
  }
};
