import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import API from "./../../Services/api"

export function useSectionWithItems(keyName) {
  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['section-with-items', keyName, i18n.language],
    queryFn: async () => {
        const sectionRes = await API.get(`/sections/${keyName}?lang=${i18n.language}`);
        const section = sectionRes.data.data;

        if (!section) return null;
        
        const itemsRes = await API.get(`/items/section/${section.id}?lang=${i18n.language}`);
      return {
        section,
        items: itemsRes.data.data || [],
      };
    },
  });
}
