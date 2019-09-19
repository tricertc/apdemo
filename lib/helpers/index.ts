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
