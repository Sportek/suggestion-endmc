import { Account } from "@/app/database/UsersData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ProfileProps {
  account: Account;
}

export function Profile({ account }: ProfileProps) {
  return (
    <div className="flex items-center justify-center gap-3 flex-col px-4 py-2">
      <Avatar>
        <AvatarImage src={account.imageUrl} />
        <AvatarFallback>{account.name}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center justify-center">
        <Badge variant="secondary">{account.title}</Badge>
        <div className="text-center">{account.name}</div>
      </div>
    </div>
  );
}
