import { Promise } from 'es6-promise';
import Execution from '../services/execution';
import Column from '../models/Column';
import util = require('util');

export function parseCreateColumns(columns: Column[] | any): any {
  let args = {};
  let queryCols: any = [];
  let parsed = Column.parseList(columns);
  parsed.forEach((row) => {
    queryCols.push(`${row.name} ${row.definition}`);
  });

  return {
    columns: parsed,
    queryCols
  };
}

export default function createTable(sql: Execution, tableName: string, columns: Column[] | any): Promise<any> {
  let args = {};
  let parsed = parseCreateColumns(columns);
  let query = `create table ${tableName} (\n  ${parsed.queryCols.join(',\n  ')}`;
  let primaryKey = parsed.columns.filter((row:Column) => {
    return row.isPrimary;
  });
  if (primaryKey.length > 0) {
    let keys = primaryKey.map((row) => row.name);
    query += `,\n  PRIMARY KEY (${keys.join(', ')})`;
  }
  query += '\n)';
  return sql.query(query);
}
