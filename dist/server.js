"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var movies_1 = __importDefault(require("./handlers/movies"));
var users_1 = __importDefault(require("./handlers/users"));
var app = (0, express_1.default)();
var address = "0.0.0.0:3000";
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.get('/test-cors', (0, cors_1.default)(corsOptions), function (req, res) {
    res.json({ msg: 'This is CORS with a middle ware' });
});
(0, users_1.default)(app);
(0, movies_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
