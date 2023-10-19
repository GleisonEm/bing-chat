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
exports.BingChat = void 0;
var node_crypto_1 = require("node:crypto");
var ws_1 = require("ws");
var fetch_1 = require("./fetch");
var terminalChar = '';
var BingChat = /** @class */ (function () {
    function BingChat(opts) {
        var cookie = opts.cookie, _a = opts.debug, debug = _a === void 0 ? false : _a;
        this._cookie = cookie;
        this._debug = !!debug;
        if (!this._cookie) {
            throw new Error('Bing cookie is required');
        }
    }
    /**
     * Sends a message to Bing Chat, waits for the response to resolve, and returns
     * the response.
     *
     * If you want to receive a stream of partial responses, use `opts.onProgress`.
     *
     * @param message - The prompt message to send
     * @param opts.conversationId - Optional ID of a conversation to continue (defaults to a random UUID)
     * @param opts.onProgress - Optional callback which will be invoked every time the partial response is updated
     *
     * @returns The response from Bing Chat
     */
    BingChat.prototype.sendMessage = function (text, opts) {
        if (opts === void 0) { opts = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, invocationId, onProgress, _b, locale, _c, market, _d, region, location, _e, messageType, _f, variant, conversationId, clientId, conversationSignature, isStartOfSession, conversation, result, responseP;
            var _this = this;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = opts.invocationId, invocationId = _a === void 0 ? '1' : _a, onProgress = opts.onProgress, _b = opts.locale, locale = _b === void 0 ? 'en-US' : _b, _c = opts.market, market = _c === void 0 ? 'en-US' : _c, _d = opts.region, region = _d === void 0 ? 'US' : _d, location = opts.location, _e = opts.messageType, messageType = _e === void 0 ? 'Chat' : _e, _f = opts.variant, variant = _f === void 0 ? 'Balanced' : _f;
                        conversationId = opts.conversationId, clientId = opts.clientId, conversationSignature = opts.conversationSignature;
                        isStartOfSession = !(conversationId &&
                            clientId &&
                            conversationSignature);
                        if (!isStartOfSession) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.createConversation()];
                    case 1:
                        conversation = _g.sent();
                        conversationId = conversation.conversationId;
                        clientId = conversation.clientId;
                        conversationSignature = conversation.conversationSignature;
                        _g.label = 2;
                    case 2:
                        result = {
                            author: 'bot',
                            id: node_crypto_1["default"].randomUUID(),
                            conversationId: conversationId,
                            clientId: clientId,
                            conversationSignature: conversationSignature,
                            invocationId: "".concat(parseInt(invocationId, 10) + 1),
                            text: ''
                        };
                        responseP = new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                            function cleanup() {
                                ws.close();
                                ws.removeAllListeners();
                            }
                            var chatWebsocketUrl, ws, isFulfilled, stage;
                            var _this = this;
                            return __generator(this, function (_a) {
                                chatWebsocketUrl = 'wss://sydney.bing.com/sydney/ChatHub';
                                ws = new ws_1["default"](chatWebsocketUrl, {
                                    perMessageDeflate: false,
                                    headers: {
                                        'accept-language': 'en-US,en;q=0.9',
                                        'cache-control': 'no-cache',
                                        pragma: 'no-cache'
                                    }
                                });
                                isFulfilled = false;
                                ws.on('error', function (error) {
                                    console.warn('WebSocket error:', error);
                                    cleanup();
                                    if (!isFulfilled) {
                                        isFulfilled = true;
                                        reject(new Error("WebSocket error: ".concat(error.toString())));
                                    }
                                });
                                ws.on('close', function () {
                                    // TODO
                                });
                                ws.on('open', function () {
                                    ws.send("{\"protocol\":\"json\",\"version\":1}".concat(terminalChar));
                                });
                                stage = 0;
                                ws.on('message', function (data) {
                                    var _a, _b;
                                    var objects = data.toString().split(terminalChar);
                                    var messages = objects
                                        .map(function (object) {
                                        try {
                                            return JSON.parse(object);
                                        }
                                        catch (error) {
                                            return object;
                                        }
                                    })
                                        .filter(Boolean);
                                    if (!messages.length) {
                                        return;
                                    }
                                    if (stage === 0) {
                                        ws.send("{\"type\":6}".concat(terminalChar));
                                        var traceId = node_crypto_1["default"].randomBytes(16).toString('hex');
                                        // example location: 'lat:47.639557;long:-122.128159;re=1000m;'
                                        var locationStr = location
                                            ? "lat:".concat(location.lat, ";long:").concat(location.lng, ";re=").concat(location.re || '1000m', ";")
                                            : undefined;
                                        // Sets the correct options for the variant of the model
                                        var optionsSets = [
                                            'nlu_direct_response_filter',
                                            'deepleo',
                                            'enable_debug_commands',
                                            'disable_emoji_spoken_text',
                                            'responsible_ai_policy_235',
                                            'enablemm'
                                        ];
                                        if (variant == 'Balanced') {
                                            optionsSets.push('galileo');
                                        }
                                        else {
                                            optionsSets.push('clgalileo');
                                            if (variant == 'Creative') {
                                                optionsSets.push('h3imaginative');
                                            }
                                            else if (variant == 'Precise') {
                                                optionsSets.push('h3precise');
                                            }
                                        }
                                        var params = {
                                            arguments: [
                                                {
                                                    source: 'cib',
                                                    optionsSets: optionsSets,
                                                    allowedMessageTypes: [
                                                        'Chat',
                                                        'InternalSearchQuery',
                                                        'InternalSearchResult',
                                                        'InternalLoaderMessage',
                                                        'RenderCardRequest',
                                                        'AdsQuery',
                                                        'SemanticSerp'
                                                    ],
                                                    sliceIds: [],
                                                    traceId: traceId,
                                                    isStartOfSession: isStartOfSession,
                                                    message: {
                                                        locale: locale,
                                                        market: market,
                                                        region: region,
                                                        location: locationStr,
                                                        author: 'user',
                                                        inputMethod: 'Keyboard',
                                                        messageType: messageType,
                                                        text: text
                                                    },
                                                    conversationSignature: conversationSignature,
                                                    participant: { id: clientId },
                                                    conversationId: conversationId
                                                }
                                            ],
                                            invocationId: invocationId,
                                            target: 'chat',
                                            type: 4
                                        };
                                        if (_this._debug) {
                                            console.log(chatWebsocketUrl, JSON.stringify(params, null, 2));
                                        }
                                        ws.send("".concat(JSON.stringify(params)).concat(terminalChar));
                                        ++stage;
                                        return;
                                    }
                                    for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                                        var message = messages_1[_i];
                                        // console.log(JSON.stringify(message, null, 2))
                                        if (message.type === 1) {
                                            var update = message;
                                            var msg = (_a = update.arguments[0].messages) === null || _a === void 0 ? void 0 : _a[0];
                                            if (!msg)
                                                continue;
                                            // console.log('RESPONSE0', JSON.stringify(update, null, 2))
                                            if (!msg.messageType) {
                                                result.author = msg.author;
                                                result.text = msg.text;
                                                result.detail = msg;
                                                onProgress === null || onProgress === void 0 ? void 0 : onProgress(result);
                                            }
                                        }
                                        else if (message.type === 2) {
                                            var response = message;
                                            if (_this._debug) {
                                                console.log('RESPONSE', JSON.stringify(response, null, 2));
                                            }
                                            var validMessages = (_b = response.item.messages) === null || _b === void 0 ? void 0 : _b.filter(function (m) { return !m.messageType; });
                                            var lastMessage = validMessages === null || validMessages === void 0 ? void 0 : validMessages[(validMessages === null || validMessages === void 0 ? void 0 : validMessages.length) - 1];
                                            if (lastMessage) {
                                                result.conversationId = response.item.conversationId;
                                                result.conversationExpiryTime =
                                                    response.item.conversationExpiryTime;
                                                result.author = lastMessage.author;
                                                result.text = lastMessage.text;
                                                result.detail = lastMessage;
                                                if (!isFulfilled) {
                                                    isFulfilled = true;
                                                    resolve(result);
                                                }
                                            }
                                        }
                                        else if (message.type === 3) {
                                            if (!isFulfilled) {
                                                isFulfilled = true;
                                                resolve(result);
                                            }
                                            cleanup();
                                            return;
                                        }
                                        else {
                                            // TODO: handle other message types
                                            // these may be for displaying "adaptive cards"
                                            // console.warn('unexpected message type', message.type, message)
                                        }
                                    }
                                });
                                return [2 /*return*/];
                            });
                        }); });
                        return [2 /*return*/, responseP];
                }
            });
        });
    };
    BingChat.prototype.createConversation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var requestId, cookie;
            return __generator(this, function (_a) {
                requestId = node_crypto_1["default"].randomUUID();
                cookie = this._cookie.includes(';')
                    ? this._cookie
                    : "_U=".concat(this._cookie);
                return [2 /*return*/, (0, fetch_1.fetch)('https://www.bing.com/turing/conversation/create', {
                        headers: {
                            accept: 'application/json',
                            'accept-language': 'en-US,en;q=0.9',
                            'content-type': 'application/json',
                            'sec-ch-ua': '"Not_A Brand";v="99", "Microsoft Edge";v="109", "Chromium";v="109"',
                            'sec-ch-ua-arch': '"x86"',
                            'sec-ch-ua-bitness': '"64"',
                            'sec-ch-ua-full-version': '"109.0.1518.78"',
                            'sec-ch-ua-full-version-list': '"Not_A Brand";v="99.0.0.0", "Microsoft Edge";v="109.0.1518.78", "Chromium";v="109.0.5414.120"',
                            'sec-ch-ua-mobile': '?0',
                            'sec-ch-ua-model': '',
                            'sec-ch-ua-platform': '"macOS"',
                            'sec-ch-ua-platform-version': '"12.6.0"',
                            'sec-fetch-dest': 'empty',
                            'sec-fetch-mode': 'cors',
                            'sec-fetch-site': 'same-origin',
                            'x-edge-shopping-flag': '1',
                            'x-ms-client-request-id': requestId,
                            'x-ms-useragent': 'azsdk-js-api-client-factory/1.0.0-beta.1 core-rest-pipeline/1.10.0 OS/MacIntel',
                            cookie: cookie
                        },
                        referrer: 'https://www.bing.com/search',
                        referrerPolicy: 'origin-when-cross-origin',
                        body: null,
                        method: 'GET',
                        mode: 'cors',
                        credentials: 'include'
                    }).then(function (res) {
                        if (res.ok) {
                            return res.json();
                        }
                        else {
                            throw new Error("unexpected HTTP error createConversation ".concat(res.status, ": ").concat(res.statusText));
                        }
                    })];
            });
        });
    };
    return BingChat;
}());
exports.BingChat = BingChat;
