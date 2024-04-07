import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "./App";
import TotalAmount from './components/total_amount/TotalAmount';
import { DeliveryAddress } from './components/delivery_address/DeliveryAddress';
import { UserInformation } from './components/user_information/UserInformation';
import { CartItemType } from './lib/types';
import QuantitySelector from './components/quantity_selector/QuantitySelector';
import Checkout from './components/checkout/Checkout';
import { MemoryRouter } from 'react-router-dom';



describe("App", () => {
  it("renders the app", () => {
    render(<App />);
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
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
        upsellProductId: null,
        imageUrl: "https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878"
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
        upsellProductId: null,
        imageUrl: "https://images.matas.dk/Assets_v3/600001-700000/636001-637000/636601-636700/636640/productlist_v1_x2.jpg"
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
    it("renders delivery address correctly", () => {
      const mockSetUserInfo = vi.fn();
      
      const userInfo = { 
        name: "Lars Jensen", 
        phone: "45962750", 
        email: "demo@portbase.com",
        companyName: "",
        vatNumber: ""
      };
  
      const deliveryAddress = {
        addressline1: "hhh",
        addressline2: "",
        city: "Frederikssund",
        postalCode: "3600",
        country: "Denmark"
      };
  
      const billingAddress = {
        addressline1: "hhh",
        addressline2: "",
        city: "Frederikssund",
        postalCode: "3600",
        country: "Denmark"
      };
  
      render(
        <DeliveryAddress 
          userInfo={userInfo}
          deliveryAddress={deliveryAddress}
          billingAddress={billingAddress}
          setUserInfo={mockSetUserInfo}
          setDeliveryAddress={() => {}}
          setBillingAddress={() => {}}
        />
      );
  
      expect(screen.getByText("Delivery Address")).toBeInTheDocument();
    });
  });
  
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
    const emailInput = screen.getByPlaceholderText("Email e.g., vita@vita.com");

    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    expect(screen.getByText("Invalid email format")).toBeInTheDocument();
  });

  it("renders user information section correctly", () => {
    const userInfo = {
      name: "Kevin Hart",
      email: "kevinhart@example.com",
      phone: "45962750",
      companyName: "Example Company",
      vatNumber: "12345678"
    };
    const setUserInfo = vi.fn();
    render(<UserInformation userInfo={userInfo} setUserInfo={setUserInfo} />);
    expect(screen.getByText("Your Information")).toBeInTheDocument();
    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone number")).toBeInTheDocument();

    expect(screen.getByText("Email Address")).toBeInTheDocument();
    expect(screen.getByText("Company Name")).toBeInTheDocument();
    expect(screen.getByText("Vat Number")).toBeInTheDocument();
  });

  it('updates user information when input fields change', async () => {
    
    const setUserInfoMock = vi.fn();

    
    render(<UserInformation userInfo={{ name: '', email: '', phone: '', companyName: '', vatNumber: '' }} setUserInfo={setUserInfoMock} />);

  
    const nameInput = screen.getByPlaceholderText('Full name');
    fireEvent.change(nameInput, { target: { value: 'Kevin Hart' } });

    // Wait for any asynchronous updates to occur
    await waitFor(() => {
      // Assert that the setUserInfo function was called with the expected arguments
      expect(setUserInfoMock).toHaveBeenCalledWith(expect.objectContaining({ name: 'Kevin Hart' }));
    });
  });
  
  
  
  
});

describe('QuantitySelector', () => {
  it('renders with initial quantity correctly', () => {
    const mockCartItem = {
      id: '1',
      name: 'Product 1',
      price: 100,
      quantity: 2,
      rebateQuantity: 2,
      rebatePercent: 50,
      giftWrap: false,
      currency: 'DKK',
      upsellProductId: null,
      imageUrl: 'https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878',
    };

   
    const mockSetCart = vi.fn();
    render(
      <QuantitySelector
        cartItem={mockCartItem}
        setCart={mockSetCart}
        onIncrease={vi.fn()}
      />
    );

    const quantityInput = screen.getByDisplayValue('2');
    expect(quantityInput).toBeInTheDocument();
  });

  it("decreases quantity when '-' button is clicked", () => {
    const mockCartItem = {
      id: "1",
      name: "Product 1",
      price: 100,
      quantity: 2,
      rebateQuantity: 2,
      rebatePercent: 50,
      giftWrap: false,
      currency: "DKK",
      upsellProductId: null,
      imageUrl:
        "https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878",
    };

    
    const mockSetCart = vi.fn();
    render(
      <QuantitySelector
        cartItem={mockCartItem}
        setCart={mockSetCart}
        onIncrease={vi.fn()} 
      />
    );

    const decreaseButton = screen.getByText("-");
    fireEvent.click(decreaseButton);

    
    const quantityInput = screen.getByDisplayValue('1');
    expect(quantityInput).toBeInTheDocument();
  });
});


describe('Checkout component', () => {
  
  it('validates form fields correctly (Name)', async () => {
   
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: '',
        phone: '',
        email: '',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>);
    

    
    const submitButton = screen.getByText('Submit Order');

   
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please fill out your name.')).toBeInTheDocument();
  });
  it('validates form fields correctly (Phone number)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '',
        email: '',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please enter your phone number.')).toBeInTheDocument();
  });
  it('validates form fields correctly (E-mail)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12345678',
        email: '',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please enter your e-mail address.')).toBeInTheDocument();
  });
  it('validates form fields correctly (Delivery address)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12344678',
        email: 'email@test.test',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please fill out your delivery address.')).toBeInTheDocument();
  });
  it('validates form fields correctly (City)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12344678',
        email: 'email@test.test',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: 'home 123',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

   
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please fill out your city.')).toBeInTheDocument();
  });
  it('validates form fields correctly (Postal code)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12344678',
        email: 'email@test.test',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: 'home 123',
        addressline2: '',
        city: 'city',
        postalCode: '',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

   
    expect(screen.getByText('Please fill out your postal code.')).toBeInTheDocument();
  });
  it('validates form fields correctly (Billing informations)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12344678',
        email: 'email@test.test',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: 'home 123',
        addressline2: '',
        city: 'city',
        postalCode: '2300',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('Please fill out your billing address.')).toBeInTheDocument();
  });
  it('validates form fields correctly (Accept the terms and conditions)', async () => {
    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'name',
        phone: '12344678',
        email: 'email@test.test',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(),
      deliveryAddress: {
        addressline1: 'home 123',
        addressline2: '',
        city: 'city',
        postalCode: '2300',
        country: '',
      },
      setDeliveryAddress: vi.fn(),
      billingAddress: {
        addressline1: 'home 123',
        addressline2: '',
        city: 'city',
        postalCode: '2300',
        country: '',
      },
      setBillingAddress: vi.fn(),
    };

    
    render(
      <MemoryRouter>
    <Checkout {...mockProps} />
    </MemoryRouter>
    );

    
    const submitButton = screen.getByText('Submit Order');

    
    fireEvent.click(submitButton);

    
    expect(screen.getByText('You must accept the terms and conditions to proceed.')).toBeInTheDocument();
  });
  it("submits the order when 'Submit Order' button is clicked", async () => {
    

    
    const mockProps = {
      cart: [],
      totalItems: 0,
      userInfo: {
        name: 'The Rock',
        email: 'therock@example.com',
        phone: '123456789',
        companyName: '',
        vatNumber: '',
      },
      setUserInfo: vi.fn(), 
      deliveryAddress: {
        addressline1: '123 Main St',
        addressline2: '',
        city: 'City',
        postalCode: '12345',
        country: '',
      },
      setDeliveryAddress: vi.fn(), 
      billingAddress: {
        addressline1: '456 Elm St',
        addressline2: '',
        city: 'City',
        postalCode: '54321',
        country: '',
      },
      setBillingAddress: vi.fn(), 
    };

    
    render(
      <MemoryRouter>
        <Checkout {...mockProps} />
      </MemoryRouter>
    );

  
    await waitFor(() => {
      expect(screen.getByText('Submit Order')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Accept Terms & Conditions'));
    
    fireEvent.click(screen.getByText('Submit Order'));

    

    
    expect(await screen.findByText('Your order has been submitted successfully.')).toBeInTheDocument();
  });
});

