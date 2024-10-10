import { PostsTable } from "@/components/tables/post-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default async function PostsPage() {
    return (
        <DashboardLayout>
            <PostsTable />
        </DashboardLayout>
    );
}