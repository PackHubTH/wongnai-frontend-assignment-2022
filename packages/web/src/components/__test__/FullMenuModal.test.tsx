import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import FullMenuModal from "@components/FullMenuModal";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const menuTemp = {
  name: "Egg",
  id: "Egg",
  discountedPercent: 100,
  discountedTimePeriod: {
    begin: "10:30",
    end: "12:00",
  },
  sold: 100,
  fullPrice: 10,
  totalInStock: 200,
  options: [
    {
      label: "Egg",
      choices: [
        {
          label: "ไข่ดาวไม่สุก Sunny Side Up Egg",
        },
        {
          label: "ไข่ดาวสุก Fully Cooked Fried Egg",
        },
        {
          label: "ไข่ข้น Half Cooked Egg",
        },
        {
          label: "ไข่ออนเซ็น Onsen Egg",
        },
        {
          label: "ไข่เจียว Thai Style Omelette",
        },
      ],
    },
  ],
  popular: "",
};

describe("FullMenuModal", () => {
  it("render FullMenuModal correctly by comparison with name", async () => {
    // const onChange = jest.fn((value) => {});

    const { data } = await axios.get(
      `${"http://localhost:3001"}/227018/full-menu/Egg`
    );

    const client = new QueryClient();
    render(
      <QueryClientProvider client={client}>
        <FullMenuModal
          showModal={true}
          setShowModal={() => {}}
          menuName="Egg"
        />
      </QueryClientProvider>
    );
    const element = screen.getByTestId("full-menu-modal");
    expect(element).toBeInTheDocument();
  });
});
