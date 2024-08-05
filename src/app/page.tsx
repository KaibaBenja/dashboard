import { Dashboard } from "@/components/home/dashboard";
import { UpButton } from "@/components/up-button";
import { AppContextProvider } from "@/context/AppContext";

export default function Home() {
    return (
        <AppContextProvider>
            <Dashboard />
            <UpButton />
        </AppContextProvider>
    );
}
