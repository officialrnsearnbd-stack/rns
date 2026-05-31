import { Link } from "react-router-dom";
import PageMeta from "@/components/common/PageMeta";
import { Button } from "@/components/ui/button";
import { Ghost } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <PageMeta title="Page Not Found - RNS" description="The page you are looking for does not exist." />
      <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 text-center">
        <div className="mb-6 h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <Ghost className="h-12 w-12 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        <p className="max-w-md text-muted-foreground mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Button asChild>
          <Link to="/">Back to home</Link>
        </Button>
      </div>
    </>
  );
}
