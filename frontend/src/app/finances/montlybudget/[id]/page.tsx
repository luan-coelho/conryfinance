import { CardType, MonthlyBudget } from '@/types';
import AmountCard from '@/app/components/AmountCard/AmountCard';
import { Grid } from '@mui/material';
import AmountCardNoContent from '@/app/components/AmountCard/AmountCardNoContent';

async function fetchMonthBudgetById(montlyBudgetId: string) {
  const res = await fetch(
    `${process.env.BASEAPI_URL}/montlybudget/${montlyBudgetId}`,
    {
      cache: 'no-cache'
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function MonthlyBudgetPage({
  params
}: {
  params: { id: string };
}) {
  const response = await fetchMonthBudgetById(params.id);
  const montlyBudget = response as MonthlyBudget;

  return (
    <Grid container rowSpacing={2} columnSpacing={2}>
      {montlyBudget.cards.map((card) => {
        return (
          <Grid key={card.id} item xs={12} sm={12} md={3}>
            {CardType[card.cardType] == CardType.DEFAULT ? (
              <AmountCard card={card} />
            ) : (
              <AmountCardNoContent card={card} />
            )}
          </Grid>
        );
      })}
    </Grid>
  );
}
