type PostResponse = "Accept" | "Reject";
type ApprovalType = "pending" | "approved" | "disapproved";
type AccountType = "V" | "C";
type PriorityLevel =
  | "Low"
  | "Medium"
  | "High"
  | "Very High"
  | "Immediate Action";

export enum UserType {
  "Basic",
  "Premium",
  "Elite",
  "Super Elite",
  "Admin",
  "Super Admin",
}

export type Role = "user" | "admin" | "owner";

interface Request {
  id: number;
  primary_tag: string;
  item_name: string;
  description: string | null;
  quantity: number | null;
  unit_of_measure: string | null;
  budget: number | null;
  amount_paid: number | null;
  city: string;
  state: string;
  fulfilled: boolean | null;
  secondary_tags: string[];
}

interface Post {
  id: number;
  created_at: string;
  client_name: string;
  title: string;
  description: string | null;
  active: boolean | null;
  requests: Request[];
  project: Project | null;
  owner: string;
}

interface Task {
  id: number;
  post_id: number | null;
  post_title: string;
  post_description: string | null;
  post_created_at: string | null;
  created_at: string | null;
  assignee_id: string | null;
  assignee_name: string | null;
  completed_at: string | null;
  approval_required: boolean;
  title: string | null;
  description: string | null;
  due_date: string | null;
  priority: PriorityLevel | null;
  requests: Request[];
}

interface Offer {
  id: number;
  title: string;
  vendor_name: string | null;
  client_name: string | null;
  creator_name: string | null;
  accepted_by_name: string | null;
  contract_file_paths: string[];
  vendor_phone: string | null;
  vendor_email: string | null;
  client_phone: string | null;
  client_email: string | null;
  response: PostResponse | null;
  responded_at: string | null;
  approved: ApprovalType | null;
  approval_changed_at: string | null;
  disapproval_comments: string | null;
  created_at: string;
  offer_description: string | null;
  active: boolean;
  task: Task;
  project_id: number | null;
  project_title: string | null;
}

interface Project {
  id: number;
  title: string;
  description: string;
  budget: number;
  created_at: string;
  admin: User;
  client_id: number;
  num_users: number;
  num_offers: number;
  num_posts: number;
  active: boolean;
  amount_spent: number;
}

interface Create_Offer_Data {
  creator: string;
  files: File[];
  description: string;
  taskId: number;
  phone: string;
  email: string;
}

interface Create_Task_Data {}

interface Paid_Request {
  id: number;
  paid: number | null;
}

interface User {
  id: number;
  username: string;
  full_name: string;
  role: UserType;
}

export {
  type Request,
  type Post,
  type Task,
  type Offer,
  type PostResponse,
  type Create_Offer_Data,
  type Create_Task_Data,
  type Paid_Request,
  type User,
  type Project,
  type AccountType,
  type PriorityLevel,
};
