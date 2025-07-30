import { Request, Response } from "express";
import { BtnsModel } from "./../Models/Btns.Model";

export const getAllBtns = async (req: Request, res: Response) => {
  try {
    const btns = await BtnsModel.getAll();
    res.json({ success: true, data: btns });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

export const getBtnById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const btn = await BtnsModel.getById(id);
    if (!btn) return res.status(404).json({ success: false, message: "Btn not found" });
    res.json({ success: true, data: btn });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

export const createBtn = async (req: Request, res: Response) => {
  try {
    const { link, v_link } = req.body;
    const id = await BtnsModel.create({ link, v_link });
    res.status(201).json({ success: true, id });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};

export const updateBtn = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { link, v_link } = req.body;
    await BtnsModel.update(id, { link, v_link });
    res.json({ success: true, message: "Updated" });
  } catch (err) {
    res.status(500).json({ success: false, error: (err as Error).message });
  }
};
