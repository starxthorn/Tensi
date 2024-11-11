export interface CategoryType {
  _id?: string;
  category?: string;
  user?: UserType | null;
}

export interface CompanyType {
  _id?: string;
  company?: string;
  user?: UserType | null;
}

export interface ProductType {
  _id?: string;
  name?: string;
  price?: number;
  stock?: number;
  SerialNumber?: string;
  ModelNumber?: string;
  company?: string;
  customers?: CustomerType[] | null;
  category?: string;
  user?: UserType | null;
  createdAt?: Date;
}

export interface WitnessesType {
  name?: string;
  cnic?: number;
  cnic_picture?: string;
  FatherName?: string;
  location?: string;
  nearby?: string;
  phone?: number;
  work?: string;
}

export interface CustomerType {
  _id?: string;
  invoice?: number;
  InvoiceDate?: string;
  name?: string;
  phone?: number;
  FatherName?: string;
  LivingLocation?: string;
  LivingNearby?: string;
  IntialLocation?: string;
  IntialNearby?: string;
  work?: string;
  DescriptionKnowledge?: string;
  MonthlyIncome?: number;
  religion?: string;
  OfficePhone?: number;
  PhoneLocation?: string;
  preacher?: string;
  witnesses?: WitnessesType[] | null;
  cnic?: number;
  purchase?: "installment" | "permanent purchase";
  cnic_picture?: string;
  product?: ProductType | null;
  user?: UserType | null;
  advance?: number;
  TimeLimit?: number;
  status?: "active" | "pending";
  MonthlyInstallment?: number;
  FirstInstallment?: number;
  paid?: number;
  PendingDay?: number;
  ProductQuantity?: number;
  intialBalance?: number;
  createdAt?: Date;
}

export interface UserType {
  _id?: string;
  avatar?: string;
  ShopName?: string;
  name?: string;
  password?: string;
  email?: string;
  phone?: number;
  location?: string;
  cnic?: number;
  cnic_picture?: string;
  description?: string;
  verified?: "not verified" | "verified" | "pending";
  categories?: CategoryType[] | null;
  products?: ProductType[] | null;
  customers?: CustomerType[] | null;
  companies?: CustomerType[] | null;
  createdAt?: Date;
}
