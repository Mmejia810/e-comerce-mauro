export interface Compra {
  id: string;
  date: string;
  total: number;
  buyer?: {
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    country?: string;
    postalCode?: string;
  };
  paymentMethod?: string;

  creditCard?: {
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
  };


  bankTransfer?: {
    bankName?: string;
    accountNumber?: string;
  };

  items: Array<{
    title: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}
