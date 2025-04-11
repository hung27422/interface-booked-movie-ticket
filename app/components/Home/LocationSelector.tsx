import addressCinemas from "@/app/utils/addressCinemas";
import SearchAddressInput from "../SearchAddressInput";
import { useAppContext } from "@/app/contexts/AppContextProvider/AppContextProvider";

function LocationSelector() {
  const { selectedAddress, setSelectedAddress } = useAppContext();

  const handleSelectAddress = (address: string) => {
    setSelectedAddress(address);
  };
  
  return (
    <>
      {/* Hiển thị trên desktop */}
      <div className="hidden md:block">
        <h3 className="flex items-center justify-center h-10 lg:text-xl text-pink-400  bg-blue-950  rounded-t-md  ">
          Khu Vực
        </h3>
        <ul className="border-2 border-[#9400ff] mt-2 rounded-md text-center hidden md:block">
          {addressCinemas.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelectAddress(item.address)}
              className={`border-b-2 border-[#9400ff] cursor-pointer py-2 text-lg font-semibold transition-all duration-200 
                ${
                  selectedAddress === item.address
                    ? "bg-blue-950 text-pink-400"
                    : "hover:bg-blue-950 hover:text-pink-400"
                }`}
            >
              {item.address}
            </li>
          ))}
        </ul>
      </div>
      {/* Hiển thị trên mobile */}
      <div className="mt-2 text-center md:hidden">
        <SearchAddressInput />
      </div>
    </>
  );
}

export default LocationSelector;
