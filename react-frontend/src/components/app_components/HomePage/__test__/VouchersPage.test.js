import React from "react";
import { render, screen } from "@testing-library/react";

import VouchersPage from "../VouchersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vouchers page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <VouchersPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("vouchers-datatable")).toBeInTheDocument();
  expect(screen.getByRole("vouchers-add-button")).toBeInTheDocument();
});
