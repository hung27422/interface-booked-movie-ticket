"use client";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/images/Logo.png";
import SearchInput from "@/app/components/SearchInput";
import ModalLAuth from "@/app/components/Auth/ModalLAuth";
const menus = [
  {
    id: 1,
    path: "book-ticket",
    label: "Đặt vé",
  },
  {
    id: 2,
    path: "showtimes",
    label: "Lịch chiếu",
  },
  {
    id: 3,
    path: "evaluate",
    label: "Đánh giá",
  },
];
function Navbar() {
  return (
    <div className="flex justify-between items-center h-16 py-3 px-40 border-b-2 border-red-500 glowing-border-bottom bg-[#121212] text-white">
      <div className="flex items-center">
        {menus.map((item) => {
          return (
            <Link className="mx-2 tech-border p-1 w-28" href={`/pages/${item.path}`} key={item.id}>
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
