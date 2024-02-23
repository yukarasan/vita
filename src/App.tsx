import { useState, useEffect } from 'react';
import './assets/styles/App.css'; 

import BasketList from './components/basket_list/BasketList.tsx';
import TotalAmount from './components/total_amount/TotalAmount.tsx';
import { basketService } from './services/BasketService'; 
import { Item } from './models/Item.ts';

function App() {
  const [items, setItems] = useState<Item[]>(basketService.getAllItems() as Item[]);
  const [totalAmount, setTotalAmount] = useState<number>(basketService.calculateTotal());

  useEffect(() => {
    const fetchData = async () => {
      try {

        // const response = await fetch('https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json'); 
        const response = await fetch('data/products.json'); // Assuming your JSON file is named products.json
        const data = await response.json();
        setItems(data.items); //top-level "items" key containing an array of items
        console.log(data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // A method to refresh the basket state (items and total amount)
  // A method to refresh the total amount
  const refreshTotalAmount = () => {
    const newTotalAmount = basketService.calculateTotal();
    setTotalAmount(newTotalAmount);
    console.log('New total amount:', newTotalAmount); // log the new total amount
  };

const handleRemoveItem = (itemId: string) => {
  basketService.removeItem(itemId);
  setItems(basketService.getAllItems()); // Update items after removal
  refreshTotalAmount(); // Update total amount without fetching all items
};



const handleUpdateQuantity = async (itemId: string, quantity: number) => {
  console.log('Updating quantity for item:', itemId, 'New quantity:', quantity); 
  await basketService.updateQuantity(itemId, quantity); // Wait for quantity update to complete
  const newTotalAmount = basketService.calculateTotal(); // Recalculate total amount
  setTotalAmount(newTotalAmount); // Update total amount state
  console.log('New total amount:', newTotalAmount);
};







const handleToggleGiftWrap = (itemId: string) => {
  basketService.toggleGiftWrap(itemId);
  refreshTotalAmount(); // Update total amount without fetching all items
};

const handleSetRecurringOrder = (itemId: string, schedule: 'none' | 'weekly' | 'monthly') => {
  basketService.setRecurringOrder(itemId, schedule);
  refreshTotalAmount(); // Update total amount without fetching all items
};

  return (
    <div className="App">
      <header>
        <h1>Vita Checkout Page</h1>
      </header>
      <main>
        <BasketList 
          items={items} 
          onRemoveItem={handleRemoveItem} 
          onUpdateQuantity={handleUpdateQuantity}
          onToggleGiftWrap={handleToggleGiftWrap}
          onSetRecurringOrder={handleSetRecurringOrder}
        />
        <TotalAmount amount={totalAmount} />
      </main>
    </div>
  );
}

export default App;


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