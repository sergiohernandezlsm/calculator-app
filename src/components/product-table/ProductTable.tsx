import React from "react";
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import CalculatorForm from '../calculator-form';
import { FieldTypes } from '../../types';
import styles from './ProductTable.module.scss';

export interface Props {
  title: string;
  id: number;
  productField: FieldTypes;
  productData: any;
  totalRow: any;
  calculatorHandler: (x: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTable: React.FC<Props> = (props) => {
  return (
    <Col xs={12} md={6}>
      <div className={styles.productTableWrapper}>
        <h3>{props.title}</h3>
        <CalculatorForm
          formField={[props.productField]}
          calculatorHandler={props.calculatorHandler}
        />
        <div className={styles.tableWrapper}>
          <Table striped bordered hover>
            <thead>
              <tr className={styles.textStyle}>
                <th>Repayment date</th>
                <th>Principal</th>
                <th>Interes</th>
                <th>Total repayment</th>
              </tr>
            </thead>
            <tbody>
              {props.productData && props.productData.map((product: any, index: number) => {
                return (
                  <tr key={`key-${index}`} className={styles.textStyle}>
                    <td>30/06/2019</td>
                    <td>{`£${product.principal}`}</td>
                    <td>{`£${product.interest}`}</td>
                    <td>{`£${product.totalRepayment}`}</td>
                  </tr>
                )
              })}
              <tr className={styles.textStyle}>
                <td>Total</td>
                <td>{`£${props.totalRow.totalPrincipal}` || 0}</td>
                <td>{`£${props.totalRow.totalInteres}` || 0}</td>
                <td>{`£${props.totalRow.totalRepayment}` || 0}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Col>
  );
};

export default ProductTable;
