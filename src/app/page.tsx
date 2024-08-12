import { HomeComponent } from "@/components/intro-component";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <DashboardLayout>
                <HomeComponent />
            </DashboardLayout>
        </AppContextProvider>
    );
}
