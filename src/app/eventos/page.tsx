import { EventsTable } from "@/components/modules/events-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function EventsPage() {
    return (
        <DashboardLayout>
            <EventsTable />
        </DashboardLayout>
    );
}