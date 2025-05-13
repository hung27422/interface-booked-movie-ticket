"use client";
// app/profile/layout.tsx
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IconButton, Tooltip } from "@mui/material";

interface ProfileLayoutProps {
  children: ReactNode;
}
const menus = [
  { id: 1, name: "Thông tin cá nhân", path: "/user" },
  { id: 2, name: "Vé của tôi", path: "/my-ticket" },
];
export default function ProfileLayout({ children }: ProfileLayoutProps) {
  const router = useRouter();
  const { authState } = useContext(AuthContext);
  const [toggleMenu, setToggleMenu] = useState(1);
  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/");
    }
  }, [authState, router]);

  if (authState.isLoading) {
    router.push("/");
  }

  if (!authState.isAuthenticated) {
    return null;
  }

  const name = authState.user?.fullName;
  const words = name?.split(" ");
  const lastWord = words && words[words.length - 1];
  const firstLetter = lastWord?.charAt(0);

  return (
    <div className="h-full">
      <div>
        <div className="">
          <Image
            src={"https://cdn.moveek.com/bundles/ornweb/img/tix-banner.png"}
            alt="banner"
            width={1000}
            height={400}
            className="w-full"
          />
        </div>
        <div className="relative flex items-center top-[-40px] px-6">
          <Tooltip title="Thông tin">
            <IconButton size="small" sx={{ ml: 2 }} aria-haspopup="true">
              <div className="flex flex-col items-center justify-center rounded-full size-24 tech-border cursor-pointer">
                <span className="text-7xl font-bold text-red-500 text-center">{firstLetter}</span>
              </div>
            </IconButton>
          </Tooltip>
          <div className="mt-4 ml-6">
            <span className="text-xl">{authState.user?.username}</span>
          </div>
        </div>
        <div className="flex items-center pb-4 border-b-2 border-gray-400">
          {menus.map((menu) => {
            return (
              <div
                onClick={() => setToggleMenu(menu.id)}
                key={menu.id}
                className={`py-1 px-2 cursor-pointer ${
                  toggleMenu === menu.id
                    ? "bg-blue-950 text-pink-400 rounded-lg"
                    : "text-white hover:text-pink-400"
                }`}
              >
                <span className="text-lg">{menu.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Render các children (ví dụ MyTicket hoặc các phần khác) */}
      <div>{children}</div>
    </div>
  );
}
