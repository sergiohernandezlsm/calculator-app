import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './FormInput.module.scss';

export interface Props {
  name: string;
  placeholder: string;
  text: string;
  label: string;
  min: number;
  max: number;
  disabled?: boolean;
  inputOnChangeHandler: (x: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<Props> = (props) => {
  return (
    <Form.Group className={`mb-3 ${styles.inputWrapper}`}>
      <Row>
        <Col>
          <Form.Label className={styles.title}>
            {props.label}
          </Form.Label>
        </Col>
      </Row>
      <Row>
        <Col xs={8}>
          <Form.Control
            disabled={props.disabled}
            className={styles.inputStyles}
            name={props.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.inputOnChangeHandler(e)}
            type="number"
            placeholder={props.placeholder}
            min={props.min}
            max={props.max}
          />
        </Col>
        <Col xs={4}>
          <Form.Text className={styles.extraText}>
            {props.text}
          </Form.Text>
        </Col>
      </Row>
    </Form.Group>
  )
};

export default FormInput;
