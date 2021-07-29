import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './ProducTableForm.module.scss';

const ProducTableForm = () => {
  return (
    <div className={styles.inputWrapper}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Col>
              <Form.Label>Interes rate</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Form.Control type="number" placeholder="Duration" />
            </Col>
            <Col xs={4}>
              <Form.Text className="text-muted">
                (in %)
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  )
}

export default ProducTableForm;