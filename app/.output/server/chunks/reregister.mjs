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
const mailAddressPattern = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+\.[A-Za-z0-9]+$/;
const reregister = defineEventHandler(async (event) => {
  let UpdateUserDateQuery = "update users set ";
  const body = await useBody(event);
  const hasPassword = !body.changePassword || body.password.length >= 8;
  if (body.changePassword) {
    const hash = await bcrypt.hash(body.password, saltRounds);
    UpdateUserDateQuery += `password = '${hash}' ,`;
  }
  const hasEmailAddress = !body.changeEmail || mailAddressPattern.test(body.emailAddress);
  if (body.changeEmail)
    UpdateUserDateQuery += `email = '${body.emailAddress}' ,`;
  const hasFamily_name = !body.changeFamilyName || body.family_name != "";
  if (body.changeFamilyName)
    UpdateUserDateQuery += `family_name = '${body.family_name}' ,`;
  const hasFirst_name = !body.changeFirstName || body.first_name != "";
  if (body.changeFirstName)
    UpdateUserDateQuery += `first_name = '${body.first_name}' ,`;
  const hasId = !body.changeId || await new Promise((resolve, reject) => {
    connection.query("select user_id from users where user_id = ?;", [body.id], (error, result2) => {
      if (error)
        reject(error);
      if (body.id == "")
        resolve(false);
      resolve(!result2[0] || false);
    });
  });
  if (body.changeId)
    UpdateUserDateQuery += `user_id = '${body.id}' ,`;
  UpdateUserDateQuery = UpdateUserDateQuery.slice(0, -1);
  UpdateUserDateQuery += "where user_id = ?";
  const result = () => new Promise(async (resolve, reject) => {
    const canRegisterUserDate = hasId && hasEmailAddress && hasPassword && hasFamily_name && hasFirst_name;
    if (canRegisterUserDate) {
      connection.query(UpdateUserDateQuery, [body.currentId], (error) => {
        if (error)
          reject(error);
      });
    }
    resolve(
      {
        message: canRegisterUserDate ? "\u30E6\u30FC\u30B6\u30FC\u3092\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3057\u307E\u3057\u305F" : "\u30E6\u30FC\u30B6\u30FC\u3092\u30A2\u30C3\u30D7\u30C7\u30FC\u30C8\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F",
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

export { reregister as default };
//# sourceMappingURL=reregister.mjs.map
