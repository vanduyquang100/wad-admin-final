export const SERVER_API = import.meta.env.VITE_BASE_URL;

export const API_ROUTES = {
  LOGIN: 'users/login',
  ME: 'users/me',
  ALL_USERS: 'users',
  GET_USER: 'users/:id',
  UPDATE_USER: 'users/:id',
  ALL_PRODUCTS: 'products',
  CREATE_PRODUCT: 'products',
  DELETE_PRODUCT: 'products/:id'
};

export const NAVIGATION_ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/dashboard/users',
  USER_DETAIL: '/dashboard/users/:id',
  PRODUCTS: '/dashboard/products',
  ORDERS: '/dashboard/orders',
  REPORTS: '/dashboard/reports',
  CREATE_PRODUCT: '/dashboard/products/create',
  PRODUCT_DETAIL: '/dashboard/products/:id',
  EDIT_PRODUCT: '/dashboard/products/edit/:id',
}