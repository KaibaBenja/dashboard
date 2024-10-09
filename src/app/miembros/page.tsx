import { MembersTable } from "@/components/tables/members-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function MembersPage() {
    return (
        <DashboardLayout>
            <MembersTable />
        </DashboardLayout>
    );
}