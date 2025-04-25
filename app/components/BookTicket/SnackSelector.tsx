import { useEffect } from "react";
import useSnacks from "@/app/hooks/useSnacks";
import { IRoom } from "@/app/types/Rooms";
import QuantityInput from "../QuantityInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";

interface SnackSelectorProps {
  dataRoom: IRoom;
}

function SnackSelector({ dataRoom }: SnackSelectorProps) {
  // state
  // hooks
  const { dataSnacksByCinema } = useSnacks({ cinemaId: dataRoom.cinemaId._id });
  // context
  const { setTotalPriceSnack, selectedSnacks, setSelectedSnacks } = useAppContext();

  // useEffect
  useEffect(() => {
    // Cập nhật lại totalPrice khi selectedSnacks thay đổi
    const newTotalPrice = selectedSnacks.reduce(
      (total, snack) => total + snack.price * snack.quantity,
      0
    );
    setTotalPriceSnack(newTotalPrice);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSnacks]);

  // function
  const handleQuantityChange = (
    snackId: string,
    name: string,
    description: string,
    price: number,
    quantity: number
  ) => {
    setSelectedSnacks((prev) => {
      // Nếu số lượng là 0 thì loại bỏ khỏi mảng
      if (quantity === 0) {
        return prev.filter((item) => item.snackId !== snackId);
      }

      // Nếu đã tồn tại thì cập nhật
      const existing = prev.find((item) => item.snackId === snackId);
      if (existing) {
        return prev.map((item) => (item.snackId === snackId ? { ...item, quantity } : item));
      }

      // Nếu chưa có thì thêm mới
      return [
        ...prev,
        { snackId, name, description: description, price, quantity, subtotal: price * quantity },
      ];
    });
  };

  return (
    <div className="flex flex-col px-4 py-2 bg-gray-800 rounded-lg">
      <div className="grid grid-cols-8 justify-center items-center text-xl text-pink-400 bg-blue-950 p-2 rounded-lg">
        <span className="col-span-4 font-bold">COMBO</span>
        <span className="col-span-3 mx-auto font-bold">GIÁ TIỀN</span>
        <span className="col-span-1 mx-auto font-bold">SỐ LƯỢNG</span>
      </div>
      {dataSnacksByCinema?.map((item) => {
        const selected = selectedSnacks.find((s) => s.snackId === item._id);
        return (
          <div
            key={item._id}
            className="grid grid-cols-8 items-center justify-center border-2 border-[#9400ff] rounded-md py-1 px-2 mt-2"
          >
            <div className="flex flex-col col-span-4">
              <span className="font-bold text-lg">{item.name}</span>
              <span className="text-gray-400">{item.description}</span>
            </div>
            <span className="col-span-3 mx-auto text-lg">{item.price.toLocaleString()} ₫</span>
            <span className="col-span-1 mx-auto">
              <QuantityInput
                value={selected?.quantity || 0}
                onChange={(value) =>
                  handleQuantityChange(
                    item._id ?? "",
                    item.name,
                    item.description ?? "",
                    item.price,
                    value
                  )
                }
                min={0}
              />
            </span>
          </div>
        );
      })}

      {/* Xem log mảng snack để kiểm tra */}
      <pre className="text-white mt-4">{JSON.stringify(selectedSnacks, null, 2)}</pre>
    </div>
  );
}

export default SnackSelector;
