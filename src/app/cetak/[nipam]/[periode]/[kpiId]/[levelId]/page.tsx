"use client";

import { useEffect } from "react";

const CetakPage = () => {
	useEffect(() => {
		setTimeout(() => {
			window.print();
		}, 500);

		window.onafterprint = (e) => {
			setTimeout(() => window.close(), 500);
		};
	}, []);
	return <></>;
};

export default CetakPage;
