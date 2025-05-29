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
  { id: 1, path: "/", label: "Đặt vé" },
  { id: 2, path: "/pages/movies", label: "Phim" },
  { id: 3, path: "/pages/cinemas", label: "Rạp" },
];

function Navbar() {
  const { authState } = useContext(AuthContext);
  const pathName = usePathname();

  return (
    <div className="navbar-wrapper ">
      {/* Left: Drawer + Logo */}
      <div className="flex items-center">
        {/* Drawer menu - Hiện trên mobile */}
        <div className="lg:hidden mr-2">
          <DrawerNavbar />
        </div>
      </div>
      {/* Logo */}
      <Link href="/" className="block">
        <Image
          className="px-2 py-1"
          src={Logo}
          alt="Logo"
          width={100}
          height={60}
          sizes="(max-width: 768px) 100px, auto"
        />
      </Link>

      {/* Center: Menu - chỉ hiển thị trên màn hình lớn */}
      <div className="hidden lg:flex items-center gap-4">
        {menus.map((item) => {
          const isActive =
            item.path === "/"
              ? pathName === "/" || pathName.startsWith("/pages/book-ticket")
              : pathName.startsWith(item.path);

          return (
            <Link
              key={item.id}
              href={item.path}
              className={`lg:w-24 py-2 px-4 tech-border text-sm ${
                isActive ? "tech-border-focused" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Right: SearchInput + Auth */}
      <div className="flex items-center gap-2">
        {/* Chỉ hiện Search trên desktop */}
        <div className="hidden lg:block">
          <SearchInput width={400} />
        </div>

        {/* Auth */}
        {authState.isAuthenticated ? <AccountMenu /> : <ModalLAuth />}
      </div>
    </div>
  );
}

export default Navbar;
