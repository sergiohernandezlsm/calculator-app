export interface FieldTypes {
  name: string;
  placeholder: string;
  text: string;
  label: string;
  min: number;
  max: number;
}

export interface ProductTypes {
  title: string;
  name: string;
  productData: any;
  formData: FieldTypes;
}

export interface StateTypes {
  amount: number;
  duration: number;
  revolvingCredit: { value: number, name: string };
  buninessCredit: { value: number, name: string };
}

export interface ProductTableTypes {
  principal: number;
  interest: number;
  totalRepayment: number;
  creditName: string;
}