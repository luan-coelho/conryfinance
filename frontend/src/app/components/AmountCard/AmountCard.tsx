import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card as MontlyBudgetAmountCard } from '@/types';
import AmountCardItem from '@/app/components/AmountCard/AmountCardItem';

type CardProps = {
  card: MontlyBudgetAmountCard;
};

export default function AmountCard({ card }: CardProps) {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography fontSize="1em" fontWeight="bold" gutterBottom>
            {card.description}
          </Typography>
          {card.cardItems.map((cardItem) => {
            return <AmountCardItem key={cardItem.id} cardItem={cardItem} />;
          })}
        </CardContent>
        <CardActions>
          <Button color="success" variant="text" size="small">
            Adicionar item
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
