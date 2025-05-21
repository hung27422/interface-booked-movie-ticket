"use client";
import TextFieldInput from "@/app/components/TextFieldInput";
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
    <div className="">
      <ProfileLayout>
        <div className="flex flex-col sm:grid grid-cols-2 sm:gap-6 h-dvh mt-6 px-4 sm:px-0">
          <div className="col-span-1">
            <TextFieldInput label="Tài khoản" name="fullName" value={authState.user?.username} />
            <TextFieldInput label="Họ và tên" name="fullName" value={authState.user?.fullName} />
          </div>
          <div className="col-span-1">
            <TextFieldInput label="Email" name="fullName" value={authState.user?.email} />
            <TextFieldInput label="Số điện thoại" name="fullName" value={authState.user?.phone} />
          </div>
        </div>
      </ProfileLayout>
    </div>
  );
}

export default User;
