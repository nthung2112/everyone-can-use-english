# Các câu hỏi thường gặp

## Làm gì khi luôn báo lỗi mạng?

Nếu khi đăng nhập báo lỗi `Network Error`, đánh giá phát âm hoặc sử dụng các chức năng khác báo lỗi `connect ETIMEDOUT`, bạn có thể mở trình duyệt (không mở trong WeChat) và thử truy cập [https://enjoy.bot](https://enjoy.bot).

Nếu không thể mở trang, hoặc chuyển đến trang không liên quan, điều đó có nghĩa là mạng hiện tại của bạn không thể kết nối với dịch vụ Enjoy.

Có thể thực hiện các bước sau để giải quyết:

1. [Nâng cấp Enjoy App](./install.md) lên phiên bản v0.3.2 trở lên;
2. Trên trang đăng nhập, nhấp vào `Cài đặt nâng cao` (nếu đã đăng nhập, nhấp vào `Cài đặt phần mềm`/`Cài đặt nâng cao`), thay đổi cài đặt API, điền vào `https://api.getenjoyapp.com`, và nhấn lưu.

Phần mềm sẽ tự động tải lại sau khi cài đặt.

Một cách khác là sử dụng dịch vụ proxy.

## Làm thế nào để sử dụng cùng một tài khoản trên nhiều thiết bị?

Hầu hết dữ liệu của Enjoy App được lưu trữ tại địa phương (tức là trên ổ cứng máy tính của bạn), cụ thể là trong một thư mục có tên `EnjoyLibrary`.

Enjoy hiện tại không cung cấp dịch vụ đồng bộ hóa đám mây. Nếu bạn cần sử dụng Enjoy App trên nhiều thiết bị, nên sử dụng dịch vụ lưu trữ đám mây để đồng bộ hóa dữ liệu.

Lấy ví dụ từ Baidu Netdisk, bạn có thể tham khảo các bước sau:

1. Thêm thư mục `/EnjoyLirary` (tức là [đường dẫn lưu trữ tài nguyên](./settings.md#资源库保存路径)) vào danh sách đồng bộ của Baidu Netdisk;
2. Mỗi khi sử dụng xong Enjoy App, trước khi tắt máy, đảm bảo thư mục `/EnjoyLibrary` đã được đồng bộ hoàn tất;
3. Trên máy tính thứ hai, sử dụng dịch vụ lưu trữ đám mây để đồng bộ hóa trạng thái mới nhất của thư mục `/EnjoyLibrary`;
4. Trên máy tính thứ hai, đăng nhập bằng cùng một tài khoản Enjoy để sử dụng;
5. Lặp lại các bước 2~4.

Cần lưu ý rằng, khi sử dụng dịch vụ lưu trữ đám mây, không sử dụng cùng một tài khoản Enjoy trên nhiều thiết bị cùng lúc, điều này có thể gây ra xung đột dữ liệu.

## Làm gì khi vượt quá giới hạn sử dụng hàng ngày?

Người dùng mới của Enjoy sẽ tự động nhận một số tiền thưởng, giúp người dùng mới có thể trải nghiệm các dịch vụ trả phí của Enjoy mà không cần nạp tiền, nhưng có giới hạn số lần sử dụng hàng ngày, vượt quá sẽ báo lỗi.

Chỉ cần nạp tiền bất kỳ số tiền nào, bạn sẽ gỡ bỏ giới hạn này.

## Nếu có khóa OpenAI riêng, có cần nạp tiền không?

Nhiều chức năng của Enjoy App dựa trên AI. Để tiện cho người dùng, Enjoy cung cấp dịch vụ EnjoyAI, tích hợp các nhà cung cấp mô hình lớn và mô hình phổ biến hiện nay, người dùng chỉ cần nạp tiền vào Enjoy để sử dụng.

Tất nhiên, Enjoy cũng cho phép người dùng tùy chỉnh nhà cung cấp và khóa, trong trường hợp này, Enjoy sẽ không tính phí.

Tuy nhiên, chức năng đánh giá phát âm không phải là dịch vụ của OpenAI, mà là chức năng trả phí của Enjoy, phải đảm bảo tài khoản Enjoy có đủ số dư trước khi sử dụng.

## Tại sao dịch vụ chuyển đổi giọng nói thành văn bản tại địa phương không hoạt động?

Enjoy tích hợp [whisper.cpp](https://github.com/ggerganov/whisper.cpp) như dịch vụ chuyển đổi giọng nói thành văn bản (STT) tại địa phương, nhưng do vấn đề tương thích, một số máy cấu hình thấp hoặc hệ điều hành cũ không thể sử dụng.

Nếu bạn gặp phải tình trạng này, Enjoy cung cấp các dịch vụ STT đám mây khác, bạn có thể cấu hình trong [Cài đặt phần mềm](./settings#语音转文本服务). Khuyến nghị sử dụng Azure AI trước.

## 403 Insufficient balance

Khi gặp lỗi này, có nghĩa là bạn đang sử dụng các tính năng trả phí của Enjoy, nhưng số dư tài khoản không đủ.

Nhiều chức năng trong Enjoy được điều khiển bởi AI, chẳng hạn như [trợ lý thông minh](./ai-assistant), dịch thuật thông minh, phân tích câu, v.v. Nếu bạn đã cấu hình `OpenAI` làm AI mặc định trong [Cài đặt phần mềm](./settings#默认-ai-引擎), các chức năng này sẽ sử dụng thông tin OpenAI của bạn mà không liên quan đến phí của Enjoy.

(Cần lưu ý rằng, một khi cuộc trò chuyện với [trợ lý thông minh](./ai-assistant) đã được tạo, không thể thay đổi AI Engine. Nếu cần chuyển đổi, chẳng hạn từ Enjoy AI sang Open AI, bạn cần tạo một cuộc trò chuyện mới.)

Ngoài ra, [đánh giá phát âm](./audios#发音评估) là chức năng trả phí và không phải của OpenAI, nên dù chọn AI mặc định gì, việc sử dụng đánh giá phát âm vẫn sẽ trừ tiền trong tài khoản Enjoy.

Nếu cần nạp tiền, vui lòng tham khảo [Nạp tiền](./settings#充值).

## Làm thế nào để tải xuống âm thanh và ghi âm

Enjoy cung cấp tính năng tải xuống âm thanh, video, và ghi âm để bạn có thể sử dụng trên các thiết bị khác.
