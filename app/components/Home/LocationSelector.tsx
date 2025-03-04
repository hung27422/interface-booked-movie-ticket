import SearchAddressInput from "../SearchAddressInput";

function LocationSelector() {
  return (
    <>
      {/* Hiển thị trên desktop */}
      <div className="hidden md:block">
        <h3 className="flex items-center justify-center h-10 lg:text-xl text-pink-400  bg-blue-950  rounded-t-md  ">
          Khu Vực
        </h3>
        <ul className="border-2 border-[#9400ff] mt-2 rounded-md text-center hidden md:block">
          <li className="py-2  px-8 border-[#9400ff] border-b text-base cursor-pointer hover-neon-text">
            Tp. Hồ Chí Minh
          </li>
          <li className="py-2  px-8 border-[#9400ff] border-b text-base cursor-pointer hover-neon-text">
            Hà Nội
          </li>
          <li className="py-2  px-8 border-[#9400ff] border-b text-base cursor-pointer hover-neon-text">
            Đồng Nai
          </li>
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
