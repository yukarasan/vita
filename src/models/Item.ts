export interface Item {
  id: string
  title: string
  price: number
  quantity: number
  giftWrap: boolean // Optional: For gift wrapping
  recurringOrder: "none" | "weekly" | "monthly" // Optional: For recurring orders
}
