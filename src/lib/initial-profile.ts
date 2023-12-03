import { db } from "@/app/database/Database";
import { UsersData } from "@/app/database/UsersData";
import { currentUser, redirectToSignIn } from "@clerk/nextjs";

export const initialProfile = async () => {
  const data = new UsersData();

  const user = await currentUser();
  if (!user) {
    return redirectToSignIn();
  }

  const profile = await data.getAccountByID(user.id.toString());

  if (profile) {
    return profile;
  }

  const newProfile = await data.createAccount({
    userId: user.id,
    name: `${user.username}`,
    imageUrl: user.imageUrl,
    email: user.emailAddresses[0].emailAddress,
    title: "Membre",
  });

  return newProfile;
};
