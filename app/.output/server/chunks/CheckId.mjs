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
const connection = mysql.createPool(
  {
    host: config.databaseHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName
  }
);
const CheckId = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const hasId = () => new Promise((resolve, reject) => {
    const pattan = /^[A-Za-z0-9_@\.\-]+$/;
    if (!pattan.test(body.id))
      resolve(false);
    connection.query("select user_id from users where user_id = ?;", [body.id], (error, result) => {
      if (error)
        reject(error);
      if (body.id == "")
        resolve(false);
      resolve(!result[0] || false);
    });
  });
  return await hasId();
});

export { CheckId as default };
//# sourceMappingURL=CheckId.mjs.map
