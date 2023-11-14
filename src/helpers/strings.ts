export const capitalize = (str: string) => {
	const splitedStr = str.split(" ");
	return splitedStr
		.map((s) => {
			let lowerString = s.toLowerCase();
			return `${lowerString.charAt(0).toUpperCase()}${lowerString.slice(
				1
			)}`;
		})
		.join(" ");
};
