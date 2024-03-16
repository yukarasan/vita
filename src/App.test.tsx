
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import TotalAmount from './components/total_amount/TotalAmount';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';
import { CartItemType } from './lib/types';
import { UserInformation } from './components/user_information/UserInformation';



describe("App", () => {
    it("renders the app", () => {
        render(<App />);
        expect(screen.getByText("Cart")).toBeInTheDocument();
    });
});

 describe("TotalAmount", () => {
     it("renders total amount and savings correctly", () => {
         const cart: CartItemType[] = [
             {
               id: "1",
               name: "Product 1",
               price: 100,
               quantity: 2,
               rebateQuantity: 2,
               rebatePercent: 50,
               giftWrap: false,
               currency: "DKK",
               upsellProductId: null
             },
             {
              id: "2",
               name: "Product 2",
               price: 200,
               quantity: 1,
               rebateQuantity: 1,
               rebatePercent: 25,
               giftWrap: false,
               currency: "DKK",
               upsellProductId: null
             },
           ];

     render(<TotalAmount cart={cart} />);

     expect(screen.getByText("Total")).toBeInTheDocument();
     expect(screen.getByText("Savings")).toBeInTheDocument();
     expect(screen.getByText("400.00")).toBeInTheDocument(); 
     expect(screen.getByText("150.00")).toBeInTheDocument(); 
     });
 });

describe("DeliveryAddress", () => {
    it("renders the delivery address form", () => {
        render(<DeliveryAddress />);
        expect(screen.getByText("Delivery Address")).toBeInTheDocument();
    });

    it("validates the postal code", async () => {
        render(<DeliveryAddress />);
        const postalCodeInputs = screen.getAllByPlaceholderText("Postal Code");

        for (const postalCodeInput of postalCodeInputs) {
            fireEvent.change(postalCodeInput, { target: { value: '1234' } });
            await waitFor(() => {
                expect(screen.queryByText("Failed to validate zip code.")).not.toBeInTheDocument();
            });
            fireEvent.change(postalCodeInput, { target: { value: '1' } });
            await waitFor(() => {
                expect(screen.getByText("Postal code must be between 1000 and 9999.")).toBeInTheDocument();
            });
        }
    });
    it("validates the email", async () => {
        render(<UserInformation />);
        const emailInput = screen.getByPlaceholderText("E-mail e.g., vita@vita.com");

        fireEvent.change(emailInput, { target: { value: 'invalidemail' }});
        expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    });
});


