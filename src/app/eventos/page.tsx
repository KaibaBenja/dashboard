import { EventsTable } from "@/components/tables/events-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function EventsPage() {
    return (
        <DashboardLayout>
            <EventsTable />
        </DashboardLayout>
    );
}