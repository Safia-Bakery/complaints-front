export type UserType = {
  id: number;
  address: string;
  name: string;
  inn: string;
  email: string;
  company_name: string;
  phone: string;
  status: number;
  created_at: string;
  updated_at: string;
};

export enum Language {
  ru = "ru",
  uz = "uz",
}

export enum ModalTypes {
  image,
  deny_reason,
}
export enum FileType {
  other,
  video,
  photo,
}

export enum OrderStatus {
  new,
  received,
  done,
  denied,
  processed,
}

export interface BasePaginatedRes {
  total: number;
  page: number;
  size: number;
  pages: number;
}

export const StatusSelect = {
  [OrderStatus.new]: "new",
  [OrderStatus.received]: "received",
  [OrderStatus.done]: "done",
  [OrderStatus.denied]: "denied",
  [OrderStatus.processed]: "processed",
};

export enum BtnTypes {
  green = "green",
  black = "black",
  brown = "brown",
  red = "red",
  darkBlue = "darkBlue",
}
export interface SelectValues {
  id: number;
  name_uz: string;
  name_ru: string;
  status?: number;
}
export enum HRSpheres {
  retail,
  fabric,
}

export enum HRDeps {
  qa,
  questions,
  complaints,
  suggestions,
  categories,
}

export interface HRRequestTypes {
  id?: number;
  question?: string;
  answer?: string;
  status?: number;
}
export interface MainHRTypes extends BasePaginatedRes {
  items: HRRequestTypes[];
}
