export default function LinearProgressOverrides() {
	return {
		MuiLinearProgress: {
			styleOverrides: {
				root: {
					height: 6,
					borderRadius: 100,
				},
				bar: {
					borderRadius: 100,
				},
			},
		},
	};
}
