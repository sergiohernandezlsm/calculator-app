import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './AmountForm.module.scss';

const AmountForm = () => {
  return (
    <div className={styles.formWrapper}>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Col>
              <Form.Label>Amount requested</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Form.Control type="number" placeholder="Amount" />
            </Col>
            <Col xs={4}>
              <Form.Text className="text-muted">
                (in £)
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Row>
            <Col>
              <Form.Label>Duration</Form.Label>
            </Col>
          </Row>
          <Row>
            <Col xs={8}>
              <Form.Control type="number" placeholder="Duration" />
            </Col>
            <Col xs={4}>
              <Form.Text className="text-muted">
                (in months)
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  )
}

export default AmountForm