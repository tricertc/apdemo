import moment from 'moment'

/**
 * Format an ASP.NET JSON date.
 *
 * @export
 * @param {string} date
 * @returns {string}
 */
export function formatAspNetDate (date: string): string {
  return moment.utc(date).format('MM/DD/YYYY')
}
