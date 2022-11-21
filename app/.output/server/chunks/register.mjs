import { defineEventHandler, useBody } from 'h3';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
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
const saltRounds = 8;
const insertUserDateQuery = "insert into users (user_id, admin, family_name, first_name, email, password) values(?,?,?,?,?,?);";
const mailAddressPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;
const register = defineEventHandler(async (event) => {
  const body = await useBody(event);
  const hasPassword = body.password.length >= 8;
  const hasEmailAddress = mailAddressPattern.test(body.emailAddress);
  const isAdmin = (body == null ? void 0 : body.isTeacher) || false;
  const hasFamily_name = body.family_name != "";
  const hasFirst_name = body.first_name != "";
  const hasId = await new Promise((resolve, reject) => {
    connection.query("select user_id from users where user_id = ?;", [body.id], (error, result2) => {
      if (error)
        reject(error);
      if (body.id == "")
        resolve(false);
      resolve(!result2[0] || false);
    });
  });
  const result = () => new Promise(async (resolve, reject) => {
    const canRegisterUserDate = hasId && hasEmailAddress && hasPassword && hasFamily_name && hasFirst_name;
    if (canRegisterUserDate) {
      const hash = await bcrypt.hash(body.password, saltRounds);
      connection.query(insertUserDateQuery, [body.id, isAdmin, body.family_name, body.first_name, body.emailAddress, hash], (error) => {
        if (error)
          reject(error);
      });
    }
    resolve(
      {
        message: canRegisterUserDate ? "\u30E6\u30FC\u30B6\u30FC\u306E\u4F5C\u6210\u306B\u6210\u529F\u3057\u307E\u3057\u305F" : "\u30E6\u30FC\u30B6\u30FC\u306E\u4F5C\u6210\u306B\u5931\u6557\u3057\u307E\u3057\u305F",
        hasId,
        hasFamily_name,
        hasFirst_name,
        hasEmailAddress,
        hasPassword,
        data: {
          id: body.id,
          email: body.emailAddress
        }
      }
    );
  }).catch((e) => {
    return { error: e };
  });
  return result();
});

export { register as default };
//# sourceMappingURL=register.mjs.map
