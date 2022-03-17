export const DATE_FORMAT = 'YYYY-MM-DD';
// export const DATE_FORMAT = 'DD/MM/YYYY';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
// export const DATE_TIME_FORMAT = 'DD/MM/YYYYTHH:mm';
export const DATE_TIME_FORMAT_FIX = 'YYYY-MM-DD HH:mm';
// export const DATE_TIME_FORMAT_FIX = 'DD/MM/YYYY HH:mm';
export const TIME_FORMAT = 'HH:mm';

// Seccion de patrones
export const LATIN_PATTERNS = { N: { pattern: new RegExp('\[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ¨´":"\]')} };
export const CHAR_PATTERNS = { L: { pattern: new RegExp('\[ a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\]')} };
export const USER_PATTERNS = { T: { pattern: new RegExp('\[ a-zA-ZñÑ._\]')} };
export const NUMBERS_LETTERS = { M: { pattern: new RegExp('\[0-9a-zA-Z-/\]')} };
export const ALPHA_NUMERIC_PATTERNS = { C: { pattern: new RegExp('\[\u0020-\u0040\-0-9a-zA-ZñÑáéíóúÁÉÍÓÚüÜ¨´\]')} }; 
export const NATURAL_NUMBERS = { R: { pattern: new RegExp('\[1-9\]')} , 'Q': { pattern: new RegExp('[0-9]') }, D: { pattern: new RegExp('[\-\+]?[0-9.](\.[0-9.]+)?') }  };
//customPatterns = { '0': { pattern: new RegExp('-?') }, '9': { pattern: new RegExp('[0-9]') }, };
export const TELEPHONE_PATTERNS = { E: { pattern: new RegExp('\[0-9\]')} };
export const CURP_PATTERNS = { P: { pattern: new RegExp('\[0-9\]')} };
export const UBICACION_PATTERNS = { U: { pattern: new RegExp('\[0-9.-\]')} };
//   \[\u0020-\u0040\]-\[0-9