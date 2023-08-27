export interface MonthlyBudget {
  id: number;
  description: string;
  cards: MonthlyBudgetCard[];
  period: Date;
  budget: number;
  remainingTotalAmount: number;
  totalAmountSpent: number;
}

export interface MonthlyBudgetCard {
  id: number;
  description: string;
  cardItems: MonthlyBudgetCardItem[];
  amount: number;
  cardType: CardType;
}

export interface MonthlyBudgetCardItem {
  id: number;
  description: string;
  amount: number;
  eventDateTime: string;
}

export enum CardType {
  DEFAULT = "DEFAULT",
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

export interface ResponseData<T> {
  data: T[];
  pagination: Pagination;
}

export interface ApiErrorResponse {
  type: string;
  title: string;
  status: number;
  detail: string;
  instance: string;
}