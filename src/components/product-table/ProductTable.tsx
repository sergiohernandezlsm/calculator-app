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
  productData: ProductTableTypes[];
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
        {[props.productField].map((field: FieldTypes, index: number) => {
          return (
            <FormInput
              key={`key-${index}`}
              placeholder={field.placeholder}
              name={field.name}
              text={field.text}
              label={field.label}
              min={0}
              max={100}
              inputOnChangeHandler={props.inputOnChangeHandler}
            />
          )
        })}
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
                    id={index}
                    key={`key-${index}`}
                    paymentDate={product.paymentDate}
                    principal={product.principal}
                    interest={product.interest}
                    totalRepayment={product.totalRepayment}
                  />
                )
              })}
              <tr className={`${styles.textStyle} ${styles.totalStyle}`}>
                <td>Total</td>
                <td>{`£${props.totalRow?.totalPrincipal}` || 0}</td>
                <td>{`£${props.totalRow?.totalInterest}` || 0}</td>
                <td>{`£${props.totalRow?.totalRepayment}` || 0}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </Col>
  );
};

export default ProductTable;
