import { BasicLayout } from "@/components/ui";
import { LoaderCircle } from "lucide-react";

export const LoadingPage = () => {
  return (
    <BasicLayout className="w-full h-full">
      <div className="flex justify-center items-center h-svh">
        <LoaderCircle className="animate-spin" />
      </div>
    </BasicLayout>
  );
};

export default LoadingPage;
