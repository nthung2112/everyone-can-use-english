# Câu hỏi thường gặp

## Nếu luôn báo lỗi mạng phải làm sao?

Khi đăng nhập mà báo lỗi `Network Error`, hoặc khi đánh giá phát âm hay dùng các chức năng khác mà gặp lỗi `connect ETIMEDOUT`, bạn hãy mở trình duyệt (không mở trong WeChat) và thử truy cập vào [https://enjoy.bot](https://enjoy.bot).

Nếu không mở được hoặc trang web chuyển hướng sang trang không liên quan, có nghĩa là mạng hiện tại của bạn không thể kết nối đến dịch vụ của Enjoy.

Bạn có thể làm theo các bước sau để khắc phục:

1. [Nâng cấp ứng dụng Enjoy](./install.md) lên phiên bản v0.3.2 trở lên;
2. Trong trang đăng nhập, nhấn `Cài đặt nâng cao` (nếu đã đăng nhập, vào `Cài đặt phần mềm`/`Cài đặt nâng cao`), thay đổi cấu hình API thành `https://api.getenjoyapp.com` rồi lưu lại.

Ứng dụng sẽ tự động tải lại và hoạt động bình thường.

Cách khác là sử dụng dịch vụ proxy.

## Tại sao không tải được video YouTube?

Mạng trong nước không thể truy cập trực tiếp YouTube. Nếu bạn đã dùng proxy nhưng không cấu hình proxy toàn hệ thống, bạn có thể thiết lập trong phần Cài đặt phần mềm / Cài đặt nâng cao / Cài đặt proxy của Enjoy. Trong đó, `Địa chỉ proxy` lấy từ phần mềm proxy bạn sử dụng, ví dụ `http://localhost:7890`.

## Tại sao không thể chia sẻ bản ghi âm lên cộng đồng?

Trước khi chia sẻ, phần mềm cần tải bản ghi âm lên máy chủ lưu trữ tài nguyên. Việc không chia sẻ được phần lớn do mạng không kết nối được đến máy chủ này. Bạn có thể kiểm tra trạng thái kết nối tại phần Cài đặt phần mềm / Cài đặt nâng cao / Trạng thái mạng. Nếu không kết nối được, hãy dùng proxy toàn hệ thống hoặc cấu hình proxy trong phần Cài đặt phần mềm / Cài đặt nâng cao / Cài đặt proxy.

## Làm thế nào để dùng cùng một tài khoản trên nhiều thiết bị?

Phần lớn dữ liệu của Enjoy App được lưu trên máy tính của bạn, cụ thể trong thư mục có tên `EnjoyLibrary`.

Hiện Enjoy chưa hỗ trợ đồng bộ qua đám mây. Nếu muốn dùng trên nhiều thiết bị, bạn nên dùng dịch vụ lưu trữ đám mây để đồng bộ dữ liệu.

Ví dụ với Baidu Netdisk, bạn có thể làm như sau:

1. Thêm thư mục `/EnjoyLibrary` (xem [đường dẫn lưu kho tài nguyên](./settings.md#资源库保存路径)) vào danh sách đồng bộ của Baidu Netdisk;
2. Mỗi lần dùng xong Enjoy App, trước khi tắt máy, đảm bảo thư mục `/EnjoyLibrary` đã được đồng bộ hoàn tất;
3. Ở máy thứ hai, đồng bộ thư mục `/EnjoyLibrary` mới nhất từ đám mây về máy;
4. Đăng nhập cùng tài khoản Enjoy trên máy thứ hai để sử dụng;
5. Lặp lại các bước 2 đến 4.

Lưu ý, khi dùng đồng bộ qua đám mây, không nên đăng nhập cùng lúc trên nhiều thiết bị vì dễ gây xung đột dữ liệu.

## Làm sao chuyển sang dùng Enjoy AI?

Nếu ban đầu bạn dùng khóa OpenAI của riêng mình mà muốn chuyển sang Enjoy AI, làm theo:

- Vào Cài đặt phần mềm / Cài đặt cơ bản / Động cơ AI mặc định, nhấn nút `Sửa`, chọn `Enjoy AI` làm động cơ.

Lưu ý, với các hội thoại đã tạo trong Trợ lý thông minh, động cơ AI không thể thay đổi. Nếu muốn dùng động cơ mới, bạn cần tạo hội thoại mới sau khi chuyển đổi động cơ mặc định.

## Nếu vượt quá hạn mức sử dụng hàng ngày phải làm gì?

Người dùng mới của Enjoy sẽ được cấp tài khoản dùng thử với hạn mức miễn phí hàng ngày. Khi vượt quá hạn mức này, hệ thống sẽ báo lỗi.

Bạn chỉ cần nạp bất kỳ khoản tiền nào một lần để bỏ giới hạn này.

## Nếu tự dùng khóa OpenAI thì có cần nạp tiền không?

Rất nhiều tính năng của Enjoy dựa trên AI. Để thuận tiện, Enjoy mở dịch vụ EnjoyAI tích hợp nhiều nhà cung cấp mô hình phổ biến. Người dùng chỉ cần nạp tiền vào tài khoản Enjoy là có thể dùng.

Tuy nhiên, nếu bạn tùy chỉnh dùng nhà cung cấp và khóa riêng (ví dụ OpenAI riêng), Enjoy sẽ không thu phí từ bạn.

Lưu ý, chức năng đánh giá phát âm không do OpenAI cung cấp mà là tính năng có phí riêng của Enjoy, nên khi sử dụng phải đảm bảo tài khoản Enjoy có số dư.

## Tại sao dịch vụ chuyển giọng nói thành văn bản chạy trên máy không dùng được?

Enjoy tích hợp [whisper.cpp](https://github.com/ggerganov/whisper.cpp) làm dịch vụ chuyển giọng nói thành văn bản nội bộ. Nhưng vì vấn đề tương thích, một số máy cấu hình thấp hoặc hệ điều hành cũ không dùng được.

Nếu gặp trường hợp này, Enjoy cũng cung cấp dịch vụ chuyển giọng nói thành văn bản dựa trên đám mây, bạn có thể cấu hình trong [Cài đặt phần mềm](./settings#语音转文本服务), ưu tiên dùng Azure AI.

## Lỗi 403 Insufficient balance là gì?

Lỗi này cho thấy bạn đang dùng tính năng có phí của Enjoy nhưng tài khoản không còn số dư.

Nhiều tính năng của Enjoy sử dụng AI như [Trợ lý thông minh](./ai-assistant), dịch thuật thông minh, phân tích câu,... Nếu bạn cài đặt `OpenAI` làm động cơ AI mặc định trong [Cài đặt phần mềm](./settings#默认-ai-引擎), các tính năng này sử dụng khóa OpenAI của bạn, không trừ tiền trong Enjoy.

(Lưu ý, hội thoại trong Trợ lý thông minh không thể đổi động cơ AI sau khi tạo. Muốn chuyển đổi động cơ, bạn phải tạo hội thoại mới).

Riêng [đánh giá phát âm](./audios#发音评估) là tính năng có phí của Enjoy, không liên quan OpenAI, nên dù chọn động cơ AI nào, khi dùng sẽ trừ tiền trong tài khoản Enjoy.

Muốn nạp tiền, xem hướng dẫn tại [Nạp tiền](./settings#充值).

## Làm sao tải xuống file âm thanh, bản ghi?

Enjoy cung cấp tính năng tải xuống file âm thanh, video và bản ghi để bạn có thể sử dụng trên các thiết bị khác.