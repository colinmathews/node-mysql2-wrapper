"use strict";
function addForeignKey(sql, tableName, columns, parentTableName, parentTableColumns, keyName, referenceDefinitions) {
    if (!keyName) {
        keyName = tableName + "_" + columns.join('_') + "_" + parentTableName + "_" + parentTableColumns.join('_');
    }
    var query = ("ALTER TABLE " + tableName + " ADD CONSTRAINT " + keyName + " FOREIGN KEY (" + columns.join(', ') + ")\n") +
        ("REFERENCES " + parentTableName + "(" + parentTableColumns.join(', ') + ")\n") +
        (referenceDefinitions || '');
    return sql.singleTransaction(query);
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = addForeignKey;
//# sourceMappingURL=add-foreign-key.js.map