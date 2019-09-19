import moment from 'moment'
import React from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import useWorkflow from '~lib/hooks/use-workflow'

interface IProps {
  onHide: () => void
}

interface IFieldProps {
  label: string
  value: string
}

const Field = (props: IFieldProps) => (
  <Form.Group>
    <Form.Label>{props.label}</Form.Label>
    <Form.Control value={props.value} readOnly />
  </Form.Group>
)

/**
 * Pay the selected invoice by check.
 */
export default function CheckPaymentModal (props: IProps) {
  const { state } = useWorkflow()

  const invoice = state.selectedInvoice
  const address = invoice.Contact.Addresses.filter(addr => {
    return addr.AddressType === 'STREET'
  })[0]

  return (
    <Modal size="lg" onHide={props.onHide} show>
      <Modal.Header closeButton>
        <Modal.Title>Create New Check</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={7}>
              <Field label="Pay to the order of" value={invoice.Contact.Name} />
              <Field label="Amount" value={invoice.AmountDue.toFixed(2)} />
              <Field label="Memo" value={invoice.InvoiceNumber} />
              <Field label="Date" value={moment.utc().format('MM/DD/YYYY')} />
            </Col>
            <Col md={5}>
              <Field label="Address" value={address.AddressLine1} />
              <Field label="Address line 2" value={address.AddressLine2} />
              <Field label="City" value={address.City} />
              <Row>
                <Col sm={4}>
                  <Field label="State" value={address.Region} />
                </Col>
                <Col sm={8}>
                  <Field label="Zip" value={address.PostalCode} />
                </Col>
              </Row>
            </Col>
          </Row>
          <hr/>
          <h5>Line Items</h5>
          <Row>
            {invoice.LineItems && invoice.LineItems.map((item, key) => (
              <React.Fragment key={key}>
                <Col md={1} />
                <Col md={9}>
                  <em>{item.Description}</em>
                </Col>
                <Col md={2}>$ {item.LineAmount.toFixed(2)}</Col>
              </React.Fragment>
            ))}
          </Row>
          <hr />
          <Row className="mb-3">
            <Col md={2} />
            <Col md={8}>
              <strong>Total</strong>
            </Col>
            <Col md={2}>
              <strong>$ {invoice.AmountDue.toFixed(2)}</strong>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
        <Button variant="primary">Create Check</Button>
      </Modal.Footer>
    </Modal>
  )
}
