const BASEAPI_URL = `${process.env.NEXT_PUBLIC_BASEAPI_URL}`;

export const routes = {
  monthlyBudget: {
    root: `${BASEAPI_URL}/monthlybudget`,
    updateBudget: `${BASEAPI_URL}/monthlybudget/update-budget`,
  },
  monthlyBudgetCard: {
    root: `${BASEAPI_URL}/card`,
    updateDescription: `${BASEAPI_URL}/card/update-description`,
  },
  monthlyBudgetCardItem: {
    root: `${BASEAPI_URL}/card-item`,
  },
};
