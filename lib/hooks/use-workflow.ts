import { useContext } from 'react'
import WorkflowContext from '~components/stores/WorkflowContext'
import * as actions from '~lib/actions/workflow-actions'

/**
 * Hook provides assistance with payment workflow.
 *
 * @export
 * @returns
 */
export default function useWorkflow () {
  const { state, dispatch } = useContext(WorkflowContext)

  return {
    state,
    selectInvoice: actions.selectInvoice(dispatch),
    deselectInvoice: actions.deselectInvoice(dispatch)
  }
}
