"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dotenv_safe_1 = require("dotenv-safe");
var ora_1 = require("ora");
var src_1 = require("../src");
dotenv_safe_1["default"].config();
/**
 * Demo CLI for testing conversation support.
 *
 * ```
 * npx tsx demos/demo-conversation.ts
 * ```
 */
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var api, prompt, res, prompt2, prompt3, prompt4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    api = new src_1.BingChat({ cookie: process.env.BING_COOKIE });
                    prompt = 'Write a poem about cats.';
                    return [4 /*yield*/, (0, ora_1.oraPromise)(api.sendMessage(prompt), {
                            text: prompt
                        })];
                case 1:
                    res = _a.sent();
                    console.log('\n' + res.text + '\n');
                    prompt2 = 'Can you make it cuter and shorter?';
                    return [4 /*yield*/, (0, ora_1.oraPromise)(api.sendMessage(prompt2, res), {
                            text: prompt2
                        })];
                case 2:
                    res = _a.sent();
                    console.log('\n' + res.text + '\n');
                    prompt3 = 'Now write it in French.';
                    return [4 /*yield*/, (0, ora_1.oraPromise)(api.sendMessage(prompt3, res), {
                            text: prompt3
                        })];
                case 3:
                    res = _a.sent();
                    console.log('\n' + res.text + '\n');
                    prompt4 = 'What were we talking about again?';
                    return [4 /*yield*/, (0, ora_1.oraPromise)(api.sendMessage(prompt4, res), {
                            text: prompt4
                        })];
                case 4:
                    res = _a.sent();
                    console.log('\n' + res.text + '\n');
                    return [2 /*return*/];
            }
        });
    });
}
main()["catch"](function (err) {
    console.error(err);
    process.exit(1);
});
