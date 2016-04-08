"use strict";
var Column_1 = require('../models/Column');
function parseInsertColumns() {
    var columns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        columns[_i - 0] = arguments[_i];
    }
    var columnRows = columns.map(function (row) {
        return Column_1.default.parseList(row);
    });
    var tableColumns = columnRows.reduce(function (response, row) {
        row.forEach(function (col) {
            if (response.indexOf(col.name) < 0) {
                response.push(col.name);
            }
        });
        return response;
    }, []);
    var queryValues = [];
    var queryArgs = [];
    columnRows.forEach(function (row) {
        var valueVars = [];
        tableColumns.forEach(function (colName) {
            var col = row.filter(function (inner) {
                return inner.name === colName;
            });
            if (col.length === 0) {
                queryArgs.push(null);
            }
            else {
                queryArgs.push(col[0].value);
            }
            valueVars.push('?');
        });
        queryValues.push("(" + valueVars.join(', ') + ")");
    });
    return {
        tableColumns: tableColumns,
        queryValues: queryValues,
        queryArgs: queryArgs
    };
}
exports.parseInsertColumns = parseInsertColumns;
function insert(sql, tableName) {
    var columns = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        columns[_i - 2] = arguments[_i];
    }
    var columnMeta = parseInsertColumns.apply(this, columns);
    var query = "insert into " + tableName + " (" + columnMeta.tableColumns + ") values " + columnMeta.queryValues.join(', ') + ";";
    return sql.singleTransaction(query, columnMeta.queryArgs);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = insert;
//# sourceMappingURL=insert.js.map