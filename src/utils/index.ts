/**
 * @fileoverview Small shared helpers.
 */

/** `pluralize(2, 'feature')` -> `'2 features'`. */
export const pluralize = (
  count: number,
  singular: string,
  plural = `${singular}s`
) => `${count} ${count === 1 ? singular : plural}`
