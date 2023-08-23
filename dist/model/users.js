"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class UserInstance extends Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }, firstName: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    }
}, {
    sequelize: dbConfig_1.default,
    tableName: "users"
});
