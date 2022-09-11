// 云函数入口文件
'use strict';
// 云函数入口函数
exports.main = async (event, context) => {
	let b
	let b1
	let a = event.a
	let f = event.f
	let e
	if ("美术".indexOf(event.e) != -1) {
		e = 1
		if (a >= 349 && f >= 223) {
			b = 1
		} else {
			b = 0
		}
	} else if ("音乐".indexOf(event.e) != -1) {
		e = 2
		if (a >= 349 && f >= 253) {
			b = 1
		} else {
			b = 0
		}
	} else if ("舞蹈".indexOf(event.e) != -1) {
		e = 3
		if (a >= 326 && f >= 239) {
			b = 1
		} else {
			b = 0
		}
	} else if ("播音".indexOf(event.e) != -1) {
		e = 4
		if (a >= 466 && f >= 166) {
			b = 1
		} else {
			b = 0
		}
	} else if ("编导".indexOf(event.e) != -1) {
		e = 5
		if (a >= 349 && f >= 223) {
			b = 1
		} else {
			b = 0
		}
	} else if ("戏剧表演".indexOf(event.e) != -1) {
		e = 7
		if (a >= 326 && f >= 227) {
			b = 1
		} else {
			b = 0
		}
	} else if ("服饰表演".indexOf(event.e) != -1) {
		e = 8
		if (a >= 326 && f >= 219) {
			b = 1
		} else {
			b = 0
		}
	} else if ("书法艺术".indexOf(event.e) != -1) {
		e = 9
		if (a >= 349 && f >= 231) {
			b = 1
		} else {
			b = 0
		}
	} else {
		e = 10
		if (a >= 466 && f >= 192) {
			b = 1
		} else {
			b = 0
		}
	}
	if (event.b.indexOf("物理") != -1) {
		if (b == 1) {
			b1 = "Art_WL"
		} else {
			b1 = "Art_WL_S"
		}
	} else {
		if (b == 1) {
			b1 = "Art_LS"
		} else {
			b1 = "Art_LS_S"
		}
	}
	const E = e
	if (E == 5 || E == 4 || E == 10) {
		a = event.a + event.f
	} else {
		a = event.a * 0.3 + event.f * 0.7
	}
	return {
		b1,
		a,
		e
	}
}
