import React from "react";
import { render, screen } from "@testing-library/react";

import VouchersEditDialogComponent from "../VouchersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders vouchers edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <VouchersEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("vouchers-edit-dialog-component"),
  ).toBeInTheDocument();
});
