import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import ProfileLayout from "@/app/layouts/ProfileLayout/ProfileLayout";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

function User() {
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
        Vui lòng đăng nhập để xem thông tin người dùng...
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    return null;
  }
  return (
    <div>
      <ProfileLayout>My Profile</ProfileLayout>
    </div>
  );
}

export default User;
