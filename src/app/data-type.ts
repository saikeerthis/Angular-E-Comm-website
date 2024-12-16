export interface signUp{
  name: string;
  email: string;
  password: string;
}

export interface login{
  email : string;
  password: string;
}

export interface product {
  name : string;
  price : number;
  color : string;
  category : string;
  description : string;
  image : string;
  id: string;
  quantity : undefined | number;
  productId : undefined | string;
}

export interface cart {
  name : string;
  price : number;
  color : string;
  category : string;
  description : string;
  image : string;
  id: string | undefined;
  quantity : undefined | number;
  productId : string;
  userId : number;
}

export interface priceSummary {
  price : number;
  discount : number;
  tax : number;
  delivery : number;
  total : number;
}

export interface order {
  email : string;
  contact : string;
  address : string;
  totalPrice : number;
  userId : string;
  id : string | undefined;
}
