import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    unit_amount: 0,
    nickname: "Free",
    offers: [
      "AI analysis 5/day",
      "Save up to 3 analyses",
      {
        text: "Detailed save, search & filter analyses",
        available: false,
      },
      { text: "CSV & Excel export", available: false },
      { text: "Priority email support", available: false },
    ],
    url: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib?utm_source=item-share-cb",
  },
  {
    id: "price_1NQk55LtGdPVhGLefU8AHqH3",
    unit_amount: 3999 * 100,
    nickname: "Team",
    offers: [
      "All Pro features",
      "AI analysis 500/day",
      "Save up to 5000 analyses",
      "Detailed save, search & filter analyses",
      "CSV & Excel export",
      "Priority email support",
    ],
    url: "https://signalizeaipay.lemonsqueezy.com/checkout/buy/56ab66c1-587f-453a-8d51-4cd2c3e61849?media=0&desc=0&discount=0",
  },
  {
    id: "price_1NQk55LtGdPVhGLefU8AHqHr",
    unit_amount: 999 * 100,
    nickname: "Pro",
    offers: [
      "AI analysis 50/day",
      "Save up to 200 analyses",
      "Detailed save, search & filter analyses",
      "CSV & Excel export",
      "Priority email support",
    ],
    url: "https://signalizeaipay.lemonsqueezy.com/checkout/buy/9abd3513-c941-45dc-9d2f-18124ef12e9a?media=0&desc=0&discount=0",
  },
];
