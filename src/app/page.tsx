import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { UpButton } from "@/components/up-button";
import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <DashboardLayout>
                <h1>Main Text</h1>
            </DashboardLayout>
            <UpButton />
        </AppContextProvider>
    );
}
