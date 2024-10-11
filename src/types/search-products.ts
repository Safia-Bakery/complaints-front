interface SearchProducts {
  folders: Folder[];
  products: Product[];
}

interface Product {
  code: string;
  id: string;
  status: number;
  updated_at: null | string;
  name: string;
  num: string;
  parentid: string;
  created_at: string;
}

interface Folder {
  parent_id: null | string;
  num: string;
  code: string;
  description: string;
  updated_at: null | string;
  id: string;
  name: string;
  category: string;
  created_at: string;
}
