// 映射表
const xlsx = require("node-xlsx");
const fs = require("fs");
const {
  inputDir,
  outputDir,
  mappingName,

  mappingkey1,
  mappingkey2
} = require('./../utils')
const data = {};
const indexMap = {};
console.log('正在读取...', mappingName)
const mapping = xlsx.parse(`./${inputDir}/${mappingName}.xlsx`)[0];
const mappingData = mapping.data || [];

console.log('正在处理...', mappingName)
mappingData.forEach((item, index) => {
  if (index === 0) {
    item.forEach((name, index) => {
      indexMap[name] = index;
    })
  }
  if (index !== 0 && item[indexMap[mappingkey1]]) {
    data[item[indexMap[mappingkey2]]] = item[indexMap[mappingkey1]]
  }
})
module.exports = {
  data: data
}