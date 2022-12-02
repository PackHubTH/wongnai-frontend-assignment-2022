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
import TitleLayout from "@components/TitleLayout";

const Restaurant = () => {
  // const { ref, inView } = useInView();
  const [showModal, setShowModal] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const {
    data,
    error,
    isFetchingNextPage,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useRestaurantAPI(import.meta.env.VITE_RESTAURANT_ID);

  const handleScroll = () => {
    const offset = window.scrollY;
    // console.log("offset", offset, scrolled);
    if (offset > 322) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    fetchNextPage();
    if (data) document.title = data?.pages[0].name;
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [data, showModal]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  });

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  console.log("search", search);
  return (
    <div className="flex min-h-screen flex-col items-center bg-emerald-200">
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        menuName={menuName}
      />
      <Banner image={data?.pages[0].coverImage} />
      <div className="flex w-11/12 max-w-screen-xl flex-col bg-white">
        <TitleLayout scrolled={scrolled}>
          <Title {...data?.pages[0]} />
          <div className="flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
            <SearchBox onChange={(e) => setSearch(e)} />
            <div className="flex gap-4">
              <a
                className={
                  "relative cursor-pointer font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100" +
                  (isDefault ? " before:scale-x-100" : "")
                }
                onClick={() => setIsDefault(true)}
              >
                Relevant
              </a>
              <a
                className={
                  "relative cursor-pointer font-medium text-indigo-600 before:absolute before:-bottom-1 before:h-0.5 before:w-full before:scale-x-0 before:bg-indigo-600 before:transition hover:before:scale-x-100" +
                  (!isDefault ? " before:scale-x-100" : "")
                }
                onClick={() => setIsDefault(false)}
              >
                Discounted
              </a>
            </div>
          </div>
        </TitleLayout>
        <div className="grid grid-flow-row grid-cols-1 gap-8 p-4 lg:grid-cols-2">
          {data?.pages.map((page, i) => {
            return (
              <Fragment key={i}>
                {page.menus
                  .filter((item: ShortMenu) => {
                    if (isDefault) return true;
                    if (
                      !isDefault &&
                      item.discountedTimePeriod &&
                      checkDiscountedPeriod(
                        item.discountedTimePeriod,
                        item.discountedPercent
                      )
                    )
                      return true;
                    return false;
                  })
                  .filter((item: ShortMenu) => {
                    if (search === "") return true;
                    if (item.name.toLowerCase().includes(search.toLowerCase()))
                      return true;
                    return false;
                  })
                  .map((item: ShortMenu, index: number) => {
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
        <div className="flex justify-center">
          {isFetchingNextPage ? (
            <BiLoader className="h-10 w-10 animate-spin pb-2" />
          ) : (
            <h1 className="rounded-t-md bg-gray-700 p-2 text-white">
              ท้ายเมนู
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
