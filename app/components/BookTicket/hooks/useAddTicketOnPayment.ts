// hooks/useAddTicketOnPayment.ts
import { ITicket } from "@/app/types/Ticket";
import { useEffect, useRef } from "react";

const useAddTicketOnPayment = (
  responseCode: string | null,
  ticket: ITicket,
  addTicket: (ticket: ITicket) => Promise<void>
) => {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    if (responseCode === "00") {
      (async () => {
        await addTicket(ticket);
      })();
    }
  }, [responseCode, ticket, addTicket]);
};

export default useAddTicketOnPayment;
