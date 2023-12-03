import { UsersData } from "@/app/database/UsersData";
import { auth } from "@clerk/nextjs"

export const currentProfile = async () => {
    const { userId } = auth();
    if(!userId) {
        return null;
    }

    const data = new UsersData();
    const profile = await data.getAccountByID(userId);

    return profile;
}