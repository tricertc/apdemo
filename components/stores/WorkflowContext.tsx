import { createContext, Dispatch, useReducer } from 'react'
import { WorkflowAction } from '~lib/actions/workflow-actions'
import reducer, { initialState, IWorkflowState } from '~lib/reducers/workflow-reducer'

interface IWorkflowContext {
  state: IWorkflowState
  dispatch: Dispatch<WorkflowAction>
}

const WorkflowContext = createContext<IWorkflowContext>(null)

interface IProps {
  children: React.ReactNode
}

/**
 * Workflow context provider.
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export function WorkflowContextProvider (props: IProps) {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  return (
    <WorkflowContext.Provider value={{ state, dispatch }}>
      {props.children}
    </WorkflowContext.Provider>
  )
}

export default WorkflowContext
