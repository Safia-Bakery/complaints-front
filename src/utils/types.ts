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
}
export interface SelectValues {
  id: number;
  name_uz: string;
  name_ru: string;
  status?: number;
}
