import React from 'react';
import styles from './Table.module.scss';

export interface Props {
  id: number;
  paymentDate: any;
  principal?: number;
  interest?: number;
  totalRepayment?: number;
}

const TableComponent: React.FC<Props> = (props) => {
  return (
    <tr key={`key-${props.id}`} className={styles.textStyle}>
      <td>{props.paymentDate}</td>
      <td>{`£${props.principal}`}</td>
      <td>{`£${props.interest}`}</td>
      <td>{`£${props.totalRepayment}`}</td>
    </tr>
  )
}

export default TableComponent;
