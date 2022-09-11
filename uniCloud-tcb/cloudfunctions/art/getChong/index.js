// 云函数入口文件
'use strict';
// 云函数入口函数
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const _ = db.command
	let Chong = [{}]
	let Chong_1 = [{}]
	let Cempty = 0
	let s1 = 0
	let s = 1
	let sum = 0
	let S = "2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,96%,97%,98%,98%,99%"
	let zhibiao = S.split(",")
	const E = event.e
	while (sum < 4) {
		if (s1 > 8) {
			break
		}
		s1++
		s++
		Chong_1 = await db.collection(event.b).where({
			"T": _.gte(event.a + s1).and(_.lte(event.a + s)),
			"N": _.eq(E)
		}).get()
		for (let i = 0; i < Chong_1.data.length; i++) {
			Chong[sum] = Chong_1.data[i]
			Chong[sum].M = zhibiao[8 - s1]
			sum++
		}
	}
	if (sum > 0) {
		Cempty = 1
	}
	return {
		Chong,
		Cempty
	}
}
