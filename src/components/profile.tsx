import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Profile() {
    return (
        <div>
            <Avatar>
            <AvatarImage src="https://github.com/shadcn.pngsdsd" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}