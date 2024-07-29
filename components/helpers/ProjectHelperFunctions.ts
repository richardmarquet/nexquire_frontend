import { Post, Project } from "@/components/types/DemoTypes";

export function CalculateTotalBudget(posts: Post[]): number {
  let budget = 0;
  posts.forEach((post) => {
    post.requests.forEach((request) => {
      budget += request.budget!;
    });
  });
  return budget;
}

// TODO need the amountSpent data on the request which will be added soon
export function CalculateTotalSpentBudget(posts: Post[]): number {
  return 1;
}

export function GetNumberOfRequestsCompleted(posts: Post[]): number {
  let completed = 0;
  posts.forEach((post) => {
    post.requests.forEach((request) => {
      if (request.fulfilled) {
        completed += 1;
      }
    });
  });
  return completed;
}

export function GetNumberOfRequestsNotConpleted(posts: Post[]): number {
  let notCompleted = 0;
  posts.forEach((post) => {
    post.requests.forEach((request) => {
      if (!request.fulfilled) {
        notCompleted += 1;
      }
    });
  });
  return notCompleted;
}

export function GetTotalNumberOfRequests(posts: Post[]): number {
  let requests = 0;
  posts.forEach((post) => {
    requests += post.requests.length;
  });
  return requests;
}

export const NumToRole = (roleTypeNum: number): string => {
  switch (roleTypeNum) {
    case 0:
    case 1:
    case 2:
      return "User";
    case 3:
    case 4:
      return "Admin";
    case 5:
    case 6:
      return "Owner";
  }
  throw "bad roleTypeNum";
};

export const GetColorForRole = (roleTypeNum: number): string => {
  switch (roleTypeNum) {
    case 0:
    case 1:
    case 2:
      return "bg-green-400";
    case 3:
    case 4:
      return "bg-yellow-400";
    case 5:
    case 6:
      return "bg-red-400";
  }
  throw "bad roleTypeNum";
};
