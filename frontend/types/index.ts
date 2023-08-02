export interface MonthlyBudget {
    id: number;
    description: string;
    cards: MonthlyBudgetCard[];
    period: Date;
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
    DEFAULT,
    TOTAL_AMOUNT_SPENT,
    TOTAL_AVAILABLE
  }