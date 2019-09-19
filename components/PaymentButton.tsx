import { useState } from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import CheckPaymentModal from './modals/CheckPaymentModal'

/**
 * Invoice payment button with a dropdown for payment options.
 *
 * @export
 * @returns
 */
export default function PaymentButton () {
  const [ paymentMethod, setPaymentMethod ] = useState<string>(null)

  const cancel = () => setPaymentMethod(null)

  return (
    <>
      <DropdownButton
        id="payment-dropdown"
        title="Pay Invoice"
        variant="primary"
        style={{
          display: 'inline'
        }}
      >
        <Dropdown.Item onClick={() => setPaymentMethod('check')}>
          Mail Check
        </Dropdown.Item>
        <Dropdown.Item disabled>Print Check</Dropdown.Item>
        <Dropdown.Item disabled>By ACH</Dropdown.Item>
      </DropdownButton>
      {paymentMethod === 'check' && <CheckPaymentModal onHide={cancel} />}
    </>
  )
}
