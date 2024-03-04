import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import userEvent from "@testing-library/user-event";
//import { debug } from "vitest-preview";
import TotalAmount from './components/total_amount/TotalAmount';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';
import { within } from "@testing-library/react";

describe("App", () => {
    it("renders the app", () => {
        render(<App />);
        expect(screen.getByText("Cart")).toBeInTheDocument();
    });
});

describe("TotalAmount", () => {
    it("renders total amount and savings correctly", () => {
      const cart = [
        {
            id: 1,
            name: "Product 1",
            price: 100,
            quantity: 2,
            rebateQuantity: 2,
            rebatePercent: 50,
            giftWrap: false,
            recurringOrder: false,
            currency: "DKK",
            upsellProductId: ""
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            quantity: 1,
            rebateQuantity: 2,
            rebatePercent: 50,
            giftWrap: false,
            recurringOrder: false,
            currency: "DKK",
            upsellProductId: ""
        },
    ];

    render(<TotalAmount cart={cart} />);

    // Check if "Total" and "Savings" headings are rendered
    expect(screen.getByText("Total")).toBeInTheDocument();
      expect(screen.getByText("Savings")).toBeInTheDocument();
  
      // Check if total amount and savings are calculated correctly with currency formatting
      expect(screen.getByText("400.00")).toBeInTheDocument(); // Total amount should be 400.00 DKK
      expect(screen.getByText("100.00")).toBeInTheDocument(); // Savings should be DKK150.00
    });
  });

describe("DeliveryAddress", () => {
    it("renders the delivery address form", () => {
        render(<DeliveryAddress />);
        expect(screen.getByText("Delivery Address")).toBeInTheDocument();
    });
});
