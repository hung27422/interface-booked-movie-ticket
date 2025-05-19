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

  //hooks
  const { dataTicketByUserID } = useTicket({ userId: authState.user?._id });

  // Check if user is authenticated
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
  if (!dataTicketByUserID) {
    return <div>Loading...</div>;
  }
  return (
    <div className="h-full">
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
        <div className="mt-8 mx-40 h-full">
          {toggleMenu === 1 && (
            <div>
              {dataTicketByUserID.map((ticket) => {
                return (
                  <div key={ticket._id} className="py-2">
                    <div className="flex items-center justify-between bg-gray-800 py-1 px-2 rounded-lg ">
                      <div className="flex items-center">
                        <Image src={ticket.imageCinema} alt="logo" width={50} height={50} />
                        <div className="ml-4">
                          <div className="text-base font-bold">{ticket.movieName}</div>
                          <div className="text-sm">{ticket.cinemaName}</div>
                          <div className="text-sm">
                            {ticket.time} - {ticket.date}
                          </div>
                        </div>
                      </div>

                      <div>
                        <ModalInfoTicket idTicket={ticket._id} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {toggleMenu === 2 && <div className="h-screen">Vé đã sử dụng</div>}
          {toggleMenu === 3 && <div>Vé đã hủy</div>}
        </div>
      </ProfileLayout>
    </div>
  );
}

export default MyTicket;
