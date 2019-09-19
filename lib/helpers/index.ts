import { NextPageContext } from 'next-server/dist/lib/utils'
import urlJoin from 'url-join'

/**
 * Throw if a fetch promise does not return an OK status.
 *
 * @export
 * @param {Response} res
 * @returns
 */
export function handleErrors (res: Response) {
  if (!res.ok) {
    throw new Error(res.statusText)
  }

  return res
}

/**
 * Get the absolute url for a local link.
 *
 * @export
 * @param {NextPageContext} ctx
 * @param {string} url
 */
export function getAbsoluteUrl (ctx: NextPageContext, url: string) {
  if (ctx.req) {
    const host = ctx.req.headers.host
    const scheme = host.startsWith('localhost') ? 'http' : 'https'
    return urlJoin(`${scheme}://${host}`, url)
  }

  return url
}
