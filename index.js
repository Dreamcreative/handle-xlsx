const xlsx = require("node-xlsx");
const fs = require("fs");
const {
	totalkey2,
	totalkey3,
	totalkey4,
	totalkey5,
	totalkey6,
	totalkey7,
	totalkey8,
	totalkey9,
	totalSpilt,
	complaintNumberDefault,

	complaintkey2,
	complaintkey3,
	trinakey2,
	trinakey3,
	trinakey4,
	outputDir,
	deleteFolderRecursive
} = require('./utils');
deleteFolderRecursive(`./${outputDir}`);
fs.mkdir(`./${outputDir}`, { recursive: true }, (err) => {
	if (err) throw err;
});;
const result = [];
const totalHeaders = [];
const complain = require('./src/complain');
const complainData = complain.data;
const meridian = require('./src/meridian');
const meridianData = meridian.data;
const trina = require('./src/trina');
const trinaData = trina.data;
const mapping = require('./src/mapping');
const mappingData = mapping.data;
const { data, indexMap } = require('./src/total');

for (let key in indexMap) {
	totalHeaders.push(key);
}
result[0] = totalHeaders;
for (let key in data) {
	const [e55, complaintNumber] = key.split(totalSpilt);
	const item = data[key];

	// 投诉
	if (complaintNumber !== complaintNumberDefault) {
		const tempcomplaint = complainData[complaintNumber];
		if (tempcomplaint) {
			item[indexMap[totalkey7]] = tempcomplaint[complaintkey2]
			item[indexMap[totalkey8]] = tempcomplaint[complaintkey3]
		}
	}

	// 出账收入
	item[indexMap[totalkey3]] = meridianData[e55]?.data ?? '';
	// 是否AI
	item[indexMap[totalkey9]] = meridianData[e55]?.isAI ? "是" : "否";
	// 码号数量 账户并发 平均峰值并发
	const companyName = mappingData[e55];
	const valueObj = trinaData[companyName];
	if (valueObj) {
		item[indexMap[totalkey4]] = valueObj[trinakey2];
		item[indexMap[totalkey5]] = valueObj[trinakey3];
		item[indexMap[totalkey6]] = valueObj[trinakey4];
	}
	result.push(item);
}

const buffer = xlsx.build([{ name: '汇总表', data: result }])
fs.writeFileSync(`./output/汇总表.xlsx`, buffer);