import { CardItem } from '@/types';
import * as React from 'react';

type AmountCardItemProps = {
  cardItem: CardItem;
};

export default function AmountCardItem({ cardItem }: AmountCardItemProps) {
  return (
    <div className="border rounded-xl p-2">
      <div className="flex gap-2">
        {cardItem.description}
        <span className="font-bold">R${cardItem.amount}</span>
      </div>
    </div>
  );
}
