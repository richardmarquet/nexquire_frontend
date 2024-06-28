import { PriorityLevel } from "@/components/types/DemoTypes";

export const ChoosePriorityColor = (priority: PriorityLevel): string => {
  switch (priority) {
    case "Low":
      return "text-green-400";
    case "Medium":
        console.log("hey")
      return "text-amber-400";
    case "High":
      return "text-red-400";
    case "Very High":
      return "text-red-400";
    case "Immediate Action":
      return "text-red-700";
  }
};

export const StringToPriorityLevel = (str: string): PriorityLevel => {
  if (str == "Low") {
    return "Low";
  } else if (str == "Medium") {
    return "Medium";
  } else if (str == "High") {
    return "High";
  } else if (str == "Very High") {
    return "Very High";
  } else if (str == "Immediate Action") {
    return "Immediate Action";
  } else {
    return "Low";
  }
};
