import { CartItemType } from "../lib/types";

class Cart {
  static getInitialCart(): CartItemType[] {
    return [
      {
        id: "vitamin-d-90-100",
        name: "D-vitamin, 90ug, 100 stk",
        quantity: 2,
        giftWrap: false,
        recurringOrder: "none",
        price: 114.95,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null
      },
      {
        id: "vitamin-c-500-250",
        name: "C-vitamin, 500mg, 250 stk",
        quantity: 1,
        giftWrap: true,
        recurringOrder: "none",
        price: 149.50,
        currency: "DKK",
        rebateQuantity: 2,
        rebatePercent: 25,
        upsellProductId: null
      },
      {
        id: "vitamin-c-depot-500-250",
        name: "C-vitamin Depot, 500mg, 250 stk",
        quantity: 2,
        giftWrap: false,
        recurringOrder: "none",
        price: 199.95,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null
      },
      {
        id: "trimmer",
        name: "Barbermaskine",
        quantity: 1,
        giftWrap: false,
        recurringOrder: "none",
        price: 200,
        currency: "DKK",
        rebateQuantity: 0,
        rebatePercent: 0,
        upsellProductId: "trimmer-battery"
      },
    ];
  }
}

export default Cart;
