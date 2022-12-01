import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const useRestaurantAPI = (restaurantId: string) => {
  // return useQuery(["restaurant"], () => getRestaurant(restaurantId));
  return useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_ENDPOINT}/${restaurantId}?cursor=${pageParam}`
      );
      return data;
    },
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.menus.length === 10) {
        return pages.length + 1;
      }
      return undefined;
    },
  })
};

export default useRestaurantAPI;
