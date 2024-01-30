import CardBuilder from "@muiClient/card";
import MuiContainer from "@muiClient/container";

export const metadata = {
    title: "Login KPI",
};
const AuthPage = () => {
    return (
        <MuiContainer maxWidth="xs" sx={{ mt: 4 }}>
            <CardBuilder title={metadata.title} isLink={false} color="error">
                Enter
            </CardBuilder>
        </MuiContainer>
    );
}

export default AuthPage;