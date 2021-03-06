import React from "react";
import FormInput from "../form-input";
import { FieldTypes, ProductTableTypes } from '../../types';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import TableComponent from './table';
import styles from './ProductTable.module.scss';

export interface Props {
  title: string;
  id: number;
  productField: FieldTypes;
  productData?: ProductTableTypes[];
  totalRow?: {
    totalPrincipal?: number;
    totalInterest?: number;
    totalRepayment?: number;
  };
  inputOnChangeHandler: (x: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductTable: React.FC<Props> = (props) => {
  return (
    <Col xs={12} md={6}>
      <div className={styles.productTableWrapper}>
        <h3>{props.title}</h3>
        <FormInput
          placeholder={props.productField.placeholder}
          name={props.productField.name}
          text={props.productField.text}
          label={props.productField.label}
          inputOnChangeHandler={props.inputOnChangeHandler}
        />
        <div className={styles.tableWrapper}>
          <Table striped bordered hover className={styles.tableStyles}>
            <thead>
              <tr className={styles.textStyle}>
                <th>Repayment date</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total repayment</th>
              </tr>
            </thead>
            <tbody>
              {props.productData && props.productData.map((product: ProductTableTypes, index: number) => {
                return (
                  <TableComponent
                    key={`key-${index}`}
                    paymentDate={product.paymentDate}
                    principal={product.principal}
                    interest={product.interest}
                    totalRepayment={product.totalRepayment}
                  />
                )
              })}
              <TableComponent
                paymentDate="Total"
                principal={props.totalRow?.totalPrincipal}
                interest={props.totalRow?.totalInterest}
                totalRepayment={props.totalRow?.totalRepayment}
                extraClass="totalStyle"
              />
            </tbody>
          </Table>
        </div>
      </div>
    </Col>
  );
};

export default ProductTable;
