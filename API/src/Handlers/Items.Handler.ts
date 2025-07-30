import { Request, Response } from 'express';
import { SectionItemModel } from '../Models/Items.Model';

export const SectionItemController = {
  async getAll(_req: Request, res: Response) {
    try {
      const items = await SectionItemModel.getAll();
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Failed to fetch section items' });
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ success: false, message: 'ID is required' });

      const item = await SectionItemModel.getById(Number(id));
      if (!item) return res.status(404).json({ success: false, message: 'Section item not found' });

      res.json({ success: true, data: item });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching section item' });
    }
  },

  async getBySectionId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ success: false, message: 'Section ID is required' });

      const items = await SectionItemModel.getBySectionId(Number(id));
      res.json({ success: true, data: items });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error fetching section items by section ID' });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const {
        section_id,
        title,
        body_en,
        body_ar,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        pricing,
        order_index
      } = req.body;

      if (!section_id) return res.status(400).json({ success: false, message: 'Section ID is required' });

      await SectionItemModel.create({
        section_id: Number(section_id),
        title,
        body_en,
        body_ar,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        pricing,
        order_index
      });

      res.status(201).json({ success: true, message: 'Section item created successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error creating section item' });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        body_en,
        body_ar,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        pricing,
        order_index
      } = req.body;

      if (!id) return res.status(400).json({ success: false, message: 'ID is required' });

      await SectionItemModel.update(Number(id), {
        title,
        body_en,
        body_ar,
        subtitle_en,
        subtitle_ar,
        description_en,
        description_ar,
        pricing,
        order_index
      });

      res.json({ success: true, message: 'Section item updated successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error updating section item' });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ success: false, message: 'ID is required' });

      await SectionItemModel.deleteById(Number(id));
      res.json({ success: true, message: 'Section item deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error deleting section item' });
    }
  },

  async deleteBySectionId(req: Request, res: Response) {
    try {
      const { section_id } = req.params;
      if (!section_id) return res.status(400).json({ success: false, message: 'Section ID is required' });

      await SectionItemModel.deleteBySectionId(Number(section_id));
      res.json({ success: true, message: 'All section items for this section deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Error deleting section items by section ID' });
    }
  }
};
