import ThemeProvider from "@components/providers/theme";
import { ChildrenNode } from "@lib/index";

const ClientTemplate = ({ children }: ChildrenNode) => {
    return (
        <ThemeProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
        </ThemeProvider>
    );
}

export default ClientTemplate;