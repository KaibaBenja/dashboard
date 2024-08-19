import { GameTable } from "@/components/modules/game-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function GamePage() {
    return (
            <DashboardLayout>
                <GameTable />
            </DashboardLayout>
    );
}