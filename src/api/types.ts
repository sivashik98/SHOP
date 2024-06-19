export type ServerResponse<T> = {
  limit: number;
  products: T[];
  skip: number;
  total: number;
};

export type Comment = {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
};
export type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Comment[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
};

export type SearchedProductsParams = {
  // search by q symbols
  q?: string;
  // limit items
  limit?: number;
  // pagination by skip items
  skip?: number;
  // sort by field
  sortBy?: 'price' | 'title' | 'discountPercentage' | 'rating';
  // sort by asc/desc
  order?: 'asc' | 'desc';
};
export type ProductsByCategoryParams = {
  category: string;
  // limit items
  limit?: number;
  // pagination by skip items
  skip?: number;
};
export type ProductParams = {
  id: number;
};
