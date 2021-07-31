import React from 'react';
import styles from './Table.module.scss';

export interface Props {
  paymentDate: any;
  principal?: number;
  interest?: number;
  totalRepayment?: number;
  extraClass?: string;
}

const TableComponent: React.FC<Props> = (props) => {
  return (
    <tr className={`${styles.textStyle} ${props.extraClass && styles.totalStyle}`}>
      <td>{props.paymentDate}</td>
      <td>{`£${props.principal}`}</td>
      <td>{`£${props.interest}`}</td>
      <td>{`£${props.totalRepayment}`}</td>
    </tr>
  )
}

export default TableComponent;
