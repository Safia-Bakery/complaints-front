interface TgUser {
  name: string;
  status: number;
  created_at: string;
  id: number;
  branch?: { id: number; name: string };
}
