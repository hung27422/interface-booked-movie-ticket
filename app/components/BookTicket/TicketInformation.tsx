import Image from "next/image";

function TicketInformation() {
  return (
    <div className="flex flex-col bg-gray-700 w-1/2 mx-auto border-white border-2 rounded-lg px-4 py-2">
      <div>
        <h1 className="text-2xl font-bold text-center">Thông tin vé</h1>
      </div>
      <div className="flex  items-center gap-3">
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Lotte_%22Value_Line%22_logo.svg/1200px-Lotte_%22Value_Line%22_logo.svg.png"
          }
          alt="img-film"
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <span className="text-sm">Lotte Nam Sài Gòn</span>
          <span className="text-base font-bold">Đêm Thánh: Đội Săn Quỷ</span>
          <span className="text-sm">2D Phụ Đề</span>
        </div>
      </div>
      <div className="flex items-center justify-center py-4">
        <Image
          src={
            "https://images2.thanhnien.vn/zoom/1200_630/528068263637045248/2025/5/7/1-174659383571045893240-54-0-724-1280-crop-1746594029676662158967.jpg"
          }
          alt="img"
          width={600}
          height={100}
          className="rounded-lg"
        />
      </div>
      <div className="flex items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2">
        <div className="flex flex-col">
          <span>Mã đặt vé: 123456</span>
          <span>Thời gian: 22:40 - 0:40 12.05.2025</span>
        </div>
        <div>
          <Image
            src={
              "https://cdn.tgdd.vn/GameApp/3/236809/Screentshots/qr-code-generator-cong-cu-tao-ma-qr-tren-dien-thoai-logo-01-04-2021.png"
            }
            alt="img"
            width={100}
            height={100}
            className="rounded-lg"
          />
        </div>
      </div>
      <div className="flex items-center justify-between py-2 border-dashed border-b-2 border-b-gray-300">
        <div className="flex flex-col">
          <span>Phòng chiếu : 03</span>
          <span>Số ghế: A1 A2</span>
          <span>Rạp chiều: Lotte Nam Sài Gòn</span>
          <span>Địa chỉ: Thủ Đức - TP.HCM</span>
        </div>
        <div>Thức ăn kèm: 1 x Combo có Gấu</div>
      </div>
      <div className="flex items-center justify-between py-2 border-dashed border-b-2 border-b-gray-300">
        <span>Mã giao dịch: 12415124142</span>
        <span>Thời gian giao dịch: 0:40 12.05.2025</span>
      </div>
      <div>
        <h5 className="text-center mx-auto mt-2">Thông tin người nhận</h5>
        <div className="flex items-center justify-between border-dashed border-b-2 border-b-gray-300 py-2">
          <div className="flex flex-col">
            <span>Họ tên: Nguyễn Văn A</span>
            <span>Số điện thoại: 0987654321</span>
            <span>Email:tanhungho2002@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketInformation;
