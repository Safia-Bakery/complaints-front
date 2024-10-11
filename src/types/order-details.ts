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
  client_id: number;
  manager_phone?: string;
};
