import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../../../../globals.css";
import { User } from "@supabase/supabase-js";
import { GetCurrentUser } from "@/components/actions/users/UserActions";
import { GetProjectById } from "@/components/actions/projects/ProjectActions";
import Container from "./container";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface ClientDashboardHomeLayout {
  children: React.ReactNode;
  params: {
    projectId: string;
  };
}

export default async function ClientDashboardUsersLayout({
  children,
  params,
}: ClientDashboardHomeLayout) {
  const { projectId } = params;

  const project = await GetProjectById(Number(projectId));
  if (!project) {
    throw "[ClientDashboardLayout] project not found";
  }
  
  return (
    <div lang="en">
      <Container project={project}>
        {children}
      </Container>
    </div>
  );
}
