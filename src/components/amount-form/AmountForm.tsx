import React from 'react';
import Form from 'react-bootstrap/Form';
import FormInput from '../form-input';
import styles from './AmountForm.module.scss';

export interface Props {
  calculatorHandler: (x: any) => void;
}

const AmountForm: React.FC<Props> = (props) => {

  const formInputs = [
    {
      name: 'Amount requested',
      placeholder: 'Amount',
      text: '(in £)'
    },
    {
      name: 'Duration',
      placeholder: 'Duration',
      text: '(in months)'
    }
  ];

  return (
    <div className={styles.formWrapper}>
      <Form>
        {formInputs.map((input, index) => {
          return (
            <FormInput calculatorHandler={props.calculatorHandler} key={`key-${index}`} placeholder={input.placeholder} name={input.name} text={input.text} />
          )
        })}
      </Form>
    </div>
  )
}

export default AmountForm