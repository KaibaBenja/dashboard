import { GameTable } from "@/components/tables/game-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function GamePage() {
    return (
            <DashboardLayout>
                <GameTable />
            </DashboardLayout>
    );
}