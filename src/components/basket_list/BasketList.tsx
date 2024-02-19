import React from 'react';
import { Item } from '../../models/Item';
import BasketItem from '../basket_item/BasketItem';

interface BasketListProps {
  items: Item[];
  onRemoveItem: (itemId: string) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onToggleGiftWrap: (itemId: string) => void;
  onSetRecurringOrder: (itemId: string, schedule: 'none' | 'weekly' | 'monthly') => void;
}

const BasketList: React.FC<BasketListProps> = ({
  items,
  onRemoveItem,
  onUpdateQuantity,
  onToggleGiftWrap,
  onSetRecurringOrder,
}) => {
  return (
    <div>
      {items?.length > 0 ? (
        <ul>
          {items.map(item => (
            <BasketItem
              key={item.id}
              item={item}
              onRemove={() => onRemoveItem(item.id)}
              onUpdateQuantity={(quantity) => onUpdateQuantity(item.id, quantity)}
              onToggleGiftWrap={() => onToggleGiftWrap(item.id)}
              onSetRecurringOrder={(schedule) => onSetRecurringOrder(item.id, schedule)}
            />
          ))}
        </ul>
      ) : (
        <p>Your basket is empty.</p>
      )}
    </div>
  );
};

export default BasketList;
