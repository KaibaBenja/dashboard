import { GameTable } from "@/components/home/game-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function GamePage() {
    return (
            <DashboardLayout>
                <GameTable />
            </DashboardLayout>
    );
}