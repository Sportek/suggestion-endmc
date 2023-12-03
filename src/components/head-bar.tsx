import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export function HeadBar() {
  return (
    <div className="w-full border-b-2 border-yellow-600">
      <nav>
        <ul className="flex flex-row gap-8 justify-between p-4">
          <div className="text-yellow-600 text-lg font-bold flex flex-row gap-2">
            <Image src="/logo.png" width="32" height="32" alt="Logo" />
            Suggestion App
          </div>
          <UserButton afterSignOutUrl="/" />
        </ul>
      </nav>
    </div>
  );
}
