// src/services/BasketService.ts
import { Item } from "../models/Item";

class BasketService {
  private items: Item[] = [];

  getAllItems(): Item[] {
    return this.items;
  }

  addItem(newItem: Item): void {
    const existingItemIndex = this.items.findIndex(item => item.id === newItem.id);
    if (existingItemIndex > -1) {
      // If item exists, update the quantity instead of adding
      this.items[existingItemIndex].quantity += newItem.quantity;
    } else {
      this.items.push(newItem);
    }
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }

  updateQuantity(itemId: string, quantity: number): void {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      this.items[itemIndex].quantity = quantity;
    }
  }

  toggleGiftWrap(itemId: string): void {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      this.items[itemIndex].giftWrap = !this.items[itemIndex].giftWrap;
    }
  }

  setRecurringOrder(itemId: string, schedule: 'none' | 'weekly' | 'monthly'): void {
    const itemIndex = this.items.findIndex(item => item.id === itemId);
    if (itemIndex > -1) {
      this.items[itemIndex].recurringOrder = schedule;
    }
  }

  calculateTotal(): number {
    return this.items.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      return total + itemTotal;
    }, 0);
  }
}

export const basketService = new BasketService();
