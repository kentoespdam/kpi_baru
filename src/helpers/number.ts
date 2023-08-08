export const rupiah = (rp: number, fraction?: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: fraction ? fraction : 0,
	}).format(rp);
};

export const isDecimal = (nilai: number) => nilai % 1 !== 0;
