import React from "react";
import { 
  MessagesSquare, 
  Brain,
  BarChart,
  Briefcase,
  Cloud,
  Code,
  DollarSign,
  Headphones,
  Heart,
  Image,
  Languages,
  Music,
  PenTool,
  ShoppingCart,
  Video,
  Users,
  BookOpen,
  Building2,
  FileText,
} from "lucide-react";

export interface CategoryDefinition {
  name: string;
  description: string;
  icon: React.ElementType;
  tools: string[];
}

export const categoryDefinitions: Record<string, CategoryDefinition> = {
  communication: {
    name: "Communication",
    description: "Enhance team collaboration and customer engagement.",
    icon: MessagesSquare,
    tools: ["Slack", "Microsoft Teams", "Zoom", "Email"]
  },
  writing: {
    name: "Writing & Content",
    description: "Generate high-quality content for blogs, articles, and marketing.",
    icon: PenTool,
    tools: ["Google Docs", "Medium", "WordPress"]
  },
  productivity: {
    name: "Productivity",
    description: "Streamline workflows and automate repetitive tasks.",
    icon: BarChart,
    tools: ["Trello", "Asana", "Monday.com"]
  },
  sales: {
    name: "Sales & Marketing",
    description: "Boost sales performance and marketing effectiveness.",
    icon: DollarSign,
    tools: ["Salesforce", "HubSpot", "Mailchimp"]
  },
  customerService: {
    name: "Customer Service",
    description: "Improve customer satisfaction and support efficiency.",
    icon: Headphones,
    tools: ["Zendesk", "Intercom", "Help Scout"]
  },
  hr: {
    name: "Human Resources",
    description: "Automate HR processes and improve employee experience.",
    icon: Users,
    tools: ["Workday", "BambooHR", "Greenhouse"]
  },
  finance: {
    name: "Finance",
    description: "Manage finances, automate accounting, and improve financial insights.",
    icon: DollarSign,
    tools: ["QuickBooks", "Xero", "NetSuite"]
  },
  education: {
    name: "Education",
    description: "Enhance learning experiences and automate educational tasks.",
    icon: BookOpen,
    tools: ["Google Classroom", "Canvas", "Moodle"]
  },
  research: {
    name: "Research & Development",
    description: "Accelerate research processes and improve data analysis.",
    icon: Brain,
    tools: ["Jupyter Notebook", "MATLAB", "SPSS"]
  },
  projectManagement: {
    name: "Project Management",
    description: "Organize projects, track progress, and improve team collaboration.",
    icon: Briefcase,
    tools: ["Jira", "Asana", "Trello"]
  },
  cloudServices: {
    name: "Cloud Services",
    description: "Manage cloud infrastructure, automate deployments, and improve scalability.",
    icon: Cloud,
    tools: ["AWS", "Azure", "Google Cloud"]
  },
  softwareDevelopment: {
    name: "Software Development",
    description: "Automate coding tasks, improve code quality, and accelerate development cycles.",
    icon: Code,
    tools: ["GitHub", "GitLab", "Bitbucket"]
  },
  healthcare: {
    name: "Healthcare",
    description: "Improve patient care, automate administrative tasks, and enhance medical research.",
    icon: Heart,
    tools: ["Epic", "Cerner", "Meditech"]
  },
  media: {
    name: "Media & Entertainment",
    description: "Automate content creation, improve media management, and enhance user engagement.",
    icon: Image,
    tools: ["Adobe Creative Suite", "Final Cut Pro", "DaVinci Resolve"]
  },
  localization: {
    name: "Localization",
    description: "Automate translation processes, improve localization accuracy, and expand global reach.",
    icon: Languages,
    tools: ["SDL Trados", "memoQ", "Transifex"]
  },
  music: {
    name: "Music Production",
    description: "Automate music creation, improve audio quality, and enhance music distribution.",
    icon: Music,
    tools: ["Ableton Live", "Logic Pro", "Pro Tools"]
  },
  ecommerce: {
    name: "E-commerce",
    description: "Automate online sales, improve customer experience, and enhance marketing efforts.",
    icon: ShoppingCart,
    tools: ["Shopify", "Magento", "WooCommerce"]
  },
  videoProduction: {
    name: "Video Production",
    description: "Automate video editing, improve video quality, and enhance video distribution.",
    icon: Video,
    tools: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"]
  },
  legal: {
    name: "Legal",
    description: "Automate legal processes, improve document management, and enhance legal research.",
    icon: FileText,
    tools: ["LexisNexis", "Westlaw", "Practical Law"]
  },
  manufacturing: {
    name: "Manufacturing",
    description: "Automate manufacturing processes, improve production efficiency, and enhance quality control.",
    icon: Building2,
    tools: ["SAP", "Oracle", "Siemens"]
  }
};

export const categories = Object.values(categoryDefinitions);

export const renderCategoryIcon = (categoryName: string) => {
  const category = categoryDefinitions[categoryName as keyof typeof categoryDefinitions];
  if (category && category.icon) {
    const IconComponent = category.icon;
    return <IconComponent className="h-5 w-5 mr-2" />;
  }
  return null;
};
