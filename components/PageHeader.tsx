interface IProps {
  title: string
}

/**
 * Render a page header.
 *
 * @export
 * @param {IProps} props
 * @returns
 */
export default function PageHeader (props: IProps) {
  return (
    <div className="pb-2 mt-4 mb-2">
      <h1>{props.title}</h1>
    </div>
  )
}
