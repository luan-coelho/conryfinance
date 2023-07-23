import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { MonthlyBudget } from '@/types';
import MonthlyBudgetCard from '@/app/components/MontlyBudgetCard';

async function fetchMonthBudgets() {
  const res = await fetch(`${process.env.BASEAPI_URL}/montlybudget`, {
    cache: 'no-cache'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export default async function FinancesPage() {
  const response = await fetchMonthBudgets();
  const montlyBudgets = response.data as MonthlyBudget[];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="0.5em">
        <Typography fontSize="1.2em" fontWeight="bold">
          Orçamentos Mensais
        </Typography>
        <Button startIcon={<HomeIcon />} color="success" variant="outlined">
          Cadastrar
        </Button>
      </Box>
      {montlyBudgets.map((mb) => {
        return <MonthlyBudgetCard key={mb.id} monthlyBudget={mb} />;
      })}
    </Box>
  );
}
