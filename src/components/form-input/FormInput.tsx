import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export interface Props {
  name: string;
  placeholder: string;
  text: string;
  label: string;
  min: number;
  max: number;
  calculatorHandler: (x: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = (props) => {
  return (
    <Form.Group className="mb-3">
      <Row>
        <Col>
          <Form.Label>
            {props.label}
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Form.Control
            name={props.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.calculatorHandler(e)}
            type="number"
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
          />
        </Col>
        <Col xs={4}>
          <Form.Text>
            {props.text}
          </Form.Text>
        </Col>
      </Row>
    </Form.Group>
  )
};

export default FormInput;
