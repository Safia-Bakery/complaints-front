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
  all,
  retail,
  fabric,
}

export enum HRDeps {
  all,
  questions,
  complaints,
  suggestions,
  qa,
  categories,
}

export interface CommunicationType {
  id: number;
  hrcomplaint_id: number;
  text: string;
  status: number;
  url: string;
  user_id: number;
  user: UserType;
  created_at: string;
  updated_at: string;
}

export interface CommunicationsType extends BasePaginatedRes {
  items: CommunicationType[];
}
export interface HRRequest {
  id: number;
  complaint: string;
  sphere_id: number;
  hrclient_id: number;
  hrclient: {
    id: number;
    name: string;
    status: number;
    sphere: number;
    lang: number;
    created_at: string;
    updated_at: string;
  };
  hrtype: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface HRRequestsType extends BasePaginatedRes {
  items: HRRequest[];
}
export interface HRQaType {
  id: number;
  question_uz: string;
  question_ru: string;
  answer_uz: string;
  answer_ru: string;
  status: number;
  created_at: string;
  updated_at: null | string;
  sphere_id: number;
  hrsphere: {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: null | string;
  };
}
export interface HRQasType extends BasePaginatedRes {
  items: HRQaType[];
}
export interface ClientType {
  id: number;
  name: string;
  status: number;
  sphere: number;
  lang: number;
  created_at: string;
  updated_at: string;
}
export interface ClientsType extends BasePaginatedRes {
  items: ClientType[];
}
