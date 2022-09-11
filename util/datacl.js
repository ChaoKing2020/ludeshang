export function dataCl(data){
	data.forEach(item=>{
		if (typeof item.E == 'string') {
			item.E = item.E.split('/')
			item.F = item.F.split(';')
			for (let i = 0; i < item.F.length; i++) {
				item.F[i] = item.F[i].split('/')
			}
		} else {
			return
		}
	})
}