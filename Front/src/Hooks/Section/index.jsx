import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import API from "./../../Services/api"

export function useSection(keyName) {

  const { i18n } = useTranslation();

  return useQuery({
    queryKey: ['section', keyName, i18n.language],
    queryFn: async () => {
      const res = await API.get(`/sections/${keyName}?lang=${i18n.language}`);
      return res.data.data;
    },
  });
}