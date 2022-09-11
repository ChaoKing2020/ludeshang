'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	if (event.b.indexOf("物理") != -1) {
		if (event.a.indexOf("2021") != -1) {
			event.a = "WL2021"
		} else if (event.a.indexOf("2020") != -1) {
			event.a = "WL2020"
		} else if (event.a.indexOf("2019") != -1) {
			event.a = "WL2019"
		} else {
			event.a = "WL2018"
		}
	}else{
		if (event.a.indexOf("2021") != -1) {
			event.a = "LS2021"
		} else if (event.a.indexOf("2020") != -1) {
			event.a = "LS2020"
		} else if (event.a.indexOf("2019") != -1) {
			event.a = "LS2019"
		} else {
			event.a = "LS2018"
		}
	}
	const db = uniCloud.database()
	const MAX_LIMIT = 100
	const countResult = await db.collection(event.a).count()
	const total = countResult.total
	const batchTimes = Math.ceil(total / 100)
	const tasks = []
	for (let i = 0; i < batchTimes; i++) {
		const promise = db.collection(event.a).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
		tasks.push(promise)
	}
	return (await Promise.all(tasks)).reduce((acc, cur) => {
		return {
			data: acc.data.concat(cur.data),
			errMsg: acc.errMsg,
		}
	})
};
