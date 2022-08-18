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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB.DocumentClient();
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    let statusCode = 200;
    let body;
    try {
        yield dynamo.put({
            TableName: 'Courses',
            Item: {
                Name: event.name,
                Holes: event.holes,
                Par: event.par
            }
        })
            .promise();
        body = `Added course: ${event.name} to database`;
    }
    catch (error) {
        statusCode = 400;
        body = error.message;
    }
    return {
        statusCode,
        body
    };
});
exports.handler = handler;
