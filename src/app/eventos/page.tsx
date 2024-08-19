import { EventsTable } from "@/components/modules/events-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function EventsPage() {
    return (
        <DashboardLayout>
            <EventsTable />
        </DashboardLayout>
    );
}