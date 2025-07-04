# Trò Chuyện Với Agent

## Tạo Agent Mới

Tại trang `Chat`, phía trên bên phải thanh bên trái, nhấn nút `+` để mở hộp thoại thêm agent mới.

Hiện tại, Enjoy hỗ trợ hai loại agent:

- GPT
- TTS

Agent GPT có thể đóng vai các nhân vật khác nhau qua việc thiết lập prompt, thực hiện đối thoại bằng văn bản với người dùng.

Agent TTS có thể chuyển văn bản nhập vào thành giọng nói, hỗ trợ thiết lập ngôn ngữ và giọng đọc khác nhau.


### Agent GPT

Khi chọn loại GPT, Enjoy cung cấp sẵn một số mẫu prompt, bạn có thể chọn từ mục `Mẫu`.

![chat-gpt-select-template](/images/enjoy/chat-gpt-select-template.png)

Sau khi chọn bất kỳ mẫu nào, tên agent, mô tả và prompt sẽ được điền tự động, bạn cũng có thể chỉnh sửa theo nhu cầu cụ thể.

Nhấn nút `Lưu`, agent sẽ được tạo thành công.

### Agent TTS

Khi chọn loại TTS, ngoài tên và mô tả, bạn cần cấu hình thêm cho TTS:

- Công cụ giọng nói: Nếu muốn dùng khóa OpenAI của riêng bạn, chọn `OpenAI`, nếu không thì chọn `EnjoyAI`.
- Mẫu giọng nói: Khi dùng `EnjoyAI`, hỗ trợ hai mẫu của OpenAI và `Azure/Speech`, trong đó `Azure/Speech` hỗ trợ nhiều ngôn ngữ và giọng địa phương hơn.
- Ngôn ngữ TTS: Chỉ có hiệu lực với `Azure/Speech`, hỗ trợ đa dạng ngôn ngữ và giọng địa phương.
- Giọng đọc: Khi dùng `Azure/Speech`, mỗi ngôn ngữ có thể có nhiều giọng đọc khác nhau, bạn chỉ cần chọn phù hợp.

![chat-tts-config](/images/enjoy/chat-tts-agent.png)

Nhấn nút `Lưu`, agent sẽ được tạo thành công.

## Tạo Cuộc Trò Chuyện Mới

Chọn bất kỳ agent nào, nhấn nút `Cuộc Trò Chuyện Mới` bên dưới thanh bên trái để bắt đầu đối thoại.

Agent GPT sẽ trả lời **mọi câu hỏi** của người dùng dựa trên **cài đặt prompt**.

![chat-new-chat-gpt](/images/enjoy/chat-new-chat-gpt.png)

Công nghệ TTS sẽ chuyển đổi bất kỳ văn bản nào được người dùng nhập vào thành giọng nói.

![chat-new-chat-tts](/images/enjoy/chat-new-chat-tts.png)

## Cài đặt trò chuyện

Bạn có thể điều chỉnh các cài đặt chi tiết cho cuộc trò chuyện và các thành viên tham gia cuộc trò chuyện hiện tại bằng cách nhấp vào biểu tượng bánh răng ở góc trên bên phải.

![chat-settings](/images/enjoy/chat-settings.png)

::: info Lưu ý.

Trong cài đặt trò chuyện, bạn có thể thiết lập “Hướng dẫn bổ sung”, những hướng dẫn này sẽ được tất cả các tác nhân trí tuệ trong cuộc trò chuyện chia sẻ, đóng vai trò là “SYSTEM PRMOPT” bổ sung cho các thành viên tham gia.

Ví dụ, nếu bạn muốn giới hạn chủ đề của cuộc trò chuyện, bạn có thể thực hiện điều đó thông qua “Hướng dẫn bổ sung”.

:::

## Cài đặt thành viên trò chuyện

Khi một thực thể thông minh được thêm vào một trò chuyện mới, bạn có thể tùy chỉnh các cài đặt chi tiết cho nó. Các cài đặt LLM mặc định là “Mô hình AI mặc định” trong phần “Cài đặt phần mềm”, và các cài đặt TTS mặc định là “Mô hình TTS mặc định” trong cùng phần đó.

![chat-member-settings](/images/enjoy/chat-member-settings.png)

::: info Gợi ý

Trong phần cài đặt thành viên trò chuyện, bạn có thể thiết lập `Gợi ý bổ sung`, tương tự như `Gợi ý bổ sung` trong cài đặt trò chuyện, nhưng gợi ý này chỉ có hiệu lực với agent hiện tại.

Ví dụ, khi nhiều agent đang tranh luận trong cuộc trò chuyện, bạn muốn agent hiện tại giữ quan điểm cụ thể trong cuộc trò chuyện này, có thể thiết lập qua `Gợi ý bổ sung` của thành viên trò chuyện.

Trong `Xem trước gợi ý`, bạn có thể xem trực tiếp `SYSTEM PROMPT` hoàn chỉnh của agent hiện tại trong cuộc trò chuyện, lần lượt bao gồm **Gợi ý bổ sung của cuộc trò chuyện**, **gợi ý của chính agent** và **gợi ý bổ sung với tư cách thành viên cuộc trò chuyện**.

:::

## Nhập liệu bằng giọng nói

Trong cuộc trò chuyện, nhấn vào biểu tượng micro bên trái ô nhập liệu để kích hoạt nhập liệu bằng giọng nói.

Sau khi thu âm, Enjoy sẽ sử dụng dịch vụ STT đã cấu hình để chuyển âm thanh thành văn bản. Tin nhắn sẽ không được gửi tự động mà ở trạng thái chỉnh sửa.

Nếu văn bản nhận diện không chính xác, bạn có thể chỉnh sửa thủ công; nếu thu âm chưa ưng ý, có thể thu lại. Nếu không hài lòng với cách diễn đạt, bạn có thể nhấn `Chỉnh sửa, làm mượt` để AI đề xuất chỉnh sửa, rồi thu âm lại.

![chat-refine](/images/enjoy/chat-refine.png)

Khi mọi thứ đã được xác nhận chính xác, bạn có thể nhấn nút `Gửi` để gửi tin nhắn và chờ phản hồi từ AI.

## Gợi ý Trò chuyện

Nếu bạn muốn luyện tập giao tiếp với AI, trong `Cài đặt trò chuyện` có thể bật `Kích hoạt trợ lý trò chuyện`. Khi đó, bên phải ô nhập liệu sẽ xuất hiện biểu tượng cây đũa phép; nhấn vào đó, AI sẽ dựa trên lịch sử cuộc trò chuyện hiện tại để đưa ra gợi ý đối thoại.

![chat-suggest](/images/enjoy/chat-suggest.png)
