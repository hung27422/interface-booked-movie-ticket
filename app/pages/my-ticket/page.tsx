"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import ProfileLayout from "@/app/layouts/ProfileLayout/ProfileLayout";

function MyTicket() {
  const { authState } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/");
    }
  }, [authState, router]);

  if (authState.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl">
        Vui lòng đăng nhập để xem thông tin vé...
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }
  return (
    <div>
      <ProfileLayout>My Ticket</ProfileLayout>
    </div>
  );
}

export default MyTicket;
