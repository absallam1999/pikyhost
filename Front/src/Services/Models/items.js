import API from '../api';

export async function fetchSectionItems() {
  const res = await API.get('/items');
  return res.data;
}

export async function fetchSectionItemById(id) {
  const res = await API.get(`/items/${id}`);
  return res.data;
}

export async function fetchItemsBySectionId(section_id) {
  const res = await API.get(`/items/section/${section_id}`);
  return res.data;
}

export async function createSectionItem(data) {
  const res = await API.post('/items', data);
  return res.data;
}

export async function updateSectionItem(id, data) {
  const res = await API.put(`/items/${id}`, data);
  return res.data;
}

export async function deleteSectionItemById(id) {
  const res = await API.delete(`/items/${id}`);
  return res.data;
}

export async function deleteItemsBySectionId(section_id) {
  const res = await API.delete(`/items/section/${section_id}`);
  return res.data;
}
