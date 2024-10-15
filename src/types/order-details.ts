import dayjs from "dayjs";

export interface OrderDetails {
  child_category_name: string;
  selling_at?: dayjs.Dayjs;
  received_at?: dayjs.Dayjs;
  manager_phone?: string;
  client_phone?: string;
  description?: string;
  product?: any;
}

export type ComplaintsBody = {
  id?: number;

  files?: string[];
  product_name?: string;
  client_name?: string;
  client_number?: string; // phone number
  client_gender?: string;
  date_purchase?: string;
  date_return?: string;
  comment?: string;
  autonumber?: string;
  subcategory_id?: number;
  branch_id?: string;
  deny_reason?: string;

  otk_status?: number;
  status?: number;
  corrections?: string;

  is_client?: boolean;
  producer_guilty?: boolean;
  is_returned?: boolean;
  expense?: number;

  products?: string[];
  client_id?: number;
  manager_phone?: string;

  first_response?: string;
  second_response?: string;
};

export interface ComplaintsResponse {
  product_name: string;
  client_name: string;
  client_number: string;
  date_purchase: string;
  date_return: string;
  status: number;
  id: number;
  comment: string;
  subcategory_id: number;
  branch_id: number;
  expense: number;
  complaint_product: [
    {
      product_id: string;
      complaint_id: number;
      product: {
        id: string;
        name: string;
      };
    },
  ];
  client_id: number;
}

export interface ComplaintRes {
  product_name: string;
  client_name: string;
  client_number: string;
  date_purchase: string;
  date_return: string;
  comment: string;
  subcategory_id: number;
  branch_id: number;
  expense: number;
  complaint_product: {
    product_id: string;
    complaint_id: number;
    product: {
      id: string;
      name: string;
    };
  }[];
  client_id: number;
  file: {
    id: number;
    url: string;
  }[];
  first_response: string;
  second_response: string;
  first_response_time: string;
  second_response_time: string;
  certificate?: string;
  complaint_stamp: ComplaintStamp[];
}

export interface ComplaintStamp {
  id: number;
  complaint_id: number;
  user_id: number;
  status?: number;
  user: {
    id: number;
    username: string;
    name: string;
    role: {
      id: number;
      name: string;
      status: number;
    };
  };
}

export interface ComplaintsParams {
  client_id?: number;
  status?: number;
  enabled?: boolean;
  archived?: boolean;
  in_process?: boolean;
  results?: boolean;
}

export interface ComplaintParams {
  complaint_id?: number;
  enabled?: boolean;
}

export const StatusColors: { [key: number]: string } = {
  1: "#FF0000",
  2: "#FFEE5B",
  3: "#31B602",
  4: "#FFFFFF",
};

export interface Stampers {
  id: number;
  name: string;
  username: string;
  phone_number: string;
  status: number;
  role_id: number;
  created_at: string;
  updated_at: string;
  role: {
    id: number;
    name: string;
    status: number;
    created_at: string;
    updated_at: null;
  };
  stamp: string;
  telegram_id: null | string;
}
