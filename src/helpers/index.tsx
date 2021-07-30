import { ProductTableTypes } from '../types';

const calculateTotal = (value: any) => {
  return value.reduce((total: number, amount: string) => {
    const toNumber = +amount.replace(/,/g, '');
    return total + toNumber;
  }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const getTotals = (initialCalculation: any) => {
  return {
    totalPrincipal: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.principal)),
    totalInterest: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.interest)),
    totalRepayment: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.totalRepayment))
  }
}

export const calculatorTable = (creditValue: number, upFrontPayment: number = 0, durationValue: number, principalValue: number, amountValue: number) => {
  let initialCalculation: any = [] as ProductTableTypes[];

  for (let i = 0; i < durationValue; i++) {
    initialCalculation.push({
      principal: principalValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      interest: (i !== 0 ? ((amountValue - (principalValue * i)) / 100) * creditValue : ((amountValue / 100) * creditValue) + upFrontPayment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      totalRepayment: ((i !== 0 ? ((amountValue - (principalValue * i)) / 100) * creditValue : ((amountValue / 100) * creditValue) + upFrontPayment) + principalValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    })
  }

  return initialCalculation;
}
