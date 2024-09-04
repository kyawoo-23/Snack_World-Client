export type TCheckOutSchema = {
  deliveryAddress: string;
  deliveryContact: string;
};

export type TCheckOutProduct = {
  productId: string | null;
  quantity: number;
  productVariantId: string | null;
  variantName: string;
  price: number;
};

export type TCheckOutRequest = {
  orderCode: string;
  isPrepaid: boolean;
  totalPrice: number;
  deliveryPrice: number;
  products: TCheckOutProduct[];
} & TCheckOutSchema;
