const PriorityLevels = ["Low", "Medium", "High", "Very High"] as const;
const StatusLevels = ["Not Started", "In Progress", "Completed"] as const;

type PriorityLevel = (typeof PriorityLevels)[number];
type StatusLevel = (typeof StatusLevels)[number];

interface Task {
  id: number;
  priority: PriorityLevel;
  owner: string;
  status: StatusLevel;
  company: string;
  description: string;
  requestIds: string[];
}

export { type Task, type PriorityLevel, type StatusLevel, PriorityLevels, StatusLevels };