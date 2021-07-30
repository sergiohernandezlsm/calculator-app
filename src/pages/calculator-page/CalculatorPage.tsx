import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductTypes, FieldTypes, StateTypes } from '../../types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import FormInput from '../../components/form-input';
import data from '../../services/data.json';
import { getTotals, calculatorTable } from '../../helpers';

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

  const calculateCredits = useCallback((creditName) => {
    if (creditName === 'revolvingCredit') {
      setRevolvingCreditData(calculatorTable(revolvingCredit.value, 0, duration, principal, amount));
      setTotalRevolvingCredit(getTotals(calculatorTable(revolvingCredit.value, 0, duration, principal, amount)));
    }

    if (creditName === 'buninessCredit') {
      const upFrontPayment = amount * 0.1;
      setBusinessCreditData(calculatorTable(buninessCredit.value, upFrontPayment, duration, principal, amount));
      setTotalBusinessCredict(getTotals(calculatorTable(buninessCredit.value, upFrontPayment, duration, principal, amount)));
    }

  }, [amount, duration, principal, revolvingCredit.value, buninessCredit.value])

  useEffect(() => {
    if (amount !== 0 && duration !== 0) {
      setPrincipal(amount / duration);
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateCredits(revolvingCredit.name)
      }
      if (buninessCredit.value !== 0) {
        calculateCredits(buninessCredit.name)
      }
    }
  }, [amount, duration, principal, buninessCredit.name, revolvingCredit.name, buninessCredit.value, revolvingCredit.value, calculateCredits])

  const creditsData = data.productsData.map(product => {
    switch (product.name) {
      case 'revolvingCredit':
        return {
          ...product,
          productData: revolvingCreditData,
          totalRow: totalRevolvingCredit
        }
      case 'buninessCredit':
        return {
          ...product,
          productData: businessCreditData,
          totalRow: totalBusinessCredit
        }
      default:
        return {
          ...product,
          productData: [],
          totalRow: {}
        }
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
              min={0}
              max={100}
              calculatorHandler={calculatorHandler}
            />
          )
        })}
      </Row>
      <Row>
        {creditsData.map((loan: ProductTypes, index: number) => {
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
