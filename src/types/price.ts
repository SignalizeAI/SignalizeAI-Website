export type Offer = {
  text: string;
  available?: boolean;
};

export type Price = {
  id: string;
  unit_amount: number;
  nickname: string;
  offers: (string | Offer)[];
  url?: string;
};
