import { useState } from "react"
import "./assets/styles/App.css"

import BasketList from "./components/basket_list/BasketList.tsx"
import TotalAmount from "./components/total_amount/TotalAmount.tsx"
import { Item } from "./models/Item.ts"

function App() {
  const [basket, setBasket] = useState<Item[]>([
    {
      id: "1",
      title: "D-vitamin, 90ug, 100 stk",
      quantity: 2,
      giftWrap: false,
      recurringOrder: "none",
      price: 116,
    },
    {
      id: "2",
      title: "C-vitamin, 500mg, 250 stk",
      quantity: 1,
      giftWrap: true,
      recurringOrder: "none",
      price: 150,
    },
    {
      id: "3",
      title: "C-vitamin Depot, 500mg, 250 stk",
      quantity: 2,
      giftWrap: false,
      recurringOrder: "none",
      price: 175,
    },
  ])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json"
  //       )
  //       const data = await response.json()
  //       setItems(data) //top-level "items" key containing an array of items
  //       console.log(data)
  //     } catch (error) {
  //       console.error("Error fetching data:", error)
  //     }
  //   }

  //   fetchData()
  // }, [])

  return (
    <div className="App">
      <header>
        <h1>Vita Checkout Page</h1>
      </header>
      <main>
        <BasketList basket={basket} setBasket={setBasket} />
        <TotalAmount basket={basket} />
      </main>
    </div>
  )
}

export default App

/*
import { useState, useEffect } from 'react';
import './assets/styles/App.css'; // Ensure this path is correct

import BasketList from './components/basket_list/BasketList.tsx';
import TotalAmount from './components/total_amount/TotalAmount.tsx';
import { basketService } from './services/BasketService'; // Ensure this path is correct

function App() {
  const [items, setItems] = useState(basketService.getAllItems());
  const [totalAmount, setTotalAmount] = useState(basketService.calculateTotal());

  useEffect(() => {
    // This is a basic way to react to changes. In a real app, consider a more robust state management solution.
    setItems(basketService.getAllItems());
    setTotalAmount(basketService.calculateTotal());
  }, [items]); // Re-run when items change. Be cautious of potential infinite loops.

  // A method to refresh the basket state (items and total amount)
  const refreshBasket = () => {
    setItems(basketService.getAllItems());
    setTotalAmount(basketService.calculateTotal());
  };

  const handleRemoveItem = (itemId: string) => {
    basketService.removeItem(itemId);
    refreshBasket();
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    basketService.updateQuantity(itemId, quantity);
    refreshBasket();
  };

  const handleToggleGiftWrap = (itemId: string) => {
    basketService.toggleGiftWrap(itemId);
    refreshBasket();
  };

  const handleSetRecurringOrder = (itemId: string, schedule: 'none' | 'weekly' | 'monthly') => {
    basketService.setRecurringOrder(itemId, schedule);
    refreshBasket();
  };
  */
