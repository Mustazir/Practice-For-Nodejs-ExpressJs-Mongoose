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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("../config/mongodb");
const mongodb_2 = require("mongodb");
// todos router creation
exports.todosRouter = express_1.default.Router();
// using the todos router for getting all todos
exports.todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield mongodb_1.client.db("todosDB-Express");
    const collection = yield db.collection("todos");
    const todos = yield collection.find().toArray();
    res.json(todos);
}));
exports.todosRouter.post("/create-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    const db = yield mongodb_1.client.db("todosDB-Express");
    const collection = yield db.collection("todos");
    yield collection.insertOne({
        title: title,
        description: description,
        completed: completed,
    });
    const todos = yield collection.find().toArray();
    res.json(todos);
}));
exports.todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB-Express");
    const collection = yield db.collection("todos");
    const todo = yield collection.findOne({ _id: new mongodb_2.ObjectId(id) });
    res.json(todo);
}));
exports.todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB-Express");
    const collection = yield db.collection("todos");
    yield collection.deleteOne({ _id: new mongodb_2.ObjectId(id) });
    res.json({
        message: "Todo deleted successfully",
    });
}));
exports.todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, completed } = req.body;
    const id = req.params.id;
    const db = yield mongodb_1.client.db("todosDB-Express");
    const collection = yield db.collection("todos");
    const filter = { _id: new mongodb_2.ObjectId(id) };
    const updateTodo = yield collection.updateOne(filter, {
        $set: {
            title, description, completed
        }
    }, { upsert: true });
    res.json(updateTodo);
}));
