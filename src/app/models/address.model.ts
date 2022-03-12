export interface Province {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: number;
  name_th: string;
}
export interface Amphoe {
  id: number;
  name: string;
  code: number;
  name_th: string;
  province_id: number;
  created_at: string;
  updated_at: string;
}
export interface Tambon {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  code: number;
  name_th: string;
  post_code: number;
  district_id: number;
}
