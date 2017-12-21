/**
 * Take advantage of the String iterator working with full unicode symbols rather than
 * surrogate pairs to make unicode-aware computations.
 *
 * When given a unicode-aware index in a string,
 * returns its unicode-unaware counterpart.
 *
 * This is duplicated from /multiple-composers/utils/StringUtils.js until we
 * set up a shared repo of utils.
 */
const makeUnicodeAwareIndexUnaware = (str, i) => Array.from(str).slice(0, i).join('').length;

export { makeUnicodeAwareIndexUnaware };
