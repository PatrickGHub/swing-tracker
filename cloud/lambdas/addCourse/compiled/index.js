"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = () => {
    console.log('Lambda running');
    return {
        statusCode: 200,
        body: 'Returning 200'
    };
};
exports.handler = handler;
