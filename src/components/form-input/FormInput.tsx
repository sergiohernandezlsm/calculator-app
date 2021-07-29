import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface Props {
  name: string;
  placeholder: string;
  text: string;
  calculatorHandler: (x: any) => void;
}

const FormInput: React.FC<Props> = (props) => {
  return (
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <Row>
        <Col>
          <Form.Label>{props.name}</Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Form.Control onChange={(e) => props.calculatorHandler(e)} type="number" placeholder={props.placeholder} />
        </Col>
        <Col xs={4}>
          <Form.Text className="text-muted">
            {props.text}
          </Form.Text>
        </Col>
      </Row>
    </Form.Group>
  )
}

export default FormInput;