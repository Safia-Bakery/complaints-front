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

export interface BaseItem<T> extends BasePaginatedRes {
  items: T[];
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
export interface ClientType {
  id: number;
  name: string;
  status: number;
  sphere: number;
  lang: number;
  created_at: string;
  updated_at: string;
}
export interface SubCategoryType {
  id: number;
  name: string;
  category_id: number;
  country_id: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface ComplaintType {
  id: number;
  product_name: string;
  client_name: string;
  client_number: string;
  client_gender: string;
  date_purchase: string;
  date_return: string;
  comment: string;
  otk_status: number;
  status: number;
  is_client: boolean;
  corrections: string;
  autonumber: string;
  subcategory_id: number;
  branch_id: number;
  subcategory: SubCategoryType;
  branch: {
    id: number;
    name: string;
    country_id: number;
    status: number;
    password: string;
    created_at: string;
    updated_at: string;
  };
  file: {
    id: number;
    url: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
  changes: {};
  client_id: number;
  client: {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: string;
  };
  created_at: string;
  updated_at: string;
}

export interface CountryType {
  id: number;
  name: string;
  code: string;
  status: number;
  service_id: string;
  quality_id: string;
  callcenter_id: string;
  created_at: string;
  updated_at: null | string;
}

export interface CategoriesType {
  id: number;
  name: string;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface BranchType {
  id: number;
  name: string;
  country_id: number;
  status: number;
  password: string;
  created_at: string;
  updated_at: string;
}
