
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

interface ExpertiseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  experienceLevel: string;
  industries: string[];
  tools: string[];
  rateStructure: string;
  rateRange: string;
  availability: string;
  responseTime: string;
  isActive: boolean;
}

interface ExpertiseCardProps {
  expertise: ExpertiseItem;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ExpertiseCard({ expertise, onToggleStatus, onDelete }: ExpertiseCardProps) {
  return (
    <Card className={expertise.isActive ? "" : "opacity-70"}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-lg font-medium">{expertise.title}</CardTitle>
          <div className="flex items-center mt-1 space-x-2">
            <Badge variant="outline">{expertise.category}</Badge>
            <Badge variant={expertise.isActive ? "default" : "secondary"}>
              {expertise.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to={`/developer/expertise/${expertise.id}`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={`/developer/expertise/${expertise.id}/preview`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Preview</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(expertise.id)} className="text-destructive">
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{expertise.description}</p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Experience:</span>
            <span>{expertise.experienceLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Rate:</span>
            <span>{expertise.rateStructure}, {expertise.rateRange}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Response time:</span>
            <span>{expertise.responseTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <div className="flex items-center space-x-2">
          <Switch 
            id={`status-${expertise.id}`}
            checked={expertise.isActive}
            onCheckedChange={() => onToggleStatus(expertise.id)}
          />
          <label 
            htmlFor={`status-${expertise.id}`}
            className="text-sm font-medium cursor-pointer"
          >
            {expertise.isActive ? "Active" : "Inactive"}
          </label>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/developer/expertise/${expertise.id}`}>
            <Edit className="mr-2 h-3 w-3" />
            Edit
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
