export const rupiah = (rp: number, fraction?: number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		maximumFractionDigits: fraction ? fraction : 0,
	}).format(rp);
};
