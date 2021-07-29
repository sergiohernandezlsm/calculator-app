import React from 'react';
import Form from 'react-bootstrap/Form';
import FornInput from '../form-input';
import styles from './ProductForm.module.scss';

export interface Props {
  calculatorHandler: (x: any) => void;
}

const ProductForm: React.FC<Props> = (props) => {
  return (
    <div className={styles.inputWrapper}>
      <Form>
        <FornInput calculatorHandler={props.calculatorHandler} placeholder="Duration" text={'(in %)'} name={'Interes rate'} />
      </Form>
    </div>
  )
}

export default ProductForm;