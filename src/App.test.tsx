import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import TotalAmount from './components/total_amount/TotalAmount';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';
import { UserInformation } from './components/user_information/UserInformation';
import { CartItemType } from './lib/types';

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
    render(
        <DeliveryAddress 
          userInfo={{ 
            name: "Lars Jensen", 
            phone: "45962750", 
            email: "demo@portbase.com",
            companyName: "",
            vatNumber: ""
          }}
          deliveryAddress={{
            addressline1: "hhh",
            addressline2: "",  // Even if it's an empty string, it needs to be included
            city: "Frederikssund",
            postalCode: "3600",
            country: "Denmark"
          }}
          billingAddress={{
            addressline1: "hhh",
            addressline2: "",
            city: "Frederikssund",
            postalCode: "3600",
            country: "Denmark"
          }}
          setUserInfo={() => {}}
          setDeliveryAddress={() => {}}
          setBillingAddress={() => {}}
        />
      );
      
    expect(screen.getByText("Delivery Address")).toBeInTheDocument();
  });

  // ... Other tests for DeliveryAddress

  describe("UserInformation", () => {
    it("validates the email", async () => {
      const mockSetUserInfo = vi.fn(); // Use Vitest's 'vi.fn()' for mocking functions.
  
      const mockProps = {
        userInfo: {
          name: "Lars Jensen",
          email: "demo@portbase.com",
          phone: "45962750",
          companyName: "",
          vatNumber: ""
        },
        setUserInfo: mockSetUserInfo
      };
  
      render(<UserInformation {...mockProps} />);
      const emailInput = screen.getByPlaceholderText("E-mail e.g., vita@vita.com");
  
      fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
      expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
    });
  

  // ... Other tests for UserInformation
});