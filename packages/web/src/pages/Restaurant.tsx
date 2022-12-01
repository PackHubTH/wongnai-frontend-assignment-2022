import React, { Fragment, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useRestaurantAPI from "@api/RestaurantAPI";
import ShortMenuItem from "@components/ShortMenuItem";
import ShortMenu from "@type/ShortMenu";
import Banner from "@components/Banner";
import Title from "@components/Title";
import Loading from "@pages/Loading";
import Error from "@pages/Error";
import Modal from "@components/FullMenuModal";
import { BiLoader } from "react-icons/bi";
import checkDiscountedPeriod from "@utils/checkDiscountedPeriod";
import SearchBox from "@components/SearchBox";

const Restaurant = () => {
  const { ref, inView } = useInView();
  const [showModal, setShowModal] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [search, setSearch] = useState("");

  const {
    data,
    error,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useRestaurantAPI(import.meta.env.VITE_RESTAURANT_ID);

  useEffect(() => {
    fetchNextPage();
    if (data) document.title = data?.pages[0].name;
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [inView, data, showModal]);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="flex min-h-screen flex-col items-center bg-emerald-200">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        menuName={menuName}
      />
      <Banner image={data?.pages[0].coverImage} />
      <div className="l flex w-11/12 max-w-screen-xl flex-col bg-white">
        <Title {...data?.pages[0]} />
        {/* <SearchBox value={search} onChange={() => setSearch} /> */}
        <div className="grid grid-flow-row grid-cols-1 gap-8 p-4 lg:grid-cols-2">
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.menus.map((item: ShortMenu, index: number) => {
                  // if (
                  //   item.discountedTimePeriod &&
                  //   checkDiscountedPeriod(
                  //     item.discountedTimePeriod,
                  //     item.discountedPercent
                  //   )
                  // )
                  return (
                    <ShortMenuItem
                      key={index}
                      item={item}
                      isFirst={index}
                      onClick={() => {
                        setShowModal(true);
                        setMenuName(item.name);
                      }}
                    />
                  );
                })}
              </Fragment>
            );
          })}
        </div>
        <div className="flex justify-center" ref={ref}>
          {isFetchingNextPage ? (
            <BiLoader className="h-10 w-10 animate-spin" />
          ) : (
            <h1 className="mb-2">Nothing more to load</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
