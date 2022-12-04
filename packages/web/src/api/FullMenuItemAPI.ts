import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useFullMenuItemAPI = (restaurantId: string, menuName: string) => {
  return useQuery({
    queryKey: ["fullMenu", menuName],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.VITE_BASE_ENDPOINT}/${restaurantId}/full-menu/${menuName}`
      );
      return data;
    },
  });
};

export default useFullMenuItemAPI;
