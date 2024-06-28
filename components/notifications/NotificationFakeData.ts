import { randomInt } from "crypto";
import { Request, Post, Notification } from "./NotificationTypes";

const companies: string[] = ["Dino Data", "Home Depot", "Garden Max"];

// Fake requests data for multiple posts
const allRequests: Request[][] = [
  // Requests for Post 1
  [
    {
      requestId: 101,
      postId: 1,
      item: "Laptop",
      quantity: "20 units",
      description:
        "Tristique risus nec feugiat in fermentum posuere urna. Sapien eget mi proin sed libero. Nisl nisi scelerisque eu ultrices vitae auctor eu augue ut. Aenean sed adipiscing diam donec adipiscing. Aliquam ut porttitor leo a diam sollicitudin tempor id. Tellus in hac habitasse platea dictumst vestibulum rhoncus est. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Accumsan tortor posuere ac ut. Mattis ullamcorper velit sed ullamcorper. Erat imperdiet sed euismod nisi porta lorem mollis aliquam ut. In nisl nisi scelerisque eu ultrices vitae auctor. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim. Cursus eget nunc scelerisque viverra mauris in aliquam sem. Convallis tellus id interdum velit laoreet id donec ultrices. Turpis cursus in hac habitasse. In hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit.",
      timeframe: "January 2024",
      location: "New York, NY",
      primaryTag: "Electronics",
      secondaryTags: ["Laptops", "Design"],
    },
    {
      requestId: 102,
      postId: 1,
      item: "Graphic Tablets",
      quantity: "10 units",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec feugiat. Gravida quis blandit turpis cursus in hac habitasse platea. Risus ultricies tristique nulla aliquet enim. Suspendisse potenti nullam ac tortor vitae purus. In iaculis nunc sed augue lacus viverra vitae congue. Amet massa vitae tortor condimentum. Enim sed faucibus turpis in eu mi. Augue ut lectus arcu bibendum at varius vel pharetra vel. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Libero nunc consequat interdum varius sit amet mattis vulputate. Sed arcu non odio euismod lacinia. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Amet consectetur adipiscing elit duis tristique sollicitudin. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Nulla at volutpat diam ut venenatis. Egestas quis ipsum suspendisse ultrices. Tortor consequat id porta nibh venenatis cras sed felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia.",
      timeframe: "February 2024",
      location: "New York, NY",
      primaryTag: "Accessories",
      secondaryTags: ["Tablets", "Art"],
    },
    {
      requestId: 103,
      postId: 1,
      item: "Wood Planks",
      quantity: "100 units",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec feugiat. Gravida quis blandit turpis cursus in hac habitasse platea. Risus ultricies tristique nulla aliquet enim. Suspendisse potenti nullam ac tortor vitae purus. In iaculis nunc sed augue lacus viverra vitae congue. Amet massa vitae tortor condimentum. Enim sed faucibus turpis in eu mi. Augue ut lectus arcu bibendum at varius vel pharetra vel. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Libero nunc consequat interdum varius sit amet mattis vulputate. Sed arcu non odio euismod lacinia. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Amet consectetur adipiscing elit duis tristique sollicitudin. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Nulla at volutpat diam ut venenatis. Egestas quis ipsum suspendisse ultrices. Tortor consequat id porta nibh venenatis cras sed felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia.",
      timeframe: "February 2024",
      location: "New York, NY",
      primaryTag: "Wood",
      secondaryTags: ["Plank", "Formed"],
    },
    {
      requestId: 104,
      postId: 1,
      item: "Steel Plates",
      quantity: "120 units",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Adipiscing diam donec adipiscing tristique risus nec feugiat. Gravida quis blandit turpis cursus in hac habitasse platea. Risus ultricies tristique nulla aliquet enim. Suspendisse potenti nullam ac tortor vitae purus. In iaculis nunc sed augue lacus viverra vitae congue. Amet massa vitae tortor condimentum. Enim sed faucibus turpis in eu mi. Augue ut lectus arcu bibendum at varius vel pharetra vel. Egestas purus viverra accumsan in nisl nisi scelerisque eu. Libero nunc consequat interdum varius sit amet mattis vulputate. Sed arcu non odio euismod lacinia. Ut enim blandit volutpat maecenas volutpat blandit aliquam. Amet consectetur adipiscing elit duis tristique sollicitudin. Lorem mollis aliquam ut porttitor leo a diam sollicitudin tempor. Nulla at volutpat diam ut venenatis. Egestas quis ipsum suspendisse ultrices. Tortor consequat id porta nibh venenatis cras sed felis. Facilisis mauris sit amet massa vitae tortor condimentum lacinia. Quam id leo in vitae turpis. Viverra mauris in aliquam sem. Id porta nibh venenatis cras sed felis eget velit aliquet. Odio aenean sed adipiscing diam donec adipiscing tristique risus. Duis convallis convallis tellus id interdum velit laoreet id donec. Placerat in egestas erat imperdiet sed euismod nisi. Sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus. Neque egestas congue quisque egestas diam in arcu cursus. Vulputate enim nulla aliquet porttitor lacus luctus. Eu lobortis elementum nibh tellus molestie. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Odio facilisis mauris sit amet massa vitae. Convallis posuere morbi leo urna. Turpis tincidunt id aliquet risus feugiat. Arcu ac tortor dignissim convallis. Eros in cursus turpis massa tincidunt dui ut. Odio euismod lacinia at quis risus sed vulputate odio.",
      timeframe: "February 2024",
      location: "New York, NY",
      primaryTag: "Metal",
      secondaryTags: ["Plates", "Steel"],
    },
  ],
  // Requests for Post 2
  [
    {
      requestId: 191,
      postId: 2,
      item: "Graphic Tablets",
      quantity: "20 units",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      timeframe: "February 2024",
      location: "New York, NY",
      primaryTag: "Accessories",
      secondaryTags: ["Tablets", "Art"],
    },
  ],
  // ... Additional requests arrays for Post 3, 4, and 5
];

// Fake posts data
const posts: Post[] = allRequests.map((requests, index) => ({
  postId: index + 1,
  requests: requests,
  company: companies[randomInt(0, companies.length)],
  timeCreated: new Date(2023, 11, 15 + index).toISOString(), // Different date for each post
}));

// Fake notifications data
const notifications: Notification[] = posts.map((post) => ({
  notificationId: post.postId,
  post: post,
}));

export { notifications };
