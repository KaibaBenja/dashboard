import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ImpresionesTable } from "@/modules/impresiones-table";

export default async function AutoridadesPage() {
    return (
        <DashboardLayout>
            <ImpresionesTable />
        </DashboardLayout>
    );
}