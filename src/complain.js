// 投诉分析表
const xlsx = require("node-xlsx");
const fs = require("fs");
const {
  inputDir,
  outputDir,
  complaintName,

  complaintkey1,
  complaintkey2,
  complaintkey3,
} = require('./../utils')
const data = {};
const indexMap = {};

console.log('正在读取...', complaintName)
const complaint = xlsx.parse(`./${inputDir}/${complaintName}.xlsx`)[0];
const complaintData = complaint.data || [];

console.log('正在处理...', complaintName)
complaintData.forEach((item, index) => {
  if (index === 0) {
    item.forEach((name, index) => {
      indexMap[name] = index;
    })
  }
  if (index !== 0 && item[indexMap[complaintkey1]]) {
    data[item[indexMap[complaintkey1]]] = {
      [complaintkey2]: item[indexMap[complaintkey2]],
      [complaintkey3]: item[indexMap[complaintkey3]],
    }
  }
})
module.exports = {
  data: data
}