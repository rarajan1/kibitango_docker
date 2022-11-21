import { defineEventHandler, useBody, setCookie } from 'h3';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
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
const getUserDateQuery = "select * from users where user_id = ?";
const login = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const params = [body.id];
  const result = () => new Promise((resolve, reject) => {
    connection.query(getUserDateQuery, params, (error, user) => {
      if (error) {
        event.res.statusCode = 400;
        reject(error);
      }
      if (!user.length) {
        reject({ message: "ID or password is not correct" });
      }
      try {
        bcrypt.compare(body.password, user[0].password, (error2, result2) => {
          if (result2) {
            const payload = {
              id: user[0].user_id,
              isTeacher: user[0].admin
            };
            const token = jwt.sign(payload, config.jwtSecret);
            const isTeacher = user[0].admin;
            const id = user[0].user_id;
            setCookie(event, "token", token, {
              httpOnly: true,
              maxAge: 3600 * 24 * 365,
              sameSite: true
            });
            resolve({ token, isTeacher, id });
          } else
            reject({ message: "ID or password is not correct" });
        });
      } catch {
        reject({ message: "ID or password is not correct" });
      }
    });
  }).catch((e) => {
    return { error: e };
  });
  return result();
});

export { login as default };
//# sourceMappingURL=login.mjs.map
