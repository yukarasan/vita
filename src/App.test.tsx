/**
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import TotalAmount from './components/total_amount/TotalAmount';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';

describe("App", () => {
    it("renders the app", () => {
        render(<App />);
        expect(screen.getByText("Cart")).toBeInTheDocument();
    });
});

// describe("TotalAmount", () => {
//     it("renders total amount and savings correctly", () => {
//         const cart = [
//             {
//               id: "1",
//               name: "Product 1",
//               price: 100,
//               quantity: 2,
//               rebateQuantity: 2,
//               rebatePercent: 50,
//               giftWrap: false,
//               recurringOrder: "none",
//               currency: "DKK",
//               upsellProductId: null
//             },
//             {
//               id: "2",
//               name: "Product 2",
//               price: 200,
//               quantity: 1,
//               rebateQuantity: 1,
//               rebatePercent: 25,
//               giftWrap: false,
//               recurringOrder: "monthly",
//               currency: "DKK",
//               upsellProductId: null
//             },
//           ];

//     render(<TotalAmount cart={cart} />);

//     expect(screen.getByText("Total")).toBeInTheDocument();
//     expect(screen.getByText("Savings")).toBeInTheDocument();
//     expect(screen.getByText("400.00")).toBeInTheDocument(); 
//     expect(screen.getByText("100.00")).toBeInTheDocument(); 
//     });
// });

describe("DeliveryAddress", () => {
    it("renders the delivery address form", () => {
        render(<DeliveryAddress />);
        expect(screen.getByText("Delivery Address")).toBeInTheDocument();
    });
});
**/
