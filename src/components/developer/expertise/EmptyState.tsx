
import { Award, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="rounded-full bg-primary/10 p-4 mb-4">
        <Award className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-lg font-medium mb-2">No expertise added yet</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">
        Showcase your services and skills to attract clients looking for implementation help or custom development.
      </p>
      <Button asChild>
        <Link to="/developer/expertise/new">
          <Plus className="mr-2 h-4 w-4" />
          Add Your First Expertise
        </Link>
      </Button>
    </div>
  );
}
