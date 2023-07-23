import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card as MontlyBudgetAmountCard } from '@/types';
import { CardHeader } from '@mui/material';

type CardProps = {
  card: MontlyBudgetAmountCard;
};

export default function AmountCardNoContent({ card }: CardProps) {
  return (
    <Box width={200} minHeight={200}>
      <Card className="bg-red" variant="outlined">
        <CardHeader
          title={
            <Typography fontSize="1em" fontWeight="bold">
              {card.description}
            </Typography>
          }
        />
        <CardContent>
          <div className="text-3xl">R${card.amount}</div>
        </CardContent>
      </Card>
    </Box>
  );
}
