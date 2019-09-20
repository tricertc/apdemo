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

/**
 * Format a date object.
 *
 * @export
 * @param {Date} date
 * @returns {string}
 */
export function formatDate (date: Date): string {
  return moment(date).format('MM/DD/YYYY')
}
