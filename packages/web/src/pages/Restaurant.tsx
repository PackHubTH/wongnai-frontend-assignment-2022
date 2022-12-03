import React, { Fragment, useEffect, useState } from "react";
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
import ButtonGroup from "@components/ButtonGroup";

const Restaurant = () => {
  const [showModal, setShowModal] = useState(false);
  const [menuName, setMenuName] = useState("");
  const [search, setSearch] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  const { data, error, isFetchingNextPage, isLoading, fetchNextPage } =
    useRestaurantAPI(import.meta.env.VITE_RESTAURANT_ID);

  const handleScroll = () => {
    const offset = window.scrollY;
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
  }, []);

  if (isLoading) return <Loading />;

  if (error) return <Error />;

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-200">
      {showModal && (
        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          menuName={menuName}
        />
      )}
      <Banner image={data?.pages[0].coverImage} />
      <div className="flex w-11/12 max-w-screen-xl flex-col bg-white">
        <TitleLayout scrolled={scrolled}>
          <Title {...data?.pages[0]} />
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <SearchBox onChange={(e) => setSearch(e)} />
            <ButtonGroup isDefault={isDefault} setIsDefault={setIsDefault} />
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
                          setMenuName(item.id);
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
            <BiLoader className=" mb-2 h-10 w-10 animate-spin" />
          ) : (
            <h1 className="rounded-t-md bg-gray-700 p-2 pb-4 text-white">
              ท้ายเมนู
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
