import React from 'react';
import Form from 'react-bootstrap/Form';
import FormInput from '../form-input';
import { FieldTypes } from '../../types';
import styles from './CalculatorForm.module.scss';

export interface Props {
  calculatorHandler: (x: React.ChangeEvent<HTMLInputElement>) => void;
  formField: FieldTypes[];
}

const CalculatorForm: React.FC<Props> = (props) => {
  return (
    <div className={styles.formWrapper}>
      <Form>
        {props.formField.map((field: FieldTypes, index: number) => {
          return (
            <div key={`key-${index}`}>
              <FormInput
                calculatorHandler={props.calculatorHandler}
                key={`key-${index}`}
                placeholder={field.placeholder}
                name={field.name}
                text={field.text}
                label={field.label}
                min={field.min}
                max={field.max}
              />
            </div>
          )
        })}
      </Form>
    </div>
  )
};

export default CalculatorForm;
