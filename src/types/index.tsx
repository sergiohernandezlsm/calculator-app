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
  formData: FieldTypes;
}

export interface StateTypes {
  amount: number;
  duration: number;
  revolvingCredit: number;
  buninessCredit: number;
}

export interface ProductTableTypes {
  principal: number;
  interest: number;
  totalRepayment: number;
  creditName: string;
}