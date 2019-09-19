import Head from 'next/head'

/**
 * Base layout properties.
 *
 * @export
 * @interface IBaseLayoutProps
 */
export interface IBaseLayoutProps {
  children: React.ReactNode
  title?: string
}

/**
 * The base layout.
 *
 * @export
 * @param {IBaseLayoutProps} props
 * @returns
 */
export default function BaseLayout (props: IBaseLayoutProps) {
  return (
    <>
      <Head>
        <title>{props.title || process.env.DEFAULT_TITLE}</title>
      </Head>
      {props.children}
    </>
  )
}
