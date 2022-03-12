export class Client {
  id: number;
  first_name: string;
  last_name: string;
  gender_id: string;
  birthday: string;
  email: string;
  phone: string;
  house_no: string;
  sub_district_id: string;
  district_id: string;
  province_id: string;
  postcode: string;
  race_id: string;
  shirt_size_id: string;
  image: File;
}

export interface ClientShow {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: string;
  race: string;
  price: number;
  shirt: Shirt;
  address: Address;
  image: string;
}

interface Address {
  house_no: string;
  sub_district: string;
  district: string;
  province: string;
  postcode: string;
}

interface Shirt {
  shirt_size: string;
  chest: number;
}
