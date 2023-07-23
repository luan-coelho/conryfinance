export interface MonthlyBudget {
  id: number;
  description: string;
  cards: Card[];
  period: Date;
}

export interface Card {
  id: number;
  description: string;
  cardItems: CardItem[];
  amount: number;
  cardType: CardType;
}

export interface CardItem {
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
