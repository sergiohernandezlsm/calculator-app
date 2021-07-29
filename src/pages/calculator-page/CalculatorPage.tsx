import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import CalculatorForm from '../../components/amount-form';

const CalculatorPage = () => {

  const loans = [
    {
      title: 'Revolving Credit Facility'
    },
    {
      title: 'Buniness loan'
    }
  ];

  const calculatorHandler = (e: any) => {
    console.log(e.target.value);
  }

  return (
    <Container>
      <Row>
        <CalculatorForm calculatorHandler={calculatorHandler} />
      </Row>
      <Row>
        {loans.map((loan, index) => {
          return (
            <ProductTable calculatorHandler={calculatorHandler} title={loan.title} key={`key-${index}`} id={index} />
          );
        })}
      </Row>
    </Container>
  )
}

export default CalculatorPage;