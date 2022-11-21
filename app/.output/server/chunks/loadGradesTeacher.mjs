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
const query = `select word, answer, success, count from (select word_id,count(*) as count ,sum(success)as success from grades where last_updated between ? and ? group by word_id)tbs right join words on tbs.word_id = words.word_id where phase = ?;`;
const loadGradesTeacher = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const token = getCookie(event, "token");
  const result = () => new Promise((resolve, reject) => {
    jwt.verify(token, "secret", (error, userDatas) => {
      if (error)
        resolve("token\u304Cget\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F");
      userDatas.admin ? body.userId : userDatas.id;
      connection.query(query, [`${body.startDate} ${body.startTime}`, `${body.endDate} ${body.endTime}`, body.phase], (error2, result2) => {
        if (error2)
          reject(error2);
        resolve(result2);
      });
    });
  });
  return await result();
});

export { loadGradesTeacher as default };
//# sourceMappingURL=loadGradesTeacher.mjs.map
