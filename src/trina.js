// 天合表
const xlsx = require("node-xlsx");
const fs = require("fs");
const {
  inputDir,
  outputDir,
  trinaName,

  trinakey1,
  trinakey2,
  trinakey3,
  trinakey4,
} = require('./../utils')
const data = {};
const indexMap = {};


console.log('正在读取...', trinaName)
const trina = xlsx.parse(`./${inputDir}/${trinaName}.xlsx`)[0];
const trinaData = trina.data || [];

console.log('正在处理...', trinaName)
trinaData.forEach((item, index) => {
  if (index === 0) {
    item.forEach((name, index) => {
      indexMap[name] = index;
    })
  }
  if (index !== 0 && item[indexMap[trinakey1]]) {
    data[item[indexMap[trinakey1]]] = {
      [trinakey2]: item[indexMap[trinakey2]],
      [trinakey3]: item[indexMap[trinakey3]],
      [trinakey4]: item[indexMap[trinakey4]],
    }
  }
})
module.exports = {
  data: data
}