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
  const [allowCredit1, setAllowCredit1] = useState(false);
  const [allowCredit2, setAllowCredit2] = useState(false);
  const [totalBusinessCredit, setTotalBusinessCredict] = useState({ totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 });
  const [totalRevolvingCredit, setTotalRevolvingCredit] = useState({ totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 });
  const amount = useSelector((state: StateTypes) => state.amount);
  const duration = useSelector((state: StateTypes) => state.duration);
  const revolvingCredit = useSelector((state: StateTypes) => state.revolvingCredit);
  const buninessCredit = useSelector((state: StateTypes) => state.buninessCredit);
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
    dispatchInputValues(e, 'buninessCredit');
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

  const enableCredit = useCallback((creditName) => {
    if (creditName === 'revolvingCredit') {
      if (amount < 1000 || amount > 150000 || duration < 1 || duration > 12) {
        setAllowCredit1(true);
        dispatch({ type: 'revolvingCredit', payload: 0 });
      } else {
        setAllowCredit1(false);
      }
    }
    if (creditName === 'buninessCredit') {
      if (amount < 10000 || amount > 200000 || duration < 1 || duration > 60) {
        setAllowCredit2(true);
        dispatch({ type: 'buninessCredit', payload: 0 });
      } else {
        setAllowCredit2(false);
      }
    }
  }, [amount, duration])

  useEffect(() => {
    dispatch({ type: 'creditsData', payload: data.productsData });
    dispatch({ type: 'requestForm', payload: data.formFields });
    if (amount > 0 && duration > 0) {
      setPrincipal(amount / duration);

    }
    if (amount >= 0 && duration >= 0) {
      enableCredit(revolvingCredit.name);
      enableCredit(buninessCredit.name);
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateCredits(revolvingCredit.name);
      }
      if (buninessCredit.value !== 0) {
        calculateCredits(buninessCredit.name);
      }
    }
  }, [amount, duration, principal, buninessCredit.name, revolvingCredit.name, buninessCredit.value, revolvingCredit.value, calculateCredits, dispatch, enableCredit])

  const creditsData = credits.map((product: ProductTypes) => {
    switch (product.creditName) {
      case 'revolvingCredit':
        return {
          ...product,
          productData: revolvingCreditData,
          totalRow: totalRevolvingCredit,
          disabledCredit: allowCredit1
        }
      case 'buninessCredit':
        return {
          ...product,
          productData: businessCreditData,
          totalRow: totalBusinessCredit,
          disabledCredit: allowCredit2,
        }
      default:
        return {
          ...product,
          productData: [],
          totalRow: {},
          disabledCredit: false
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
                min={0}
                max={100}
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
                disabledCredit={loan?.disabledCredit}
              />
            );
          })}
        </Row>
      </main>
    </Container>
  )
};

export default CalculatorPage;
