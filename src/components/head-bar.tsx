import { UserButton } from "@clerk/nextjs";

export function HeadBar() {
    return (
        <div className="w-full">
            <nav>
                <ul className="flex flex-row gap-8 justify-end p-4">
                    <UserButton afterSignOutUrl="/"/>
                </ul>
            </nav>
        </div>
    ) 
}