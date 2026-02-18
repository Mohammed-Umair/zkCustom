export type KeycapProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  profile: string;
  material: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  colorTheme: string;
  legendText: string;
  artisanIcon: string;
  quantity: number;
  unitPrice: number;
};
