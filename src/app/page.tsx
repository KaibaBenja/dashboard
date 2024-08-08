import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <DashboardLayout>
                <Home />
            </DashboardLayout>
        </AppContextProvider>
    );
}
