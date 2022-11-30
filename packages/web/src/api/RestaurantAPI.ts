import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function getRestaurant(restaurantId: string) {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BASE_ENDPOINT}/${restaurantId}`
  );
  return data;
}

const useRestaurantAPI = (restaurantId: string) => {
  // const { data, error, isLoading, isError } = useQuery(
  //   ["restaurant"],
  //   async () => await getRestaurant(restaurantId),
  // );
  // if (isLoading) return <div>Loading...</div>;

  // if (error instanceof Error) return null;
  // console.log(data);

  // return data
  return useQuery(["restaurant"], () => getRestaurant(restaurantId));
};

export default useRestaurantAPI;
