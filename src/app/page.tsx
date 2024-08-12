import { Hero } from "@/components/Hero";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <DashboardLayout>
                <Hero />
            </DashboardLayout>
        </AppContextProvider>
    );
}
