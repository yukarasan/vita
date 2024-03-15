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
  recurringOrder: "none" | "weekly" | "monthly"
  rebateQuantity: number; //for rebate quantity
  rebatePercent: number;  //for rebate percent
}
// Order data structure
 export interface OrderData {
  cart: CartItemType[];
  deliveryAddress: DeliveryAddressType;
  userInfo: UserInfoType;
}

