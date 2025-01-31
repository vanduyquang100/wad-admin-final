type User = {
  createdAt: string;
  name: string;
  email: string;
  roles: string[];
  _id: string;
  bannedTimestamp?: number | null;
  profilePic?: string;
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
  otherImages: string[];
  createdAt: string;
  updatedAt: string;
  stock: number;
  status: string;
}

type Order = {
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  items: [
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

type OrderDetail = {
  address?: string;
  _id: string;
  userId: {
    _id: string;
    name: string;
  };
  items: {
    productId: {
      _id: string;
      name: string;
      description: string;
      detailDescription: string;
      price: number;
      promotePrice: number;
      category: string;
      imageUrl: string;
      stock: number;
      createdAt: string;
      updatedAt: string;
    };
    quantity: number;
    additionalInfo: null | string;
    _id: string;
  }[];
  totalPrice: number;
  status: string;
  paymentInfo: null | Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
