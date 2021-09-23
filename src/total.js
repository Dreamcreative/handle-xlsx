// 汇总表
const xlsx = require("node-xlsx");
const {
  inputDir,
  totalName,

  totalkey1,
  totalkey2,
  totalSpilt
} = require("./../utils");
const data = {};
const indexMap = {};

console.log("正在读取...", totalName);
const total = xlsx.parse(`./${inputDir}/${totalName}.xlsx`)[0];
const totalData = total.data || [];
const firstItem = totalData.shift();
firstItem.forEach((name, index) => {
  indexMap[name] = index;
});
console.log("正在处理...", totalName);
totalData.forEach((item) => {
  const key = item[indexMap[totalkey1]];
  const key2 = item[indexMap[totalkey2]];
  if (key) {
    data[`${key}${totalSpilt}${key2}`] = item;
  }
});
module.exports = {
  data: data,
  indexMap: indexMap,
};
