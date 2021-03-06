import moment from 'moment';
import 'moment/locale/en-gb';
import { ProductTableTypes } from '../types';

export const calculatorTable = (creditValue: number, upFrontPayment: number = 0, durationValue: number, principalValue: number, amountValue: number) => {
  let initialCalculation: any = [] as ProductTableTypes[];
  for (let i = 0; i < durationValue; i++) {
    initialCalculation.push({
      paymentDate: moment().add(i + 1, 'months').calendar(),
      principal: principalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      interest: (i !== 0 ? ((amountValue - (principalValue * i)) / 100) * creditValue : ((amountValue / 100) * creditValue) + upFrontPayment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      totalRepayment: ((i !== 0 ? ((amountValue - (principalValue * i)) / 100) * creditValue : ((amountValue / 100) * creditValue) + upFrontPayment) + principalValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    })
  }

  return initialCalculation;
}
