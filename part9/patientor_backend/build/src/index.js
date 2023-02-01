"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const diaries_1 = __importDefault(require("./routes/diaries"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors_1 = __importDefault(require("cors"));
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use((0, cors_1.default)());
app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
const PORT = 3001;
app.use('/api/diaries', diaries_1.default);
app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
});
