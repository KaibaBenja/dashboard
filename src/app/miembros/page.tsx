import { MembersTable } from "@/components/modules/members-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function MembersPage() {
    return (
        <DashboardLayout>
            <MembersTable />
        </DashboardLayout>
    );
}