import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FullMenuModal from "@components/FullMenuModal";
import axios from "axios";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("FullMenuModal", () => {
  it("render FullMenuModal correctly by comparison with name", async () => {
    const { data } = await axios.get(
      `${process.env.VITE_BASE_ENDPOINT}/227018/full-menu/Egg`
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
    await waitFor(() => {
      const element = screen.getByTestId("full-menu-modal");
      expect(element).toBeInTheDocument();
    });
  });
});
