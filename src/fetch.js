"use strict";
/// <reference lib="dom" />
exports.__esModule = true;
exports.fetch = void 0;
var fetch = globalThis.fetch;
exports.fetch = fetch;
if (typeof fetch !== 'function') {
    throw new Error('Invalid environment: global fetch not defined');
}
