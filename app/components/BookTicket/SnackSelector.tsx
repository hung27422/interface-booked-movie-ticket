import useSnacks from "@/app/hooks/useSnacks";
import { IRoom } from "@/app/types/Rooms";
import QuantityInput from "../QuantityInput";

interface SnackSelectorProps {
  dataRoom: IRoom;
}
function SnackSelector({ dataRoom }: SnackSelectorProps) {
  const { dataSnacksByCinema } = useSnacks({ cinemaId: dataRoom.cinemaId._id });
  return (
    <div className="flex flex-col  px-4 py-2 bg-gray-800 rounded-lg ">
      <div className="grid grid-cols-8 justify-center items-center text-xl text-pink-400 bg-blue-950 p-2">
        <span className="col-span-4 font-bold">COMBO</span>
        <span className="col-span-3 mx-auto font-bold">GIÁ TIỀN</span>
        <span className="col-span-1 mx-auto font-bold">SỐ LƯỢNG</span>
      </div>
      {dataSnacksByCinema?.map((item) => {
        return (
          <div
            key={item._id}
            className="grid grid-cols-8 items-center justify-center border-2 border-[#9400ff] rounded-md py-1 px-2 mt-2 "
          >
            <div className="flex flex-col col-span-4">
              <span className="font-bold text-lg">{item.name}</span>
              <span className="text-gray-400">{item.description}</span>
            </div>
            <span className="col-span-3 mx-auto text-lg">{item.price.toLocaleString()} ₫</span>
            <span className="col-span-1 mx-auto">
              <QuantityInput />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default SnackSelector;
