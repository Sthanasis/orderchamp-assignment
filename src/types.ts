export type VariantType = {
  [key: string]: unknown;
  id: string;
  quantity: number;
  variant: string;
  price: string;
  msrp: string;
  stock: boolean;
};

export type EmitClickArgsType =
  | unknown
  | unknown[]
  | { [key: string | number]: unknown };

export type ImageType = {
  id: string;
  modal: string;
  small: string;
  big: string;
  zoom: string;
};
