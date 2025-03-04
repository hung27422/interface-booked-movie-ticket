import Image from "next/image";

function MovieBookingCard() {
  return (
    <div className="flex flex-col justify-center items-center max-md:w-20 p-2 m-2 md:mx-2 mx-auto cursor-pointer tech-border">
      <Image
        src="https://cdn.moveek.com/storage/media/cache/tall/6780d1ed8a13c311344030.jpg"
        alt="img-film"
        className="w-20 h-24 md:w-32 md:h-40 rounded-md"
        width={120}
        height={170}
      />
      <div>
        <h5 className="w-[65px] md:w-[120px] mt-1 text-sm max-md:text-xs  truncate">
          Nụ hôn bạc tỷ
        </h5>
      </div>
      <div>
        <span>1</span>
      </div>
    </div>
  );
}

export default MovieBookingCard;
