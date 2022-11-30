import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import useRestaurantAPI from "@api/RestaurantAPI";
import ShortMenuItem from "@components/ShortMenuItem";
import ShortMenu from "@type/ShortMenu";
import Banner from "@components/Banner";
import Title from "@components/Title";
import { BiLoader } from "react-icons/bi";
import Loading from "@pages/Loading";
import Error from "@pages/Error";

const Restaurant = () => {
  const restaurant = useRestaurantAPI(import.meta.env.VITE_RESTAURANT_ID);
  const { data } = restaurant;
  // if (data.isLoading) {
  //   return <div>Loading...</div>;
  // }
  if (restaurant.isLoading) return <Loading />;

  if (restaurant.error) return <Error />;

  return (
    <div className="flex flex-col items-center bg-emerald-200">
      {/* Banner */}
      <Banner image={data.coverImage} />
      {/* Restaurant info */}
      <div className="flex w-11/12 max-w-screen-xl flex-col bg-white">
        {/* Restaurant title */}
        <Title {...data} />
        {/* Restaurant menus */}
        <div className="grid grid-flow-row grid-cols-1 gap-8 p-4 lg:grid-cols-2">
          {data.menus.map((item: ShortMenu, index: number) => (
            <ShortMenuItem key={index} item={item} isFirst={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
