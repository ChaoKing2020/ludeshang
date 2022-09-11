'use strict';
exports.main = async (event, context) => {
	const db = uniCloud.database()
	const _ = db.command
	let Chong = [{}]
	let Chong_1 = [{}]
	let Chong_12 = [{}]
	let s = 0
	let sum = 0
	let Cempty = 0
	let llj = 0
	let S = "2%,6%,10%,14%,17%,21%,25%,37%,50%,60%,73%,85%,90%,96%,,96%,97%,98%,98%,99%"
	let zhibiao = S.split(",")
	while (llj < 4) {
		if (s > 8) {
			break
		}
		s++
		Chong_12 = await db.collection(event.b).where({
			"G": _.eq(event.a + s)
		}).get()
		sum = 0
		Chong_12 = Chong_12.data
		for (let i = 0; i < Chong_12.length; i++) {
			for (let j = 0; j < event.c.length; j++) {
				if (Chong_12[i].J.indexOf(event.c[j]) != -1) {
					Chong_1[sum] = Chong_12[i]
					sum++
					break
				}
			}
		}
		if (sum == 0) {
			continue
		}
		sum = 0
		for (let i = 0; i < Chong_1.length; i++) {
			for (let j = 0; j < event.d.length; j++) {
				if (Chong_1[i].K.indexOf(event.d[j]) != -1) {
					Chong[llj] = Chong_1[i]
					Chong[llj].M = zhibiao[8 - s]
					llj++
					break
				}
			}
		}
	}
	if (llj > 0) {
		Cempty = 1
	}
	return {
		Chong,
		Cempty
	}
}
