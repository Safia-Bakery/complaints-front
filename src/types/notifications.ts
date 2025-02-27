interface NotificationsRes {
  id: number;
  text: string;
  user?: {
    id: number;
    name: string;
    username: string;
    phone_number: string;
    status: number;
  };
  scheduled_at: string;
  status: number;
  receivers_sphere: number[];
  created_at: string;
}

interface NotificationsBody {
  id?: number;
  text: string;
  scheduled_at: string;
  receivers_sphere: number[];
}

interface NotificationsParams {
  page?: number;
  enabled?: boolean;
  size?: number;
}
