type User = {
  createdAt: string;
  name: string;
  email: string;
  roles: string[];
  _id: string;
  bannedTimestamp?: number;
};

type Products = {
  _id: string;
  name: string;
  description?: string;
  detailDescription?: string;
  price: number;
  promotePrice: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  stock: number;
}