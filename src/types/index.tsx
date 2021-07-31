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
  creditName: string;
  productData: ProductTableTypes[];
  formData: FieldTypes;
  totalRow?: {
    totalPrincipal?: number;
    totalInterest?: number;
    totalRepayment?: number;
  };
}

export interface StateTypes {
  amount: number;
  duration: number;
  revolvingCredit: {
    value: number;
    name: string;
  };
  buninessCredit: {
    value: number;
    name: string;
  };
}

export interface ProductTableTypes {
  paymentDate: any;
  principal?: number;
  interest?: number;
  totalRepayment?: number;
}
