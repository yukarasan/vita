import { CartItemType } from "../lib/types";

class Cart {
  static getInitialCart(): CartItemType[] {
    return [
      {
        id: "vitamin-d-90-100",
        name: "D-vitamin, 90ug, 100 stk",
        quantity: 2,
        giftWrap: false,
        price: 114.95,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null,
        imageUrl: "https://apopro.dk/Images/d3-vitamin-staerk-kapsler-90-%C2%B5g-kosttilskud-120-stk-214878"
      },
      {
        id: "vitamin-c-500-250",
        name: "C-vitamin, 500mg, 250 stk",
        quantity: 1,
        giftWrap: true,
        price: 149.50,
        currency: "DKK",
        rebateQuantity: 2,
        rebatePercent: 25,
        upsellProductId: null,
        imageUrl: "https://images.matas.dk/Assets_v3/600001-700000/636001-637000/636601-636700/636640/productlist_v1_x2.jpg"
      },
      {
        id: "vitamin-c-depot-500-250",
        name: "C-vitamin Depot, 500mg, 250 stk",
        quantity: 2,
        giftWrap: false,
        price: 199.95,
        currency: "DKK",
        rebateQuantity: 3,
        rebatePercent: 10,
        upsellProductId: null,
        imageUrl: "https://images.matas.dk/Assets_v3/600001-700000/631001-632000/631601-631700/631666/product_v1_x2.jpg"
      },
      {
        id: "trimmer",
        name: "Barbermaskine",
        quantity: 1,
        giftWrap: false,
        price: 200,
        currency: "DKK",
        rebateQuantity: 0,
        rebatePercent: 0,
        upsellProductId: "trimmer-battery",
        imageUrl: "" // Example URL, replace with actual
      },
    ];
  }
}

export default Cart;
