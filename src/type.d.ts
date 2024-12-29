type User = {
  createdAt: string;
  name: string;
  email: string;
  roles: string[];
  _id: string;
  bannedTimestamp?: number;
};

type Product = {
  _id: string;
  name: string;
  description?: string;
  detailDescription?: string;
  price: number;
  promotePrice?: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  stock: number;
}

type Order = {
  "_id": string;
  "userId": string;
  "items": [
    {
      productId: string;
      quantity: number;
      additionalInfo: null;
    }
  ];
  totalPrice: number;
  status: string;
  paymentInfo: never; // Change this later
  createdAt: string;
  updatedAt: string;
}