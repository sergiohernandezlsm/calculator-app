import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ProductTable from '../../components/product-table';
import CalculatorForm from '../../components/calculator-form';

const CalculatorPage = () => {

  const loans = [
    {
      title: 'Revolving Credit Facility'
    },
    {
      title: 'Buniness loan'
    }
  ];

  return (
    <Container>
      <Row>
        <CalculatorForm />
      </Row>
      <Row>
        {loans.map(loan => {
          return (
            <ProductTable title={loan.title} />
          );
        })}
      </Row>
    </Container>
  )
}

export default CalculatorPage;