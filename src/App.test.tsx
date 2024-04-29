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
import CartItem from './components/cart_item/CartItem.tsx';
import CartList from './components/cart_list/CartList.tsx';



describe("App", () => {
  it('renders without crashing', () => {
    render(<App />);
  });
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
    const mockSetUserInfo = vi.fn(); // Use Vitest's 'vi.fn()' for mocking functions.
    
    const userInfo = { 
      name: '', 
      phone: '', 
      email: '',
      companyName: '',
      vatNumber: ''
    };
  
    const deliveryAddress = {
      addressline1: "hhh",
      addressline2: '',
      city: "Frederikssund",
      postalCode: "3600",
      country: "Denmark"
    };
  
    const billingAddress = {
      addressline1: "hhh",
      addressline2: '',
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
  
    const adressvalue1Inputs = screen.getAllByDisplayValue("hhh");
      expect(adressvalue1Inputs.length).toBe(2); 
      expect(adressvalue1Inputs[1]).toBeInTheDocument();
  
  });
    it("renders billing address section when 'Use same address for billing' is unchecked", () => {
      const mockSetUserInfo = vi.fn();
      const mockSetDeliveryAddress = vi.fn();
      const mockSetBillingAddress = vi.fn();
  
      const userInfo = {
        name: '',
        phone: '',
        email: '',
        companyName: '',
        vatNumber: ''
      };
  
      const deliveryAddress = {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: "Denmark"
      };
  
      const billingAddress = {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: "Denmark"
      };
  
      render(
        <DeliveryAddress 
          userInfo={userInfo}
          deliveryAddress={deliveryAddress}
          billingAddress={billingAddress}
          setUserInfo={mockSetUserInfo}
          setDeliveryAddress={mockSetDeliveryAddress}
          setBillingAddress={mockSetBillingAddress}
        />
      );
  
      
      expect(screen.getByText("Billing Address")).toBeInTheDocument();
  
      const postalCodeInputs = screen.getAllByPlaceholderText("Postal Code");
      expect(postalCodeInputs.length).toBe(2); 
      expect(postalCodeInputs[1]).toBeInTheDocument();
  
      const CityInputs = screen.getAllByPlaceholderText("City");
      expect(CityInputs.length).toBe(2); 
      expect(CityInputs[1]).toBeInTheDocument();

      const address1Inputs = screen.getAllByPlaceholderText("e.g. Heimdalsvej 64");
      expect(address1Inputs.length).toBe(2); 
      expect(address1Inputs[1]).toBeInTheDocument();

      const address2Inputs = screen.getAllByPlaceholderText("e.g. 3th");
      expect(address2Inputs.length).toBe(2); 
      expect(address2Inputs[1]).toBeInTheDocument();
      
    });
    it("renders delivery address section with correct initial values", () => {
      const mockSetUserInfo = vi.fn();
      const mockSetDeliveryAddress = vi.fn();
      const mockSetBillingAddress = vi.fn();
  
      const userInfo = {
        name: '',
        phone: '',
        email: '',
        companyName: '',
        vatNumber: ''
      };
  
      const deliveryAddress = {
        addressline1: "Heimdalsvej 64",
        addressline2: "3th",
        city: "Frederikssund",
        postalCode: "3600",
        country: "Denmark"
      };
  
      const billingAddress = {
        addressline1: '',
        addressline2: '',
        city: '',
        postalCode: '',
        country: ''
      };
  
      render(
        <DeliveryAddress 
          userInfo={userInfo}
          deliveryAddress={deliveryAddress}
          billingAddress={billingAddress}
          setUserInfo={mockSetUserInfo}
          setDeliveryAddress={mockSetDeliveryAddress}
          setBillingAddress={mockSetBillingAddress}
        />
      );
  
      
      expect(screen.getByText("Delivery Address")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Heimdalsvej 64")).toBeInTheDocument();
      expect(screen.getByDisplayValue("3th")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Frederikssund")).toBeInTheDocument();
      expect(screen.getByDisplayValue("3600")).toBeInTheDocument();
      expect(screen.getByDisplayValue("🇩🇰 Denmark")).toBeInTheDocument();
    });
    it("copies delivery address to billing address when 'Use same address for billing' is checked", async () => {
      const mockSetBillingAddress = vi.fn();
      const mockSetDeliveryAddress = vi.fn();
  
      const userInfo = {
        name: '',
        email: '',
        phone: '',
        companyName: '',
        vatNumber: ''
      };
  
      const initialAddress = {
        addressline1: "1234 Main St",
        addressline2: "",
        city: "Anytown",
        postalCode: "12345",
        country: "Denmark"
      };
  
      const { getByLabelText } = render(
        <DeliveryAddress 
          userInfo={userInfo}
          deliveryAddress={initialAddress}
          billingAddress={initialAddress}
          setUserInfo={() => {}}
          setDeliveryAddress={mockSetDeliveryAddress}
          setBillingAddress={mockSetBillingAddress}
        />
      );
  
      const checkbox = getByLabelText("Use same address for billing");
      fireEvent.click(checkbox);
  
      await waitFor(() => {
        expect(mockSetBillingAddress).toHaveBeenCalledWith(initialAddress);
      });
    });

    it("handles postal code error validation ( typing 9999 )", async () => {
      const userInfo = {
        name: '',
        email: '',
        phone: '',
        companyName: '',
        vatNumber: ''
      };
      const addressInfo = {
        postalCode: "",
        city: "",
        addressline1: "",
        addressline2: "",
        country: "Denmark"
      };
    
      render(
        <DeliveryAddress
          userInfo={userInfo}
          deliveryAddress={addressInfo}
          billingAddress={addressInfo}
          setUserInfo={() => {}}
          setDeliveryAddress={() => {}}
          setBillingAddress={() => {}}
        />
      );
    
      const allPostalCodeInputs = screen.getAllByPlaceholderText("Postal Code");
      fireEvent.change(allPostalCodeInputs[0], { target: { value: '9999' } })
      fireEvent.change(allPostalCodeInputs[1], { target: { value: '9999' } });
    
      
      await waitFor(() => {
        const errorMessages = screen.getAllByText('Zip code not found in Denmark.');
        expect(errorMessages.length).toBe(2); 
      });
    });

    it("handles postal code error validation ( typing 999 )", async () => {
      const userInfo = {
        name: '',
        email: '',
        phone: '',
        companyName: '',
        vatNumber: ''
      };
      const addressInfo = {
        postalCode: '',
        city: '',
        addressline1: '',
        addressline2: '',
        country: "Denmark"
      };
    
      render(
        <DeliveryAddress
          userInfo={userInfo}
          deliveryAddress={addressInfo}
          billingAddress={addressInfo}
          setUserInfo={() => {}}
          setDeliveryAddress={() => {}}
          setBillingAddress={() => {}}
        />
      );
    
      const allPostalCodeInputs = screen.getAllByPlaceholderText("Postal Code");
      fireEvent.change(allPostalCodeInputs[0], { target: { value: '999' } });
      fireEvent.change(allPostalCodeInputs[1], { target: { value: '999' } });
    
      await waitFor(() => {
        const errorMessages = screen.getAllByText('Postal code must be between 1000 and 9999.');
        expect(errorMessages.length).toBe(2); 
      });
    });
});
  
describe("UserInformation", () => {
  it("validates the email", async () => {
    const mockSetUserInfo = vi.fn();

    const mockProps = {
      userInfo: {
        name: '',
        email: '',
        phone: '',
        companyName: '',
        vatNumber: ''
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

    
    await waitFor(() => {
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
  it('validates form fields correctly (Delivery)', async () => {
   
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

    
    expect(screen.getByText('Please fill out your delivery address.')).toBeInTheDocument();
  });
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

    
    expect(screen.getByText('Please enter your e-mail address.')).toBeInTheDocument();
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

    
    await new Promise(resolve => setTimeout(resolve, 4000));
    
    expect(await screen.findByText('Your order has been submitted successfully.')).toBeInTheDocument();
  });
});



global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    statusText: 'OK',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    type: 'basic',
    url: '',
    redirected: false,
    bodyUsed: false,
    text: () => Promise.resolve(JSON.stringify([])),
    json: () => Promise.resolve([
      { id: "hair-clip-large", name: "Large Hårklemme", price: 35, imageUrl: 'https://example.com/large-image.jpg' }
    ]),
    blob: () => Promise.resolve(new Blob()),
    arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
    clone: function() { return this; },
    body: new ReadableStream(), 
    formData: () => Promise.resolve(new FormData())
  }) as Promise<Response>
);




describe("CartItem", () => {

  it('calls onUpgrade function when Upgrade button is clicked', async () => {
    const mockOnUpgrade = vi.fn();
    const mockSetCart = vi.fn();

    const cartItem = {
      id: "hair-clip",
      name: "Hårklemme",
      price: 25,
      quantity: 1,
      rebateQuantity: 2,
      rebatePercent: 20,
      giftWrap: false,
      currency: 'DKK',
      upsellProductId: "hair-clip-large",
      imageUrl: 'https://example.com/image.jpg',
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          { id: "hair-clip-large", name: "Large Hårklemme", price: 35, imageUrl: 'https://example.com/large-image.jpg' }
        ]),
        headers: new Headers(),
        redirected: false,
        status: 200,
        statusText: 'OK',
        type: 'basic',
        url: '',
        clone: () => {},
        text: () => Promise.resolve(''),
        blob: () => Promise.resolve(new Blob()),
        arrayBuffer: () => Promise.resolve(new ArrayBuffer(1)),
        body: new ReadableStream(),
        formData: () => Promise.resolve(new FormData())
      }) as Promise<Response>
    );

    render(
      <CartItem
        cartItem={cartItem}
        setCart={mockSetCart}
        onUpgrade={mockOnUpgrade}
      />
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /upgrade/i })).toBeInTheDocument();
    });

    const upgradeButton = screen.getByRole('button', { name: /upgrade/i });
    fireEvent.click(upgradeButton);

    expect(mockOnUpgrade).toHaveBeenCalledWith(expect.objectContaining({
      id: "hair-clip-large",
      name: "Large Hårklemme",
      price: 35,
      imageUrl: 'https://example.com/large-image.jpg'
    }));
  });

  const mockCartItem = {
    id: "hair-clip",
    name: "Hårklemme",
    price: 25,
    quantity: 1,
    rebateQuantity: 2,
    rebatePercent: 20,
    giftWrap: false,
    currency: "DKK",
    upsellProductId: "hair-clip-large",
    imageUrl: "https://example.com/image.jpg",
  };

  it("renders cart item with correct details", () => {
    render(
      <CartItem
        cartItem={mockCartItem}
        setCart={() => {}}
        onUpgrade={() => {}}
      />
    );
  
    expect(screen.getByText(mockCartItem.name)).toBeInTheDocument();
    expect(screen.getByText(`${mockCartItem.price} kr`)).toBeInTheDocument();
  });
});

describe("CartList", () => {
  const mockSetCart = vi.fn();
  const mockOnUpgrade = vi.fn();

  it("displays 'Your cart is empty.' when cart is empty", () => {
    render(<CartList cart={[]} setCart={mockSetCart} onUpgrade={mockOnUpgrade} />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });
});