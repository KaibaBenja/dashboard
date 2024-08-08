import { AuthoritiesTable } from "@/components/home/authorities-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function AutoridadesPage() {
    return (
        <DashboardLayout>
            <AuthoritiesTable />
        </DashboardLayout>
    );
}