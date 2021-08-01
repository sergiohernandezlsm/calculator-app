import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductTypes, FieldTypes, StateTypes } from '../../types';
import styles from './CalculatorPage.module.scss';
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
  const businessCredit = useSelector((state: StateTypes) => state.businessCredit);
  const credits = useSelector((state: StateTypes) => state.credits);
  const requestForm = useSelector((state: StateTypes) => state.requestForm);
  const dispatch = useDispatch();
  const dispatchInputValues = (e: React.ChangeEvent<HTMLInputElement>, reference: string) => {
    if (e.target.name === reference) {
      dispatch({ type: reference, payload: +e.target.value });
    }
  }

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchInputValues(e, 'amount');
    dispatchInputValues(e, 'duration');
    dispatchInputValues(e, 'revolvingCredit');
    dispatchInputValues(e, 'businessCredit');
  }

  const calculateCredits = useCallback((creditName) => {
    if (creditName === 'revolvingCredit') {
      setRevolvingCreditData(calculatorTable(revolvingCredit.value, 0, duration, principal, amount));
      setTotalRevolvingCredit(getTotals(calculatorTable(revolvingCredit.value, 0, duration, principal, amount)));
    }

    if (creditName === 'businessCredit') {
      const upFrontPayment = amount * 0.1;
      setBusinessCreditData(calculatorTable(businessCredit.value, upFrontPayment, duration, principal, amount));
      setTotalBusinessCredict(getTotals(calculatorTable(businessCredit.value, upFrontPayment, duration, principal, amount)));
    }

  }, [amount, duration, principal, revolvingCredit.value, businessCredit.value])

  useEffect(() => {
    dispatch({ type: 'creditsData', payload: data.productsData })
    dispatch({ type: 'requestForm', payload: data.formFields })
    if (amount !== 0 && duration !== 0) {
      setPrincipal(amount / duration);
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateCredits(revolvingCredit.name)
      }
      if (businessCredit.value !== 0) {
        calculateCredits(businessCredit.name)
      }
    }
  }, [amount, duration, principal, businessCredit.name, revolvingCredit.name, businessCredit.value, revolvingCredit.value, calculateCredits, dispatch])

  const creditsData = credits.map((product: ProductTypes) => {
    switch (product.creditName) {
      case 'revolvingCredit':
        return {
          ...product,
          productData: revolvingCreditData,
          totalRow: totalRevolvingCredit
        }
      case 'businessCredit':
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
      <main className={styles.mainWrapper}>
        <h1>Loan Calculator</h1>
        <Row>
          {requestForm.map((field: FieldTypes, index: number) => {
            return (
              <FormInput
                key={`key-${index}`}
                placeholder={field.placeholder}
                name={field.name}
                text={field.text}
                label={field.label}
                inputOnChangeHandler={inputOnChangeHandler}
              />
            )
          })}
        </Row>
        <Row>
          {creditsData.map((loan: ProductTypes, index: number) => {
            return (
              <ProductTable
                productField={loan.formData}
                inputOnChangeHandler={inputOnChangeHandler}
                title={loan.title}
                key={`key-${index}`}
                id={index}
                productData={loan.productData}
                totalRow={loan?.totalRow}
              />
            );
          })}
        </Row>
      </main>
    </Container>
  )
};

export default CalculatorPage;
