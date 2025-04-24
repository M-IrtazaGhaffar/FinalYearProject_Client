import { redirect } from "next/navigation";
import { auth } from "@/auth"; // Adjust path if needed

export default async function Page() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/");
  }

  const userType = session.user.type;

  if (userType === "organization") {
    redirect("/dashboard/organization");
  } else if (userType === "retailer") {
    redirect("/dashboard/retailer");
  } else {
    redirect("/");
  }
}
