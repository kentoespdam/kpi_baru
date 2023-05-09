export const formatRupiah = Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 2,
}).format;

export const formatAngka = Intl.NumberFormat("id-ID").format;

export const formatFloat = Intl.NumberFormat("id-ID", {
	minimumFractionDigits: 2,
	maximumFractionDigits: 2,
}).format;

export const formatTanggal = Intl.DateTimeFormat("id-ID", {
	year: "numeric",
	month: "long",
	day: "2-digit",
}).format;
