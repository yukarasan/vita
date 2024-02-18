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
      <footer>
        {/* Footer content or additional controls */}
      </footer>
    </div>
  );
}

export default App;
