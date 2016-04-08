"use strict";
require('source-map-support').install({
    handleUncaughtExceptions: false
});
var path = require('path');
var fs = require('fs');
var chai_1 = require('chai');
var mysql_config_1 = require('../lib/models/mysql-config');
var mysql_1 = require('../lib/services/mysql');
var create_1 = require('../lib/util/create');
var insert_1 = require('../lib/util/insert');
var drop_1 = require('../lib/util/drop');
describe('Tables', function () {
    var sql;
    var testTableName = 'node_workhorse_mysql_spec_test';
    before(function () {
        var config = getConfig();
        sql = new mysql_1.default(config);
        return drop_1.default(sql, testTableName);
    });
    function getConfig() {
        var jsonPath = path.resolve(__dirname, '../../mysql-config.json');
        if (!fs.existsSync(jsonPath)) {
            throw new Error("Please create a 'mysql-config.json' file in the root directory of this project to test");
        }
        var rawConfig = JSON.parse(fs.readFileSync(jsonPath));
        return new mysql_config_1.default(rawConfig);
    }
    describe('#run', function () {
        it('should create a table', function () {
            return create_1.default(sql, testTableName, {
                color: {
                    definition: 'varchar(20)'
                },
                id: {
                    definition: 'int'
                }
            })
                .then(function (result) {
                return insert_1.default(sql, testTableName, {
                    color: 'red',
                    id: null
                }, {
                    color: 'green',
                    id: 5
                });
            })
                .then(function (result) {
                return sql.singleQuery("select * from " + testTableName + " order by id desc");
            })
                .then(function (result) {
                chai_1.assert.lengthOf(result, 2);
                chai_1.assert.equal(result[0].id, 5);
                chai_1.assert.isNull(result[1].id);
            });
        });
    });
});
//# sourceMappingURL=tables-spec.js.map