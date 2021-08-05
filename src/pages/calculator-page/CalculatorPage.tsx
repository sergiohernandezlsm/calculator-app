import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductTypes, FieldTypes, StateTypes } from '../../types';
import {
  setAmount,
  setDuration,
  setBusiness,
  setRevolving,
  setCreditsData,
  setRequestForm,
  setPrincipal
} from '../../actions';
import styles from './CalculatorPage.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import FormInput from '../../components/form-input';
import data from '../../services/data.json';
import { getTotals, calculatorTable } from '../../helpers';
import useApiRange from '../../hooks';

const CalculatorPage = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state: StateTypes) => state.amount);
  const duration = useSelector((state: StateTypes) => state.duration);
  const revolvingCredit = useSelector((state: StateTypes) => state.revolvingCredit);
  const businessCredit = useSelector((state: StateTypes) => state.businessCredit);
  const initialCreditsData = useSelector((state: StateTypes) => state.credits);
  const requestForm = useSelector((state: StateTypes) => state.requestForm);
  const principal = useSelector((state: StateTypes) => state.principal);
  const range = useSelector((state: StateTypes) => state.range);
  const { sendRequest } = useApiRange();
  const [loanRange, setLoanRange] = useState({ revolvingRange: true, businessRange: true })
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
    if (e.target.name === 'amount') {
      setAmount(dispatch, +e.target.value);
    }
    if (e.target.name === 'duration') {
      setDuration(dispatch, +e.target.value);
    }
    if (e.target.name === 'revolvingCredit') {
      setRevolving(dispatch, +e.target.value);
    }
    if (e.target.name === 'businessCredit') {
      setBusiness(dispatch, +e.target.value);
    }
  }

  const calculateRange = useCallback(() => {
    if (amount >= range.revolvingCreditFacility?.amountMin && duration >= range.revolvingCreditFacility.durationMin) {
      setLoanRange(prevState => {
        return {
          ...prevState,
          revolvingRange: false
        }
      });
    } else {
      setLoanRange(prevState => {
        return {
          ...prevState,
          revolvingRange: true
        }
      });
    }
    if (amount >= range.businessLoan?.amountMin && duration >= range.businessLoan.durationMin) {
      setLoanRange(prevState => {
        return {
          ...prevState,
          businessRange: false
        }
      });
    } else {
      setLoanRange(prevState => {
        return {
          ...prevState,
          businessRange: true
        }
      });
    }
  }, [amount, duration, range.businessLoan?.amountMin, range.businessLoan?.durationMin, range.revolvingCreditFacility?.amountMin, range.revolvingCreditFacility?.durationMin])

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
    sendRequest();
    calculateRange();
    setCreditsData(dispatch, data.productsData);
    setRequestForm(dispatch, data.formFields);
    if (amount !== 0 && duration !== 0) {
      setPrincipal(dispatch, amount / duration);
    }
    if (principal !== 0) {
      if (revolvingCredit.value !== 0) {
        calculateCredits(revolvingCredit.name);
      }
      if (businessCredit.value !== 0) {
        calculateCredits(businessCredit.name);
      }
    }
  }, [amount, duration, principal, businessCredit.name, revolvingCredit.name, businessCredit.value, revolvingCredit.value, calculateCredits, dispatch, sendRequest, calculateRange])

  const creditsData = initialCreditsData.map((product: ProductTypes) => {
    switch (product.creditName) {
      case 'revolvingCredit':
        return {
          ...product,
          productData: loans.revolving.productData,
          totalRow: loans.revolving.total,
          disabledRange: loanRange.revolvingRange
        }
      case 'businessCredit':
        return {
          ...product,
          productData: loans.business.productData,
          totalRow: loans.business.total,
          disabledRange: loanRange.businessRange
        }
      default:
        return {
          ...product,
          productData: [],
          totalRow: {},
          disabledRange: false
        }
    }
  });
  console.log('creditsData', creditsData)
  console.log('loanRange', loanRange)

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
                disabledRange={loan?.disabledRange}
              />
            );
          })}
        </Row>
      </main>
    </Container>
  )
};

export default CalculatorPage;
