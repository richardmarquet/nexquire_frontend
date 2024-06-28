import { Offer, Post, PostResponse } from "@/components/types/DemoTypes";

export function CalculateTotalBudgetOnProject(posts: Post[]): number {
  let budget = 0;
  posts.forEach((post) => {
    budget += CaluclateTotalBudgetOnPost(post);
  });
  return budget;
}

export function CaluclateTotalBudgetOnPost(post: Post): number {
  let budget = 0;
  post.requests.forEach((request) => {
    budget += request.budget!;
  });
  return budget;
}

export function CalculateTotalSpentOnProject(posts: Post[]): number {
  let amount = 0;
  posts.forEach((post) => {
    amount += CalculateTotalSpentOnPost(post);
  });
  return amount;
}

export function CalculateTotalSpentOnPost(post: Post): number {
  let amount = 0;
  post.requests.forEach((request) => {
    amount += request.amount_paid ?? 0;
  });
  return amount;
}

export function CalculateBudgetSpentOnProject(posts: Post[]): number {
  return Math.ceil(
    CalculateTotalSpentOnProject(posts) / CalculateTotalBudgetOnProject(posts)
  );
}

export function CalculateBudgetSpentOnPost(post: Post): number {
  return Math.ceil(
    CalculateTotalSpentOnPost(post) / CaluclateTotalBudgetOnPost(post)
  );
}

export function CalculateBudgetOnOffer(offer: Offer): number {
  let amount = 0;
  offer.task.requests.forEach((request) => {
    amount += request.budget ?? 0;
  });
  return amount;
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

export function GetNumberOfRequestsNotCompleted(posts: Post[]): number {
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

export function GetNumberOfPendingOffers(offers: Offer[]): number {
  let pendingOffers = 0;
  offers.forEach((offer) => {
    pendingOffers += !offer.response ? 1 : 0;
  });
  return pendingOffers;
}

export function GetNumberOfAcceptedOffers(offers: Offer[]): number {
  let pendingOffers = 0;
  offers.forEach((offer) => {
    pendingOffers += offer.response === "Accept" ? 1 : 0;
  });
  return pendingOffers;
}

export function GetNumberOfRejectedOffers(offers: Offer[]): number {
  let rejectedOffers = 0;
  offers.forEach((offer) => {
    rejectedOffers += offer.response === "Reject" ? 1 : 0;
  });
  return rejectedOffers;
}

// export function GetNumberOfPendingOffers(offers: Offer[]): number {
//   let unapprovedOffers = 0;
//   offers.forEach((offer) => {
//     unapprovedOffers += offer.approved === "pending" ? 1 : 0;
//   });
//   return unapprovedOffers;
// }

// export function GetNumberOfApprovedOffers(offers: Offer[]): number {
//   let approvedOffers = 0;
//   offers.forEach((offer) => {
//     approvedOffers += offer.approved === "approved" ? 1 : 0;
//   });
//   return approvedOffers;
// }

// export function GetNumberOfDisapprovedOffers(offers: Offer[]): number {
//   let disapprovedOffers = 0;
//   offers.forEach((offer) => {
//     disapprovedOffers += offer.approved === "disapproved" ? 1 : 0;
//   });
//   return disapprovedOffers;
// }
