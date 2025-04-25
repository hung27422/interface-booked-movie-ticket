"use client";
import CinemaSeatMap from "@/app/components/BookTicket/CinemaSeatMap";
import PaymentBooking from "@/app/components/BookTicket/PaymentBooking";
import SnackSelector from "@/app/components/BookTicket/SnackSelector";
import StepperBookTicket from "@/app/components/BookTicket/StepperBookTicket";
import TicketSummary from "@/app/components/BookTicket/TicketSummary";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";
import useRooms from "@/app/hooks/useRooms";
import useShowTime from "@/app/hooks/useShowTimes";

interface BookTicketDetailProps {
  params: { slug: string };
}

function BookTicketDetail({ params }: BookTicketDetailProps) {
  //context
  const { stepBooking } = useAppContext();
  //hooks
  const { getShowTimeById } = useShowTime({ idShowTime: params.slug });
  const idRoom = getShowTimeById?.room?._id;
  const { getRoomsById: dataRoom } = useRooms({ idRoom });

  // Nếu dữ liệu chưa load xong
  if (!getShowTimeById || !dataRoom) {
    return <div className="text-center text-lg mt-4">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-svh">
      <div>
        <StepperBookTicket stepBooking={stepBooking} />
      </div>
      <div className="mt-4 grid grid-cols-10 gap-4">
        <div className="col-span-7">
          {stepBooking === 0 && <CinemaSeatMap dataRoom={dataRoom} />}
          {stepBooking === 1 && <SnackSelector dataRoom={dataRoom} />}
          {stepBooking === 2 && <PaymentBooking />}
        </div>
        <div className="col-span-3">
          <TicketSummary getShowTimeById={getShowTimeById} />
        </div>
      </div>
    </div>
  );
}

export default BookTicketDetail;
