"use client";
import { GetTotalNumberOfRequests } from "@/app/clientportal/(dashboard2)/dashboard/[projectId]/ProjectHelperFunctions";
import { Post } from "@/components/types/DemoTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NotificationsTable from "./NotificationsTable";

interface Props {
  notifications: Post[];
}
const NotificationsPageContent = ({ notifications }: Props) => {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Notifications
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground text-green-700">
                All active notifications
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Number Of Requests
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {GetTotalNumberOfRequests(notifications)}
              </div>
              <p className="text-xs text-muted-foreground text-green-700">
                Total number of requests
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-xl mb-2">Recent Notifications</h1>
        <NotificationsTable notifications={notifications} />
      </div>
    </div>
  );
};

export default NotificationsPageContent;
