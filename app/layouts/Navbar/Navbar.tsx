"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/Logo.png";
import SearchInput from "@/app/components/SearchInput";
import ModalLAuth from "@/app/components/Auth/ModalLAuth";
import { usePathname } from "next/navigation";
import DrawerNavbar from "@/app/components/DrawerNavbar";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import AccountMenu from "@/app/components/Auth/AccountMenu";
const menus = [
  {
    id: 1,
    path: "/",
    label: "Đặt vé",
  },
  {
    id: 2,
    path: "/pages/showtimes",
    label: "Lịch chiếu",
  },
  {
    id: 3,
    path: "/pages/evaluate",
    label: "Đánh giá",
  },
];
function Navbar() {
  //Context
  const { authState } = useContext(AuthContext);
  console.log({ authState });

  const pathName = usePathname();

  return (
    <div className="navbar-wrapper">
      {/* Drawer menu - Chỉ hiển thị khi màn hình nhỏ */}
      <div className="lg:hidden">
        <DrawerNavbar />
      </div>

      {/* Logo */}
      <div className="p-2 text-center tech-border">
        <Link href={"/"}>
          <Image
            className="px-4 py-1"
            src={Logo}
            alt="Logo"
            width={100}
            height={60}
            sizes="(max-width: 768px) 100px, auto"
          />
        </Link>
      </div>

      {/* Menu - Chỉ hiển thị trên màn hình lớn */}
      <div className="hidden lg:flex items-center">
        {menus.map((item) => {
          const isActive =
            item.path === "/"
              ? pathName === "/" || pathName.startsWith("/pages/book-ticket")
              : pathName.startsWith(item.path);

          return (
            <Link
              className={`w-32 mx-2 py-2 px-1 tech-border ${isActive ? "tech-border-focused" : ""}`}
              href={item.path}
              key={item.id}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* SearchInput + User - Search chỉ hiển thị trên màn hình lớn */}
      <div className="flex items-center justify-center">
        <div className="hidden lg:block mr-3">
          <SearchInput width={400} />
        </div>
        {authState.isAuthenticated ? <AccountMenu /> : <ModalLAuth />}
      </div>
    </div>
  );
}

export default Navbar;
