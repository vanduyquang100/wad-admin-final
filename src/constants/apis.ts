export const SERVER_API = import.meta.env.VITE_BASE_URL;

export const API_ROUTES = {
  LOGIN: 'users/login',
  ME: 'users/me',
  ALL_USERS: 'users',
  GET_USER: 'users/:id',
  UPDATE_USER: 'users/:id',
  ALL_PRODUCTS: 'products',
  CREATE_PRODUCT: 'products',
  UPDATE_PRODUCT: 'products/:id',
  GET_PRODUCT: 'products/:id',
  DELETE_PRODUCT: 'products/:id',
  ALL_ORDERS: 'orders',
  GET_ORDER: 'orders/:id',
  UPDATE_ORDER: 'orders/:id',
  UPDATE_ORDER_STATUS: 'orders/:id/status',
  GET_REVENUE: 'orders/revenue',
  GET_PRODUCT_REVENUE: 'products/revenue',
  GET_USER_ORDERS: '/orders/users/:userId',
  UPLOAD_IMAGE: 'images/upload',
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
  ORDER_DETAIL: '/dashboard/orders/:id',
}