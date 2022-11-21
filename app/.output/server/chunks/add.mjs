import express from 'express';
import multer from 'multer';
import mysql from 'mysql';
import XLSX from 'xlsx';
import fs from 'fs';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'h3';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'pathe';
import 'url';

const app = express();
const upload = multer({ dest: "./uploads/" });
const config = useRuntimeConfig();
const connection = mysql.createPool({
  host: config.databaseHost,
  user: config.databaseUser,
  password: config.databasePassword,
  database: config.databaseName
});
const GenerateWordDatas = (worksheet) => {
  const WordDatas = new Array();
  const rows = XLSX.utils.sheet_to_json(worksheet);
  for (let row of rows) {
    WordDatas.push(
      {
        phase: row["\u30D5\u30A7\u30A4\u30BA"],
        word: row["\u82F1\u5358\u8A9E"],
        choices: row["\u9078\u629E\u80A2"],
        remark: row["\u82F1\u5358\u8A9E\u306E\u8AAC\u660E"],
        answer: row["\u7B54\u3048"]
      }
    );
  }
  return WordDatas;
};
const DataBaseQuery = (insertQuery) => new Promise((resolve, reject) => {
  connection.query(insertQuery, (error, result) => {
    if (error)
      reject(error);
    resolve(result);
  });
});
app.post("/api/word/add", upload.single("newExcelFileForWord"), async (req, res, next) => {
  try {
    const myFile = req.file;
    if (myFile == void 0)
      throw new Error("not Find File");
    const originalname = myFile.originalname;
    const filePath = myFile.path;
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets["\u767B\u9332\u3055\u308C\u3066\u3044\u308B\u5358\u8A9E"];
    fs.unlink(filePath, (err) => {
      if (err)
        throw err;
    });
    const newWordDatas = GenerateWordDatas(worksheet);
    const wordSet = Array.from(new Set(
      newWordDatas.reduce(
        (previousValue, currentValue, index, self) => {
          if (currentValue.word != "")
            previousValue.push(currentValue.word);
          return previousValue;
        },
        new Array()
      )
    ));
    if (wordSet.length != newWordDatas.length) {
      throw new Error("duplication");
    }
    let insertQuery = "insert into words (phase,word,choices,remark,answer) values";
    newWordDatas.forEach((element) => {
      insertQuery += `('${element.phase}','${element.word}','${element.choices}','${element.remark}','${element.answer}'),`;
    });
    insertQuery = insertQuery.slice(0, -1);
    insertQuery += "as alias ON DUPLICATE KEY UPDATE phase=alias.phase, choices=alias.choices, remark=alias.remark, answer=alias.answer;";
    DataBaseQuery(insertQuery);
    res.json({ message: "File uploaded : " + originalname + " - " + myFile.size + " bytes", excel: newWordDatas });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
app.use((err, req, res, next) => {
  res.status(400).send(err.message).end();
});

export { app as default };
//# sourceMappingURL=add.mjs.map
