import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { QuestionsTable } from "@/modules/questions-table";

export default async function EventsPage() {
    return (
        <DashboardLayout>
            <QuestionsTable />
        </DashboardLayout>
    );
}