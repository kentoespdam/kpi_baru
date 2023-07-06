// ==============================|| OVERRIDES - CARD CONTENT ||============================== //

export default function CardContentOverrides() {
    return {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 20,
                    '&:last-child': {
                        paddingBottom: 20
                    }
                }
            }
        }
    };
}
