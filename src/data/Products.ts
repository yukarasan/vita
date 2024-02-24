import { Item } from "../models/Item";

class Products {
  static getInitialBasket(): Item[] {
    return [
      {
        id: "1",
        title: "D-vitamin, 90ug, 100 stk",
        quantity: 2,
        giftWrap: false,
        recurringOrder: "none",
        price: 114.95,
      },
      {
        id: "2",
        title: "C-vitamin, 500mg, 250 stk",
        quantity: 1,
        giftWrap: true,
        recurringOrder: "none",
        price: 149.50,
      },
      {
        id: "3",
        title: "C-vitamin Depot, 500mg, 250 stk",
        quantity: 2,
        giftWrap: false,
        recurringOrder: "none",
        price: 199.95,
      },
    ];
  }
}

export default Products;
