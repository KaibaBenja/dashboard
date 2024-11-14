import { Home } from "@/modules/home";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { AppContextProvider } from "@/context/AppContext";

export default function HomePage() {
    return (
        <AppContextProvider>
            <DashboardLayout>
                <Home />
            </DashboardLayout>
        </AppContextProvider>
    );
}
