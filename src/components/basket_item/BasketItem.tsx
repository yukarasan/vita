import React from 'react';
import { Item } from '../../models/Item';
import QuantitySelector from '../quantity_selector/QuantitySelector';

interface BasketItemProps {
  item: Item;
  onRemove: () => void; 
  onUpdateQuantity: (quantity: number) => void; 
  onToggleGiftWrap: () => void; 
  onSetRecurringOrder: (schedule: 'none' | 'weekly' | 'monthly') => void; 
}

const BasketItem: React.FC<BasketItemProps> = ({
  item,
  onRemove,
  onUpdateQuantity,
  onToggleGiftWrap,
  onSetRecurringOrder,
}) => {
  const handleToggleGiftWrap = () => {
    onToggleGiftWrap();
  };

  const handleChangeRecurringOrder = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSetRecurringOrder(event.target.value as 'none' | 'weekly' | 'monthly');
  };

  return (
    <li>
      <div>
        <h3>{item.name}</h3>
        <p>Price: {item.price}</p>
        <p>Quantity: <QuantitySelector value={item.quantity} onChange={onUpdateQuantity} /></p>
        <button onClick={handleToggleGiftWrap}>
          Gift Wrap: {item.giftWrap ? 'Enabled' : 'Disabled'}
        </button>
        <div>
          Recurring Order:
          <select value={item.recurringOrder} onChange={handleChangeRecurringOrder}>
            <option value="none">None</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <button onClick={onRemove}>Remove Item</button>
      </div>
    </li>
  );
};

export default BasketItem;
