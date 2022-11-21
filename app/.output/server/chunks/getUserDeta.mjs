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
const getUserDateQuery = "select * from users where user_id = ?";
const getUserDeta = defineEventHandler(async (event) => {
  const currentUser = await useBody(event);
  const result = () => new Promise((resolve, reject) => {
    connection.query(getUserDateQuery, [currentUser.user_id], (error, result2) => {
      if (error)
        throw reject(error);
      resolve({
        user_id: result2[0].user_id,
        email: result2[0].email,
        family_name: result2[0].family_name,
        first_name: result2[0].first_name
      });
    });
  });
  return result();
});

export { getUserDeta as default };
//# sourceMappingURL=getUserDeta.mjs.map
