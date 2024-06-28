import React from "react";
import BudgetPageContent from "./_components/BudgetPageContent";
import {
  Offer,
  Post,
  PriorityLevel,
  Project,
  Task,
  User,
  UserType,
  Request,
} from "@/components/types/DemoTypes";

const page = () => {
  /*
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
  */

  /**
     id: string;
  username: string;
  full_name: string;
  role: UserType;
   */

  const admin: User = {
    id: "1",
    username: "username",
    full_name: "jimmy",
    role: UserType.Admin
  }

  const project: Project = {
    id: 100,
    title: "Project Sigma",
    description: "This is project sigma babbyyy",
    budget: 40000,
    created_at: "December 12th 2023",
    admin: admin,
    client_id: 1,
    num_users: 1,
    num_offers: 1,
    num_posts: 1,
    active: false,
    amount_spent: 100
  };

  const requests: Request[] = [
    {
      id: 1,
      primary_tag: "Concrete",
      item_name: "Concrete",
      description: "We need concrete bro",
      quantity: 50,
      unit_of_measure: "Tons",
      budget: 10000,
      city: "Seattle",
      state: "WA",
      fulfilled: false,
      secondary_tags: ["concrete mix"],
      amount_paid: 1000,
    },
  ];

  const posts: Post[] = [
    {
      id: 1,
      created_at: "December 15th 2023",
      client_name: "Home Depot",
      title: "Test Post 1",
      description: "Heyyyy yeahhhh post 1 baby",
      active: true,
      requests: [requests[0]],
      project: project,
    },
  ];

  const users: User[] = [
    {
      id: "1",
      role: UserType.Admin,
      username: "JohnDoe",
      full_name: "John Doe"
    },
  ];

  const tasks: Task[] = [
    {
      id: 1,
      post_id: 1,
      post_title: "Post1",
      post_description: "Post description",
      post_created_at: "post created at",
      created_at: "Created at",
      assignee_id: "2131231",
      assignee_name: "Josh",
      completed_at: "Completed at some time",
      approval_required: true,
      title: "Task Title",
      description: "Task description",
      due_date: "due date",
      priority: "High",
      requests: [requests[0]],
    },
  ];

  const offers: Offer[] = [
    {
      id: 1,
      title: "Example offer",
      vendor_name: "Vendor Name",
      client_name: "Client Name",
      creator_name: "Joe",
      accepted_by_name: "Sam",
      contract_file_paths: ["/path/to/thing"],
      vendor_phone: "2544565423",
      vendor_email: "vendoremail@email.com",
      client_phone: "9873451073",
      client_email: "clientemail@email.com",
      response: null,
      approved: "approved",
      approval_changed_at: "",
      disapproval_comments: "",
      created_at: "some random time",
      offer_description: "a description",
      active: false,
      task: tasks[0],
      project_id: 1,
      project_title: "projectA",
      responded_at: ""
    },
  ];

  const data = {
    project,
    posts,
    users,
    offers,
  };
  return (
    <div>
      <BudgetPageContent data={data} />
    </div>
  );
};

export default page;
