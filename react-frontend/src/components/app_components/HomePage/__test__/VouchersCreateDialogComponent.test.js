import React from "react";
import { render, screen } from "@testing-library/react";

import VouchersCreateDialogComponent from "../VouchersCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vouchers create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <VouchersCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("vouchers-create-dialog-component"),
  ).toBeInTheDocument();
});
