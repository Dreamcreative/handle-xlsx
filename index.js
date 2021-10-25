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
	totalHeader,
	meridiankey7,
	meridiankey8,
	deleteFolderRecursive
} = require('./utils');
deleteFolderRecursive(`./${outputDir}`);
fs.mkdir(`./${outputDir}`, { recursive: true }, (err) => {
	if (err) throw err;
});;
const result = [];
const complain = require('./src/complain');
const complainData = complain.data;
const meridian = require('./src/meridian');
const meridianData = meridian.data;
const trina = require('./src/trina');
const trinaData = trina.data;
const mapping = require('./src/mapping');
const mappingData = mapping.data;
// const { data, indexMap } = require('./src/total');
const indexMap = [];
totalHeader.forEach((name, index) => {
	indexMap[name] = index;
});
result[0] = totalHeader;
for (let key in meridianData) {
	const item = [];
	// 地市 索引
	const cityIndex = indexMap[meridiankey7];
	// 集团名称 索引
	const nameIndex = indexMap[meridiankey8];
	// e55计费号 索引
	const e55 = key;
	// 投诉编码 索引
	const complaintNumberIndex = indexMap[totalkey2];
	// 出账收入 索引
	const outaccountIndex = indexMap[totalkey3];
	// 码号数量 索引
	const codeNumberIndex = indexMap[totalkey4];
	// 账户并发 索引
	const accountIndex = indexMap[totalkey5];
	// 平均峰值并发 索引
	const averagePeakIndex = indexMap[totalkey6];
	// 投诉总量 索引
	const complaintsIndex = indexMap[totalkey7];
	// 催收投诉总量 索引
	const collectionIndex = indexMap[totalkey8];
	// 是否AI 索引
	const aiIndex = indexMap[totalkey9];
	// TODO 映射表中需要 添加 投诉编号 字段
	const complaintNumber = '';
	// const [e55, complaintNumber] = key.split(totalSpilt);
	// const item = data[key];

	// 投诉
	if (complaintNumber !== complaintNumberDefault) {
		const tempcomplaint = complainData[complaintNumber];
		if (tempcomplaint) {
			item[complaintsIndex] = tempcomplaint[complaintkey2]
			item[collectionIndex] = tempcomplaint[complaintkey3]
		}
	}

	// 出账收入
	item[outaccountIndex] = meridianData[e55]?.data ?? '';
	// 是否AI
	item[aiIndex] = meridianData[e55]?.isAI ? "是" : "否";
	// 码号数量 账户并发 平均峰值并发
	const companyName = mappingData[e55];
	const valueObj = trinaData[companyName];
	if (valueObj) {
		item[codeNumberIndex] = valueObj[trinakey2];
		item[accountIndex] = valueObj[trinakey3];
		item[averagePeakIndex] = valueObj[trinakey4];
	}
	result.push(item);
}

const buffer = xlsx.build([{ name: '汇总表', data: result }])
fs.writeFileSync(`./output/汇总表.xlsx`, buffer);