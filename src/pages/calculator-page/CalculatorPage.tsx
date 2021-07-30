import { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import { ProductTypes, FieldTypes, StateTypes, ProductTableTypes } from '../../types';
import FormInput from '../../components/form-input';
import data from '../../services/data.json';
import { useEffect } from 'react';

const CalculatorPage = () => {
  const [principal, setPrincipal] = useState(0);
  const [productData, setProductData] = useState([]);
  const [totalRow, setTotalRow] = useState({ totalPrincipal: 0, totalInteres: 0, totalRepayment: 0 });
  const amount = useSelector((state: StateTypes) => state.amount);
  const duration = useSelector((state: StateTypes) => state.duration);
  const revolvingCredit = useSelector((state: StateTypes) => state.revolvingCredit);
  const buninessCredit = useSelector((state: StateTypes) => state.buninessCredit);
  const dispatch = useDispatch();

  const calculatorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'amount') {
      dispatch({ type: 'amount', payload: +e.target.value });
    }
    if (e.target.name === 'duration') {
      dispatch({ type: 'duration', payload: +e.target.value });
    }
    if (e.target.name === 'revolvingCredit') {
      dispatch({ type: 'revolvingCredit', payload: +e.target.value });
    }
    if (e.target.name === 'buninessCredit') {
      dispatch({ type: 'buninessCredit', payload: +e.target.value });
    }
  }

  const calculateProduct = useCallback(() => {
    let initialCalculation: any = [] as ProductTableTypes[];


    for (let i = 0; i < duration; i++) {
      initialCalculation.push({
        principal: principal,
        interest: i !== 0 ? ((amount - (principal * i)) / 100) * revolvingCredit : (amount / 100) * revolvingCredit,
        totalRepayment: (i !== 0 ? ((amount - (principal * i)) / 100) * revolvingCredit : (amount / 100) * revolvingCredit) + principal,
      })
    }

    setProductData(initialCalculation);



    setTotalRow({
      totalPrincipal: initialCalculation.map((x: ProductTableTypes) => x.principal).reduce((total: number, amount: number) => {
        return total + amount
      }, 0),
      totalInteres: initialCalculation.map((x: ProductTableTypes) => x.interest).reduce((total: number, amount: number) => {
        return total + amount
      }, 0),
      totalRepayment: initialCalculation.map((x: ProductTableTypes) => x.totalRepayment).reduce((total: number, amount: number) => {
        return total + amount
      }, 0)
    });
  }, [amount, duration, principal, revolvingCredit]);

  useEffect(() => {
    if (amount !== 0 && duration !== 0 && revolvingCredit !== 0) {
      setPrincipal(amount / duration);
    }
    if (principal !== 0) {
      calculateProduct();
    }
  }, [amount, duration, revolvingCredit, principal, calculateProduct])

  const newGeneralData = data.productsData.map(x => {
    return {
      ...x,
      productData
    }
  });

  console.log('newGeneralData', newGeneralData)

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
              productData={productData}
              totalRow={totalRow}
            />
          );
        })}
      </Row>
    </Container>
  )
};

export default CalculatorPage;
