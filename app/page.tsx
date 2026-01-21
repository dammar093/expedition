import prisma from "@/lib/prisma";
import React from "react";

const Page = async () => {
  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <p>
            {user.name} - {user.email}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Page;
