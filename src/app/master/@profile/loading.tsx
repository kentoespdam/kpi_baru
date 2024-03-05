import { Skeleton } from "@components/ui/skeleton";

const LoadingProfile = () => {
    return (
        <div className="py-2 flex items-center gap-3">
            <div className="flex flex-col">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
        </div>
    );
}

export default LoadingProfile;