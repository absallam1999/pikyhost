import express from "express";
import {
  getAllBtns,
  getBtnById,
  createBtn,
  updateBtn,
} from "./../Handlers/Btns.Handler";

const router = express.Router();

router.get("/", getAllBtns);
router.get("/:id", getBtnById);
router.post("/", createBtn);
router.put("/:id", updateBtn);

export default router;
