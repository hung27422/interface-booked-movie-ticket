"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/contexts/AuthContextProvider/AuthContextProvider";
import ProfileLayout from "@/app/layouts/ProfileLayout/ProfileLayout";
import Image from "next/image";
import useTicket from "@/app/hooks/useTicket";
import ModalInfoTicket from "@/app/components/MyTicket/ModalInfoTicket";

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

  const { dataTicketByUserID } = useTicket({ userId: authState.user?._id });

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      router.push("/");
    }
  }, [authState, router]);

  if (authState.isLoading) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl text-center px-4">
        Vui lòng đăng nhập để xem thông tin vé...
      </div>
    );
  }

  if (!dataTicketByUserID) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full">
      <ProfileLayout>
        <div className="flex flex-wrap justify-center gap-2 mt-6 px-4 sm:gap-4">
          {menus.map((menu) => (
            <div
              key={menu.id}
              onClick={() => setToggleMenu(menu.id)}
              className={`px-3 py-2 border-2 border-pink-500 rounded-lg cursor-pointer transition-colors text-sm sm:text-base ${
                toggleMenu === menu.id
                  ? "bg-gradient-to-r from-pink-500/80 to-pink-600/80 text-white"
                  : "text-pink-500"
              }`}
            >
              {menu.name}
            </div>
          ))}
        </div>

        <div className="mt-6 px-4 sm:px-8 md:px-20 lg:px-40 h-full">
          {toggleMenu === 1 && (
            <div className="space-y-4">
              {dataTicketByUserID.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Image src={ticket.imageCinema} alt="logo" width={50} height={50} />
                    <div>
                      <div className="text-base font-bold">{ticket.movieName}</div>
                      <div className="text-sm">{ticket.cinemaName}</div>
                      <div className="text-sm">
                        {ticket.time} - {ticket.date}
                      </div>
                    </div>
                  </div>
                  <div className="self-end sm:self-auto">
                    <ModalInfoTicket idTicket={ticket._id} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {toggleMenu === 2 && (
            <div className="text-center text-gray-400 h-40 mt-8">Vé đã sử dụng</div>
          )}
          {toggleMenu === 3 && <div className="text-center text-gray-400 h-40 mt-8">Vé đã hủy</div>}
        </div>
      </ProfileLayout>
    </div>
  );
}

export default MyTicket;
