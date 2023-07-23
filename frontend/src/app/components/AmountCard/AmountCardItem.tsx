import { CardItem } from '@/types';
import Typography from '@mui/material/Typography';
import * as React from 'react';

type AmountCardItemProps = {
  cardItem: CardItem;
};

export default function AmountCardItem({ cardItem }: AmountCardItemProps) {
  return (
    <Typography>
      {cardItem.description} | R${cardItem.amount}
    </Typography>
  );
}
