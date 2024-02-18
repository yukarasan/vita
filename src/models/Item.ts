export interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
    giftWrap: boolean;  // Optional: For gift wrapping
    recurringOrder: 'none' | 'weekly' | 'monthly';  // Optional: For recurring orders
}