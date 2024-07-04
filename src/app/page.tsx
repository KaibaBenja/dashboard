import { Dashboard } from "@/components/home/dashboard";
import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <Dashboard />
        </AppContextProvider>
    );
}
