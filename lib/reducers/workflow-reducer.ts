import { Invoice } from 'xero-node/lib/AccountingAPI-models'
import { WorkflowAction } from '~lib/actions/workflow-actions'

/**
 * The application workflow state.
 *
 * @export
 * @interface IWorkflowState
 */
export interface IWorkflowState {
  selectedInvoice: Invoice
}

/**
 * The initial workflow state.
 */
export const initialState: IWorkflowState = {
  selectedInvoice: null
}

/**
 * The workflow reducer
 */
export default function reducer (state: IWorkflowState, action: WorkflowAction): IWorkflowState {
  switch (action.type) {
    case 'selected_invoice':
      return {
        ...state,
        selectedInvoice: action.invoice
      }

    case 'deselect_invoice':
      return {
        ...state,
        selectedInvoice: null
      }

    default:
      return state
  }
}
