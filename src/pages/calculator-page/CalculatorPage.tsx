import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductTypes, FieldTypes, StateTypes, ProductTableTypes } from '../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import FormInput from '../../components/form-input';
import data from '../../services/data.json';
import { getTotals } from '../../helpers';

const CalculatorPage = () => {
  const [principal, setPrincipal] = useState(0);
  const [revolvingCreditData, setRevolvingCreditData] = useState([]);
  const [businessCreditData, setBusinessCreditData] = useState([]);
  const [totalBusinessCredit, setTotalBusinessCredict] = useState({ totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 });
  const [totalRevolvingCredit, setTotalRevolvingCredit] = useState({ totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 });
  const amount = useSelector((state: StateTypes) => state.amount);
  const duration = useSelector((state: StateTypes) => state.duration);
  const revolvingCredit = useSelector((state: StateTypes) => state.revolvingCredit);
  const buninessCredit = useSelector((state: StateTypes) => state.buninessCredit);
  const dispatch = useDispatch();

  const dispatchValues = (e: React.ChangeEvent<HTMLInputElement>, reference: string) => {
    if (e.target.name === reference) {
      dispatch({ type: reference, payload: +e.target.value });
    }
  }

  const calculatorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchValues(e, 'amount');
    dispatchValues(e, 'duration');
    dispatchValues(e, 'revolvingCredit');
    dispatchValues(e, 'buninessCredit');
  }

  const calculateRevolvingCredit = useCallback((creditName) => {


    const calculatorTable = (creditValue: any, upFrontPayment: any = 0) => {
      let initialCalculation: any = [] as ProductTableTypes[];
      for (let i = 0; i < duration; i++) {
        initialCalculation.push({
          principal: principal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          interest: (i !== 0 ? ((amount - (principal * i)) / 100) * creditValue : ((amount / 100) * creditValue) + upFrontPayment).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          totalRepayment: ((i !== 0 ? ((amount - (principal * i)) / 100) * creditValue : ((amount / 100) * creditValue) + upFrontPayment) + principal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        })
      }
      return initialCalculation;
    }


    if (creditName === 'revolvingCredit') {
      setRevolvingCreditData(calculatorTable(revolvingCredit.value));
      setTotalRevolvingCredit(getTotals(calculatorTable(revolvingCredit.value)));
    }

    if (creditName === 'buninessCredit') {
      const upFrontPayment = amount * 0.1;
      setBusinessCreditData(calculatorTable(buninessCredit.value, upFrontPayment));
      setTotalBusinessCredict(getTotals(calculatorTable(buninessCredit.value, upFrontPayment)));
    }

  }, [amount, buninessCredit.value, duration, principal, revolvingCredit.value])

  useEffect(() => {
    if (amount !== 0 && duration !== 0) {
      setPrincipal(amount / duration);
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateRevolvingCredit(revolvingCredit.name)
      }
      if (buninessCredit.value !== 0) {
        calculateRevolvingCredit(buninessCredit.name)
      }
    }
  }, [amount, duration, principal, buninessCredit.name, revolvingCredit.name, buninessCredit.value, revolvingCredit.value, calculateRevolvingCredit])

  const newGeneralData = data.productsData.map(x => {
    if (x.name === 'revolvingCredit') {
      return {
        ...x,
        productData: revolvingCreditData,
        totalRow: totalRevolvingCredit
      }
    }
    if (x.name === 'buninessCredit') {
      return {
        ...x,
        productData: businessCreditData,
        totalRow: totalBusinessCredit
      }
    }
    return {
      ...x,
      productData: [],
      totalRow: {}
    }
  });

  return (
    <Container>
      <Row>
        {data.formFields.map((field: FieldTypes, index: number) => {
          return (
            <FormInput
              key={`key-${index}`}
              placeholder={field.placeholder}
              name={field.name}
              text={field.text}
              label={field.label}
              min={10}
              max={100}
              calculatorHandler={calculatorHandler}
            />
          )
        })}
      </Row>
      <Row>
        {newGeneralData.map((loan: ProductTypes, index: number) => {
          return (
            <ProductTable
              productField={loan.formData}
              calculatorHandler={calculatorHandler}
              title={loan.title}
              key={`key-${index}`}
              id={index}
              productData={loan.productData}
              totalRow={loan?.totalRow}
            />
          );
        })}
      </Row>
    </Container>
  )
};

export default CalculatorPage;
