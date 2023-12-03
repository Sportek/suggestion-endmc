import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileProps {
    name: string;
    title: string;
    profileUrl: string;
}

export function Profile({ name, title, profileUrl}: ProfileProps) {


    return (
        <div className="flex items-center justify-center gap-3 flex-col px-4 py-2">
            <Avatar>
                <AvatarImage src={profileUrl} />
                <AvatarFallback>{name}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
                <Badge variant="secondary">{title}</Badge>
                <div className="text-center">{name}</div>
            </div>
        </div>
    )
}