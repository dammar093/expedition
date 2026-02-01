import { auth } from "@/auth";
import { Logout } from "@/components/auth/logout";

const DashboardPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <Logout />
    </div>
  );
};

export default DashboardPage;
