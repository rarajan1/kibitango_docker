import { defineEventHandler, useBody, getCookie } from 'h3';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
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
const insert = `insert into grades (user_id, word_id, success,last_updated) values`;
const saveGrades = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const token = getCookie(event, "token");
  const result = () => new Promise((resolve, reject) => {
    if (body.wordIds.length == 0)
      resolve("not choice phase");
    jwt.verify(token, "secret", (error, userDatas) => {
      if (error)
        reject(error);
      const now = new Date();
      const nowDate = `'${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}'`;
      let values = "";
      for (let i = 0; i < body.results.length; i++)
        values += `('${userDatas.id}',${body.wordIds[i]},${body.results[i] ? 1 : 0},${nowDate}), `;
      values = values.slice(0, -2);
      const query = insert + values;
      connection.query(query, (error2, result2) => {
        if (error2)
          reject(error2);
        resolve("success");
      });
    });
  });
  return result();
});

export { saveGrades as default };
//# sourceMappingURL=saveGrades.mjs.map
