import API from './../api';

// GET all btns
export const fetchBtns = async () => {
  const res = await API.get("/btns");
  return res.data.data;
};

// GET btn by id
export const fetchBtnById = async (id) => {
  const res = await API.get(`/btns/${id}`);
  return res.data.data;
};

// CREATE a new btn
export const createBtn = async (btn) => {
  const res = await API.post("/btns", btn);
  return res.data;
};

// UPDATE btn
export const updateBtn = async (id, btn) => {
  const res = await API.put(`/btns/${id}`, btn);
  return res.data;
};