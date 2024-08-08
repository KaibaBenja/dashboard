import { GameTable } from "@/components/modules/game-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function GamePage() {
    return (
            <DashboardLayout>
                <GameTable />
            </DashboardLayout>
    );
}