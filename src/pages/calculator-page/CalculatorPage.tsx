import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductTypes, FieldTypes, StateTypes } from '../../types';
import styles from './CalculatorPage.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import FormInput from '../../components/form-input';
import data from '../../services/data.json';
import { getTotals, dispatchValues, calculatorTable } from '../../helpers';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state: StateTypes) => state.amount);
  const duration = useSelector((state: StateTypes) => state.duration);
  const revolvingCredit = useSelector((state: StateTypes) => state.revolvingCredit);
  const businessCredit = useSelector((state: StateTypes) => state.businessCredit);
  const initialCreditsData = useSelector((state: StateTypes) => state.credits);
  const requestForm = useSelector((state: StateTypes) => state.requestForm);
  const principal = useSelector((state: StateTypes) => state.principal);
  const [loans, setLoans] = useState({
    revolving: {
      productData: [],
      total: { totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 }
    },
    business: {
      productData: [],
      total: { totalPrincipal: 0, totalInterest: 0, totalRepayment: 0 }
    }
  });

  const inputOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatchValues(e, 'amount', dispatch, null);
    dispatchValues(e, 'duration', dispatch, null);
    dispatchValues(e, 'revolvingCredit', dispatch, null);
    dispatchValues(e, 'businessCredit', dispatch, null);
  }

  const calculateCredits = useCallback((creditName) => {
    if (creditName === 'revolvingCredit') {
      setLoans(prevState => {
        return {
          ...prevState,
          revolving: {
            productData: calculatorTable(revolvingCredit.value, 0, duration, principal, amount),
            total: getTotals(calculatorTable(revolvingCredit.value, 0, duration, principal, amount))
          }
        }
      });
    }
    if (creditName === 'businessCredit') {
      const upFrontPayment = amount * 0.1;
      setLoans(prevState => {
        return {
          ...prevState,
          business: {
            productData: calculatorTable(businessCredit.value, upFrontPayment, duration, principal, amount),
            total: getTotals(calculatorTable(businessCredit.value, upFrontPayment, duration, principal, amount))
          }
        }
      });
    }

  }, [revolvingCredit.value, duration, principal, amount, businessCredit.value])

  useEffect(() => {
    dispatchValues(null, 'creditsData', dispatch, data.productsData)
    dispatchValues(null, 'requestForm', dispatch, data.formFields)
    if (amount !== 0 && duration !== 0) {
      dispatchValues(null, 'principal', dispatch, amount / duration)
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateCredits(revolvingCredit.name);
      }
      if (businessCredit.value !== 0) {
        calculateCredits(businessCredit.name);
      }
    }
  }, [amount, duration, principal, businessCredit.name, revolvingCredit.name, businessCredit.value, revolvingCredit.value, calculateCredits, dispatch])

  const creditsData = initialCreditsData.map((product: ProductTypes) => {
    switch (product.creditName) {
      case 'revolvingCredit':
        return {
          ...product,
          productData: loans.revolving.productData,
          totalRow: loans.revolving.total
        }
      case 'businessCredit':
        return {
          ...product,
          productData: loans.business.productData,
          totalRow: loans.business.total
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
