import { BtnsModel } from "./../../Models/Btns.Model";

export async function initBtns() {
  try {
    const existing = await BtnsModel.getAll();

    if (!Array.isArray(existing) || existing.length === 0) {
      const defaultBtns = [
        {
          link: "localhost:3000/#pricing",
          v_link: "https://www.youtube.com/watch?v=Y1M6hJHHrjM",
        }
      ];

      for (const btn of defaultBtns) {
        await BtnsModel.create(btn);
      }

      console.log("Default buttons created.");
    } else {
      console.log("Buttons already exist.");
    }
  } catch (err) {
    console.error("Failed to initialize buttons:", err);
  }
}
