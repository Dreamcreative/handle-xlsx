// 经分表
const xlsx = require("node-xlsx");
const fs = require("fs");
const {
  inputDir,
  outputDir,
  meridianName,

  meridiankey1,
  meridiankey2,
  meridiankey3,
  meridiankey4,
  meridiankey5,
} = require('./../utils')

const data = {};
const indexMap = {};
const temp = {};

console.log('正在读取...', meridianName)
const meridian = xlsx.parse(`./${inputDir}/${meridianName}.xlsx`)[0];
const meridianData = meridian.data || [];

console.log('正在处理...', meridianName)
const firstItem = meridianData.shift();
firstItem.forEach((name, index) => {
  indexMap[name] = index;
})
meridianData.forEach((item) => {
  const key = item[indexMap[meridiankey1]];
  if (!temp[key]) {
    temp[key] = [];
  }
  temp[key].push(item);
})
for (let key in temp) {
  const item = temp[key]
  const result = item.reduce((total, cur) => {
    if (cur[indexMap[meridiankey2]] === meridiankey5) {
      total += cur[indexMap[meridiankey3]]
    }
    return total;
  }, 0)

  data[key] = result
}
module.exports = {
  data: data
}