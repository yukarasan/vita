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
}
