export interface FieldTypes {
  name: string;
  placeholder: string;
  text: string;
  label: string;
}

export interface ProductTypes {
  title: string;
  creditName: string;
  productData?: ProductTableTypes[];
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
  principal: number;
  revolvingCredit: {
    value: number;
    name: string;
  };
  businessCredit: {
    value: number;
    name: string;
  };
  credits: ProductTypes[];
  requestForm: FieldTypes[];
}

export interface ProductTableTypes {
  paymentDate: string;
  principal?: number;
  interest?: number;
  totalRepayment?: number;
}
