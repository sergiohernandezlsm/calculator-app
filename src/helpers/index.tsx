import { ProductTableTypes } from '../types';

export const getTotals = (initialCalculation: any) => {

  const calculateTotal = (value: any) => {
    return value.reduce((total: number, amount: string) => {
      const toNumber = +amount.replace(/,/g, '');
      return total + toNumber;
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  return {
    totalPrincipal: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.principal)),
    totalInterest: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.interest)),
    totalRepayment: calculateTotal(initialCalculation.map((x: ProductTableTypes) => x.totalRepayment))
  }
}
