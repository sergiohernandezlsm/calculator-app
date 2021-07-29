import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import CalculatorForm from '../../components/calculator-form';
import { ProductTypes } from '../../types';
import data from '../../services/data.json';

const CalculatorPage = () => {
  const calculatorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name);
    console.log(e.target.value);
  }

  return (
    <Container>
      <Row>
        <CalculatorForm
          formField={data.formFields}
          calculatorHandler={calculatorHandler}
        />
      </Row>
      <Row>
        {data.productsData.map((loan: ProductTypes, index: number) => {
          return (
            <ProductTable
              productField={loan.formData}
              calculatorHandler={calculatorHandler}
              title={loan.title}
              key={`key-${index}`}
              id={index}
            />
          );
        })}
      </Row>
    </Container>
  )
};

export default CalculatorPage;
