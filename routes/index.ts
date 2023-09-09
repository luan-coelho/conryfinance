const BASEAPI_URL = `/api`;

export const routes = {
  monthlyBudget: {
    root: `${BASEAPI_URL}/monthly-budgets`,
    updateBudget: `${BASEAPI_URL}/monthly-budgets/update-budget`,
  },
  monthlyBudgetCard: {
    root: `${BASEAPI_URL}/card`,
    updateDescription: `${BASEAPI_URL}/card/update-description`,
  },
  monthlyBudgetCardItem: {
    root: `${BASEAPI_URL}/card-item`,
  },
};
