import { db } from "./../Config/index";
import { Btn } from "./../Interfaces/Btn.Interface";

export const BtnsModel = {
  getAll: async (): Promise<Btn[]> => {
    const [rows] = await db.query("SELECT * FROM btns");
    return rows as Btn[];
  },

  getById: async (id: number): Promise<Btn | null> => {
    const [rows] = await db.query("SELECT * FROM btns WHERE id = ?", [id]);
    const btns = rows as Btn[];
    return btns[0] || null;
  },

  create: async (btn: Btn): Promise<number> => {
    const [result] = await db.query("INSERT INTO btns (link, v_link) VALUES (?, ?)", [btn.link, btn.v_link]);
    return (result as any).insertId;
  },

  update: async (id: number, btn: Btn): Promise<void> => {
    await db.query("UPDATE btns SET link = ?, v_link = ? WHERE id = ?", [btn.link, btn.v_link, id]);
  }
};
