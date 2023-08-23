"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Book extends sequelize_1.Model {
}
exports.Book = Book;
Book.init({
    bookId: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    datePublished: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
    },
    pageCount: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    publisher: {
        type: sequelize_1.DataTypes.STRING,
    },
    author: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db_config_1.default,
    tableName: "Book"
});
