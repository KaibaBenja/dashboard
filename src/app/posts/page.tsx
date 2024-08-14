import { PostsTable } from "@/components/modules/post-table";
import { DashboardLayout } from "@/components/layout/dashboard-layout";

export default function PostsPage() {
    return (
            <DashboardLayout>
                <PostsTable />
            </DashboardLayout>
    );
}