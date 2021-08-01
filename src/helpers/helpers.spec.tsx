import { calculateTotal, getTotals, calculatorTable } from '.';

const mockNumbersAsString = ['1', '2', '3'];
const mockInitialCalculation = [{
  paymentDate: '100',
  principal: '20',
  interest: '3',
  totalRepayment: '100'
}];


describe('helpers test', () => {

  it('should return sum of total as string', () => {
    const testCalculateTotal = calculateTotal(mockNumbersAsString);
    expect(testCalculateTotal).toEqual("6");
  });

  it('should return total table row', () => {
    const testCalculateTotal = getTotals(mockInitialCalculation);
    expect(testCalculateTotal).toEqual(
      {
        totalInterest: "3",
        totalPrincipal: "20",
        totalRepayment: "100"
      });
  });

  it('should calculatorTable', () => {
    const testCalculateTotal = calculatorTable(3, 0, 2, 4000, 8000);
    expect(testCalculateTotal).toEqual([
      {
        interest: "240",
        paymentDate: "01/09/2021",
        principal: "4,000",
        totalRepayment: "4,240"
      },
      {
        interest: "120",
        paymentDate: "01/10/2021",
        principal: "4,000",
        totalRepayment: "4,120"
      }
    ]);
  });
});
