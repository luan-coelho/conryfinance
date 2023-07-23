import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MonthlyBudget } from '@/types';
import Link from 'next/link';
import { getMonthNameFromDate } from '@/app/utils/dateutils';

type CardProps = {
  monthlyBudget: MonthlyBudget;
};

export default function MonthlyBudgetCard({ monthlyBudget }: CardProps) {
  return (
    <Box sx={{ maxWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography fontSize="1em" fontWeight="bold" gutterBottom>
            {getMonthNameFromDate(monthlyBudget.period)}
          </Typography>
          {monthlyBudget.description && (
            <Typography>{monthlyBudget.description}</Typography>
          )}
        </CardContent>
        <CardActions>
          <Link href={`finances/montlybudget/${monthlyBudget.id}`} passHref>
            <Button variant="text" size="small">
              Abrir orçamento
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Box>
  );
}
