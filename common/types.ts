import { NextApiRequest, NextApiResponse } from 'next-server/dist/lib/utils'

/**
 * Next.js api handler.
 */
export type ApiHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void> | void
