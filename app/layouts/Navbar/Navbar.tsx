"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/Logo.png";
import SearchInput from "@/app/components/SearchInput";
import ModalLAuth from "@/app/components/Auth/ModalLAuth";
import { usePathname } from "next/navigation";
import DrawerNavbar from "@/app/components/DrawerNavbar";
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
          {/* Hiển thị desktop */}
          <Image className="px-4 py-1 hidden md:block" src={Logo} alt="Logo" />

          {/* Hiển thị mobile */}
          <Image
            className="px-4 py-1 block md:hidden"
            src={Logo}
            alt="Logo"
            width={100}
            height={60}
          />
        </Link>
      </div>

      {/* Menu - Chỉ hiển thị trên màn hình lớn */}
      <div className="hidden lg:flex items-center">
        {menus.map((item) => (
          <Link
            className={`w-32 mx-2 py-2 px-1 tech-border ${
              pathName === item.path ? "tech-border-focused" : ""
            }`}
            href={`${item.path}`}
            key={item.id}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* SearchInput + User - Search chỉ hiển thị trên màn hình lớn */}
      <div className="flex items-center">
        <div className="hidden lg:block">
          <SearchInput width={400} />
        </div>
        <ModalLAuth />
      </div>
    </div>
  );
}

export default Navbar;
