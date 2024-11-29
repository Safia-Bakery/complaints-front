import dayjs from 'dayjs';

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
  date_clients_complaint?: string;
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
  match_standard?: boolean;
};

export interface ComplaintsResponse {
  product_name: string;
  client_name: string;
  client_number: string;
  date_purchase: string;
  first_response: string;
  second_response: string;
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
  manager_phone?: string;
  date_return: string;
  comment: string;
  subcategory_id: number;
  subcategory: {
    id: number;
    name: string;
    category_id: number;
    category: {
      id: number;
      name: string;
    };
  };
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
  complaint_stamp: ComplaintStamp[];
  certificate: string;
  id: number;
  created_at: string;
  updated_at: string;

  manager_number: string;
  branch: {
    id: number;
    name: string;
    country_id: number;
    country: {
      id: number;
      name: string;
    };
  };
  client: {
    id: number;
    status: number;
    name: string;
    branch: {
      id: number;
      name: string;
      country_id: number;
      country: {
        id: number;
        name: string;
      };
    };
  };
  status: number;
  otk_status: number;
  autonumber: string;
  corrections: string;
  deny_reason: string;
  producer_guilty: true;
  is_returned: true;
  is_client: true;
  changes: {};
  updated_by: string;
  is_internal: number;
  match_standard?: number;
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
