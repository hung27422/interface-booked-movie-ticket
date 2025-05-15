"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import ProfileLayout from "@/app/layouts/ProfileLayout/ProfileLayout";
import Image from "next/image";
import Button from "@/app/components/Button";
const menus = [
  {
    id: 1,
    name: "Vé chưa sử dụng",
  },
  {
    id: 2,
    name: "Vé đã sử dụng",
  },
  {
    id: 3,
    name: "Vé đã hủy",
  },
];
function MyTicket() {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(1);

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
    <div className="h-screen">
      <ProfileLayout>
        <div className="flex items-center gap-4 justify-center">
          {menus.map((menu) => {
            return (
              <div
                onClick={() => {
                  setToggleMenu(menu.id);
                }}
                key={menu.id}
                className={`mt-8 px-2 py-1 border-2 border-pink-500 rounded-lg cursor-pointer ${
                  toggleMenu === menu.id ? "bg-gradient-to-r from-pink-500/80 to-pink-600/80" : ""
                } `}
              >
                <div className="text-base font-bold">{menu.name}</div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 mx-40">
          {toggleMenu === 1 && (
            <div>
              <div className="flex items-center justify-between bg-gray-800 py-1 px-2 rounded-lg ">
                <div className="flex items-center">
                  <Image
                    src={`https://ecosmartcitythuthiemlotte.vn/wp-content/uploads/2019/05/logo.png`}
                    alt="logo"
                    width={50}
                    height={50}
                  />
                  <div className="ml-4">
                    <div className="text-base font-bold">Đêm Thánh: Đội săn quỷ</div>
                    <div className="text-sm">Lotte Nam Sài Gòn</div>
                    <div className="text-sm">20:45 , 14/05/2025</div>
                  </div>
                </div>

                <div>
                  <Button color="inherit" title="Xem chi tiết" size="medium" variant="outlined" />
                </div>
              </div>
            </div>
          )}
          {toggleMenu === 2 && <div>Vé đã sử dụng</div>}
          {toggleMenu === 3 && <div>Vé đã hủy</div>}
        </div>
      </ProfileLayout>
    </div>
  );
}

export default MyTicket;
