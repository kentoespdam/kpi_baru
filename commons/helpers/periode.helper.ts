export interface IPeriode {
	periode: string;
}

export function getListPeriode(order?: "asc" | "desc"): IPeriode[] {
	const date = new Date();
	const th = date.getFullYear() - 1;
	const bl = date.getMonth();
	const aPeriode: IPeriode[] = [];
	for (let i = 12; i >= 1; i--) {
		// last periode
		const nBln = i <= 0 ? i + 12 : i;
		const sBln = nBln < 10 ? `0${nBln}` : `${nBln}`;
		const nTh = i <= 0 ? th - 1 : th;
		aPeriode.push({ periode: `${nTh}${sBln}` });
		// curr periode
		if (i > bl) continue;
		const cNth = th + 1;
		aPeriode.push({ periode: `${cNth}${sBln}` });
	}

	switch (order) {
		case "asc":
			return aPeriode.sort((a, b) => {
				if (a.periode < b.periode) return -1;
				if (a.periode > b.periode) return 1;
				return 0;
			});
		case "desc":
			return aPeriode.sort((a, b) => {
				if (a.periode > b.periode) return -1;
				if (a.periode < b.periode) return 1;
				return 0;
			});
		default:
			return aPeriode.sort((a, b) => {
				if (a.periode > b.periode) return -1;
				if (a.periode < b.periode) return 1;
				return 0;
			});
	}
}

export function getCurrentPeriode(): number {
	const date = new Date();
	const th = date.getFullYear();
	const bl = date.getMonth() + 1;
	const sBln = bl < 10 ? `0${bl}` : `${bl}`;
	return parseInt(`${th}${sBln}`);
}
