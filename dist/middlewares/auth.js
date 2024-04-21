"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var verifyAuthToken = function (req, res, next) {
    try {
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET must be defined');
        }
        var authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ message: 'No token provided.' });
        }
        console.log(authorizationHeader);
        var token = authorizationHeader.split(' ')[1];
        if (!token) {
            return res
                .status(401)
                .json({ success: false, message: "Authorization token not found" });
        }
        var decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        //@ts-ignore
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401);
    }
};
exports.verifyAuthToken = verifyAuthToken;
