"use strict";
function dropTables(sql) {
    'use strict';
    var tableNames = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        tableNames[_i - 1] = arguments[_i];
    }
    var query = "drop table if exists " + tableNames.join(', ') + ";";
    return sql.query(query);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = dropTables;
//# sourceMappingURL=drop.js.map