import { GetPostById } from "@/components/actions/posts/PostActions";
import NotificationPageContent from "./NotificationPageContent";
import { GetNotificationByPostID } from "@/components/actions/notifications/NotificationActions";
import { GetUsers } from "@/components/actions/users/UserActions";

interface Props {
    params: {
        notificationId: string;
    }
}
const NotificationPage = async ({ params }: Props) => {

  // it is important to note that as of now a notificationId == postId
  const { notificationId } = params;
  const notificationId_num = Number(notificationId)
  if (isNaN(notificationId_num)) {
    throw "notification id must be a number";
  }

  const notification = await GetNotificationByPostID(notificationId_num);
  if (!notification) {
    return <div>Notification does not exist</div>
  }

  const users = await GetUsers();
  if (!users) {
    throw "unable to acquire users...";
  }

  return (
    <div className="">
        <NotificationPageContent notification={notification} users={users}/>
    </div>
  )
}

export default NotificationPage;