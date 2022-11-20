"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Author_1 = __importDefault(require("./routes/Author"));
// var cors = require("cors");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.default)();
// const URL: string = process.env.MONGO_URL;
mongoose_1.default
    // .connect(URL)
    .connect("mongodb+srv://forhad12:forhad123456@cluster0.sonyg.mongodb.net/typescript_node?authSource=admin&replicaSet=atlas-12s196-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true")
    .then(() => {
    console.log("connected...");
    StartServer();
})
    .catch((error) => {
    console.log(error);
});
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    router.use((0, cors_1.default)());
    /** Rules of our API */
    // router.use((req, res, next) => {
    //   res.header("Access-Control-Allow-Origin", "*");
    //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    //   if (req.method == "OPTIONS") {
    //     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    //     return res.status(200).json({});
    //   }
    //   next();
    // });
    /** Routes */
    router.use("/authors", Author_1.default);
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => console.log("server running on port " + config_1.config.server.port));
};
