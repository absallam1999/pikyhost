import API from '../api';

export async function fetchSections() {
  const res = await API.get('/sections');
  return res.data;
}

export async function fetchSectionByKeyName(key_name) {
  const res = await API.get(`/sections/${key_name}`);
  return res.data;
}

export async function createSection(data) {
  const res = await API.post('/sections', data);
  return res.data;
}

export async function updateSection(key_name, data) {
  const res = await API.put(`/sections/${key_name}`, data);
  return res.data;
}

export async function deleteSection(key_name) {
  const res = await API.delete(`/sections/${key_name}`);
  return res.data;
}
