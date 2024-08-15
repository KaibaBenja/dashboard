import { GameTable } from "@/components/modules/game-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function GamePage() {
    console.log("BACK_URI:", process.env.NEXT_PUBLIC_BACK_URI);

    return (
            <DashboardLayout>
                <GameTable />
            </DashboardLayout>
    );
}