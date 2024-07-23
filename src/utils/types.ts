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
  username?: string;
  role?: RoleTypes;

  permissions?: { [key: number]: boolean };
  phone_number: string;
  role_id: number;
};

export enum Language {
  ru = "ru",
  uz = "uz",
}

export enum ModalTypes {
  image,
  deny_reason,
  edit_purchase_date,
  edit_sending_date,
  edit_comment,
  edit_branch,
  edit_category,
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
  hr_complaints,
  suggestions,
  qa,
  hr_categories,
}

export enum ComplaintsSpheres {
  is_internal,
  otk,
  is_client,
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
  deny_reason?: string;
  sphere_id: number;
  hrclient_id: number;
  hrcategory?: {
    id: number;
    name: string;
    status: number;
    hrsphere_id?: number;
    hrsphere: number;
    created_at: string;
    updated_at: null;
  };
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
export interface RoleTypes {
  id: number;
  name: string;
  permission: [
    {
      id: number;
      action_id: number;
      action: {
        id: number;
        name: string;
        status: number;
        created_at: string;
        updated_at: string;
      };
      role_id: number;
      status: number;
      created_at: string;
      updated_at: string;
    }
  ];
  status: number;
  created_at: string;
  updated_at: string;
}
export interface PermissionTypes {
  id: number;
  name: string;
  status: number;
  action: [
    {
      id: number;
      name: string;
      status: number;
      created_at: string;
      updated_at: string;
    }
  ];
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
  deny_reason?: string;
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
  }[];
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
  producer_guilty?: boolean;
  is_returned?: boolean;
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
export interface SelectValue {
  value: string;
  label: string;
  country_id?: number;
}

export type BranchJsonVal = {
  id: string;
  name: string;
  country_id: string;
};

export interface FileItem {
  file: File;
  id: number | string;
}

export enum CountrySelect {
  default,
  UZB,
  KZ,
}

export enum OrderTypeSelect {
  all,
  quality,
  service,
}
export enum GenderType {
  other,
  man,
  woman,
}
export enum Permissions {
  dashboard_stats = 1,

  get_complaints = 2,
  add_complaints = 4,
  edit_complaints = 3,

  get_internal_complaints = 5,
  add_internal_complaints = 7,
  edit_internal_complaints = 6,

  get_reviews = 8,

  get_hr_fabric = 12,
  add_hr_fabric = 11,
  edit_hr_fabric = 13,

  get_hr_retail = 15,
  add_hr_retail = 17,
  edit_hr_retail = 16,

  get_okk = 9,
  add_okk = 11,
  edit_okk = 10,

  get_users = 18,
  edit_users = 19,
  add_users = 20,

  get_roles = 21,
  edit_roles = 22,
  add_roles = 23,

  get_branches = 24,
  edit_branches = 25,
  add_branches = 26,

  get_countries = 27,
  edit_countries = 28,
  add_countries = 29,

  get_categories = 30,
  edit_categories = 31,
  add_categories = 32,
}
