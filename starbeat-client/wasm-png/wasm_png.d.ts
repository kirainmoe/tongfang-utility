/* tslint:disable */
/* eslint-disable */
/**
* @param {Uint8Array} input
* @param {number} width
* @param {number} height
* @param {number} filter_type
* @returns {Uint8Array}
*/
export function resize(input: Uint8Array, width: number, height: number, filter_type: number): Uint8Array;
/**
* @param {Uint8Array} input
* @param {number} width_fac
* @param {number} height_fac
* @param {number} filter_type
* @returns {Uint8Array}
*/
export function resize_relative(input: Uint8Array, width_fac: number, height_fac: number, filter_type: number): Uint8Array;
