import { defineEventHandler, useBody } from 'h3';
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
const query = "select * from words where phase=? ORDER BY RAND()";
const loadWards = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const result = () => new Promise((resolve, reject) => {
    connection.query(query, [body.phase], (error, result2) => {
      if (error)
        reject(error);
      resolve(result2);
    });
  });
  return result();
});

export { loadWards as default };
//# sourceMappingURL=loadWards.mjs.map
