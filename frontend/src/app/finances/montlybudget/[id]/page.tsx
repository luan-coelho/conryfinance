import { MonthlyBudget } from '@/types';
import AmountCard from '@/app/components/AmountCard/AmountCard';

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

  return <AmountCard card={montlyBudget.cards[0]} />;
}
