export default function AutocompleteOverrides() {
	return {
		MuiAutocomplete: {
			styleOverrides: {
				root: {
					".MuiFormControl-root": {
						".MuiInputBase-root": {
							"padding": "4px",
							".MuiAutocomplete-endAdornment": {
								top: "calc(50% - 18px)",
							},
						},
					},
				},
			},
		},
	};
}
