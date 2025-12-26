"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const userroute_1 = __importDefault(require("./routes/userroute"));
// import useroute from './routes/userroute'
const productroute_1 = __importDefault(require("./routes/productroute"));
const cartroutes_1 = __importDefault(require("./routes/cartroutes"));
const paymentroute_1 = __importDefault(require("./routes/paymentroute"));
const addressroute_1 = __importDefault(require("./routes/addressroute"));
const PORT = process.env.PORT || 9000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
const allowedOrigins = [
    "https://ecom-frontend-seven-rose.vercel.app",
    "http://localhost:5173"
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        if (!origin)
            return callback(null, true); // Postman या server-to-server requests के लिए
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"), false);
        }
    },
    credentials: true
}));
// user route
app.use("/api", userroute_1.default);
// product route
app.use("/product", productroute_1.default);
app.use("/cart", cartroutes_1.default);
app.use("/payment", paymentroute_1.default);
app.use('/address', addressroute_1.default);
console.log("token change");
app.get('/health', (req, res) => res.json("server is awake all"));
app.get('/', (req, res) => res.json("server is running on..."));
mongoose_1.default.connect(process.env.CONNECT)
    .then(() => { console.log("mongoose connected"); })
    .catch(() => { console.log("not connected"); });
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});
