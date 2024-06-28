interface Request {
  requestId: number;
  postId: number;
  item: string;
  quantity: string;
  description: string;
  timeframe: string;
  location: string;
  primaryTag: string;
  secondaryTags: string[];
}

interface Post {
  postId: number;
  requests: Request[];
  company: string;
  timeCreated: string;
}

interface Notification {
  notificationId: number;
  post: Post;
}

export { type Request, type Post, type Notification };
