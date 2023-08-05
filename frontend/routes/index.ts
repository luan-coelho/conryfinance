const BASEAPI_URL = `${process.env.NEXT_PUBLIC_BASEAPI_URL}`;

export const routes = {
  monthlyBudget: {
    root: `${BASEAPI_URL}/monthlybudget`,
  },
  monthlyBudgetCard: {
    root: `${BASEAPI_URL}/card`,
  },
  monthlyBudgetCardItem: {
    root: `${BASEAPI_URL}/card-item`,
  },
};
