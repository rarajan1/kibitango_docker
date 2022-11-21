import { defineEventHandler } from 'h3';
import ExcelJS from 'exceljs';
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

const GenerateExcelData4words = () => new Promise((resolve, reject) => {
  const config = useRuntimeConfig();
  const connection = mysql.createPool({
    host: config.databaseHost,
    user: config.databaseUser,
    password: config.databasePassword,
    database: config.databaseName
  });
  const query = "select * from words";
  connection.query(query, async (error, result) => {
    if (error)
      reject(error);
    const workbook = new ExcelJS.Workbook();
    workbook.addWorksheet("\u767B\u9332\u3055\u308C\u3066\u3044\u308B\u5358\u8A9E");
    const worksheet = workbook.getWorksheet("\u767B\u9332\u3055\u308C\u3066\u3044\u308B\u5358\u8A9E");
    worksheet.columns = [
      { header: "\u30D5\u30A7\u30A4\u30BA", key: "phase" },
      { header: "\u82F1\u5358\u8A9E", key: "word" },
      { header: "\u9078\u629E\u80A2", key: "choices" },
      { header: "\u82F1\u5358\u8A9E\u306E\u8AAC\u660E", key: "remark" },
      { header: "\u7B54\u3048", key: "answer" }
    ];
    const data = [];
    result.forEach((element) => {
      data.push({
        phase: element.phase,
        word: element.word,
        choices: element.choices,
        remark: element.remark,
        answer: element.answer
      });
    });
    worksheet.addRows(data);
    const excelFile = await workbook.xlsx.writeBuffer();
    resolve(excelFile);
  });
});
const download = defineEventHandler(async (event) => {
  event.res.setHeader("Content-Type", "application/octet-binary; charset=UTF-8");
  event.res.setHeader("Content-Disposition", 'attachment; filename="words.xlsx"');
  const excelFile = await GenerateExcelData4words();
  return excelFile;
});

export { download as default };
//# sourceMappingURL=download.mjs.map
