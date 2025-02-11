export type TLoginFormInput = {
  name: string;
  email: string;
};

export type TSearchFormInput = {
  breeds: string[] | null;
  zipCodes: string | null;
  ageMin: number | null;
  ageMax: number | null;
};

export type TSearch = {
  breeds: string[] | null;
  zipCodes: string[] | null;
  ageMin: number | null;
  ageMax: number | null;
};

export type TDog = {
  age: number;
  breed: string;
  id: string;
  img: string;
  name: string;
  zip_code: string;
};
