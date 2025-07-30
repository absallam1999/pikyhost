import API from './../api';

export async function getAllAdminPasswords() {
  const res = await API.get('/admin');
  return res.data;
}

export async function createAdminPassword(password) {
  const res = await API.post('/admin', { password });
  return res.data;
}

export async function deleteAdminPassword(id) {
  const res = await API.delete(`/admin/${id}`);
  return res.data;
}

export async function loginAdmin(password) {
  const res = await API.post('/admin/validate', { password });
  return res.data;
}