import { GetAllNotifications } from "@/components/actions/notifications/NotificationActions";
import NotificationsPageContent from "./NotificationsPageContent";
import { GetUsers } from "@/components/actions/users/UserActions";

const NotificationPage = async () => {

  const notifications = await GetAllNotifications();
  if (!notifications) {
    return <div>No notifications...</div>
  }

  return (
    <div className="">
      <NotificationsPageContent notifications={notifications} />
    </div>
  );
};

export default NotificationPage;
