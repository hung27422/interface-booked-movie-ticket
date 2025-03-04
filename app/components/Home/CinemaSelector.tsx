import Image from "next/image";
import SearchCinemasInput from "../SearchCinemasInput";

function CinemaSelector() {
  return (
    <>
      <div className="hidden md:block">
        <div className="hidden md:flex items-center justify-center bg-blue-950 text-pink-400 rounded-t-md h-10">
          <Image
            src={
              "https://cdn.moveek.com/storage/media/cache/square/59a2a1753d6416c84b4e05146280584a33448c14.png"
            }
            alt="img-logo-cinemas"
            width={25}
            height={25}
          ></Image>
          <h3 className="ml-3 text-xl">Cinestart</h3>
        </div>
        <ul className="border-2 border-[#9400ff] mt-2 rounded-md">
          <li className="py-2  px-8 border-[#9400ff] border-b text-base cursor-pointer text-center">
            Cinestar Quốc Thanh
          </li>
          <li className="py-2  px-8 border-[#9400ff] border-b text-base cursor-pointer text-center">
            Cinestar Hai Bà Trưng
          </li>
        </ul>
      </div>
      <div className="mt-2 text-center md:hidden">
        <SearchCinemasInput />
      </div>
    </>
  );
}

export default CinemaSelector;
