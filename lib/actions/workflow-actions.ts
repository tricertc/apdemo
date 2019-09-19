import { Dispatch } from 'react'
import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { IAction } from '~common/interfaces'

interface ISelectedInvoiceAction extends IAction {
  type: 'selected_invoice'
  invoice: Invoice
}

interface IDeselectInvoiceAction extends IAction {
  type: 'deselect_invoice'
}

/**
 * Set the selected invoice.
 */
export type WorkflowAction = ISelectedInvoiceAction | IDeselectInvoiceAction

/**
 * Set the selected invoice.
 */
export const selectInvoice = (dispatch: Dispatch<ISelectedInvoiceAction>) =>
  (invoice: Invoice) => {
    dispatch({ type: 'selected_invoice', invoice })
  }

/**
 * Clear the invoice selection.
 */
export const deselectInvoice = (dispatch: Dispatch<IDeselectInvoiceAction>) => () => {
  dispatch({ type: 'deselect_invoice' })
}
