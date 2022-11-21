import { defineEventHandler } from 'h3';
import mysql from 'mysql';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

const config = useRuntimeConfig();
const connection = mysql.createPool({
  host: config.databaseHost,
  user: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName
});
const sql = "select phase from words group by phase order by phase";
const fetchPhase = defineEventHandler((event) => {
  const result = () => new Promise((resolve, reject) => {
    connection.query(sql, (error, result2) => {
      if (error)
        reject(error);
      resolve(result2);
    });
  });
  return result();
});

export { fetchPhase as default };
//# sourceMappingURL=fetchPhase.mjs.map
