
import { Dispatch, SetStateAction } from 'react';

export interface CatalogItemType {
  id: string
  name: string
  price: number
  currency: string
  rebateQuantity: number
  rebatePercent: number
  upsellProductId: null | string
}

export interface CartItemType extends CatalogItemType {
  quantity: number
  giftWrap: boolean
  rebateQuantity: number; 
  rebatePercent: number;
}

export interface UserInfo {
  name: string;
  phone: string;
  email: string;
  companyName: string;
  vatNumber: string;
}

export interface Address {
  addressline1: string;
  addressline2: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface CheckoutProps {
  cart: CartItemType[];
  totalItems: number;
  userInfo: UserInfo;
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  deliveryAddress: Address;
  setDeliveryAddress: Dispatch<SetStateAction<Address>>;
  billingAddress: Address;
  setBillingAddress: Dispatch<SetStateAction<Address>>;
}
