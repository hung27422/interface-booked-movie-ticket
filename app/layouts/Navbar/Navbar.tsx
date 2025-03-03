"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/Logo.png";
import SearchInput from "@/app/components/SearchInput";
import ModalLAuth from "@/app/components/Auth/ModalLAuth";
import { usePathname } from "next/navigation";
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
    <div className="flex justify-between items-center h-20 py-3 px-40 border-b-2 border-red-500 glowing-border-bottom bg-[#121212] text-white">
      <div className="flex items-center">
        {menus.map((item) => {
          return (
            <Link
              className={`mx-2 tech-border py-2 px-1 w-32 ${
                pathName === item.path ? "tech-border-focused" : ""
              }`}
              href={`${item.path}`}
              key={item.id}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="tech-border p-2">
        <Link href={"/"}>
          <Image className="" src={Logo} alt="Logo"></Image>
        </Link>
      </div>
      <div className="flex items-center">
        <SearchInput />
        <ModalLAuth />
      </div>
    </div>
  );
}

export default Navbar;
