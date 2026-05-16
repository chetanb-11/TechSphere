import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";
import { AlertCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "./ui/Button";

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "A System Error Occurred";
  let description = "An unexpected error disrupted your session.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Resource Not Found";
      description = "The requested path could not be located in the system.";
    } else {
      title = `Error ${error.status}`;
      description = error.statusText || error.data;
    }
  } else if (error instanceof Error) {
    description = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 font-sans">
      <div className="max-w-md w-full bg-white border border-slate-200 p-6 shadow-sm rounded-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
        <div className="flex items-start gap-4 mb-6 pt-2">
           <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center shrink-0 border border-red-100">
             <AlertCircle className="w-5 h-5 text-red-600" />
           </div>
           <div>
             <h1 className="text-base font-bold text-slate-900 mb-1">{title}</h1>
             <p className="text-sm text-slate-500 break-words">{description}</p>
           </div>
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={() => window.location.reload()} className="flex-1 text-xs font-semibold">
             <RotateCcw className="w-3 h-3 mr-2" />
             Reload
          </Button>
          <Button size="sm" onClick={() => navigate("/")} className="flex-1 bg-slate-900 text-white text-xs font-semibold shadow-none hover:bg-slate-800">
             <Home className="w-3 h-3 mr-2" />
             Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
