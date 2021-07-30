import { ProductTableTypes } from '../types';

export const getTotals = (initialCalculation: any) => {
  return {
    totalPrincipal: initialCalculation.map((x: ProductTableTypes) => x.principal).reduce((total: number, amount: string) => {
      const toNumber = +amount.replace(/,/g, '');
      return total + toNumber;
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalInterest: initialCalculation.map((x: ProductTableTypes) => x.interest).reduce((total: number, amount: string) => {
      const toNumber = +amount.replace(/,/g, '');
      return total + toNumber
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    totalRepayment: initialCalculation.map((x: ProductTableTypes) => x.totalRepayment).reduce((total: number, amount: string) => {
      const toNumber = +amount.replace(/,/g, '');
      return total + toNumber
    }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }
}
