export interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface NewsFormData {
  title: string;
  content: string;
  author: string;
}
