export interface Promo {
  id: string;
  code: string;
  discount: number;
  validFrom: string;
  validTo: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
