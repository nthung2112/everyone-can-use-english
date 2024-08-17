# Cài đặt Phần Mềm

Enjoy chỉ cần đăng nhập là có thể sử dụng ngay, **không cần cài đặt thêm**. Tuy nhiên, bạn vẫn có thể thực hiện các cài đặt cá nhân hóa theo nhu cầu.

Mở phần mềm Enjoy, nhấp vào nút bánh răng ở dưới cùng bên trái, để mở `Cài đặt phần mềm`.

## Cài đặt cơ bản

### Ngôn ngữ mẹ đẻ

Chọn ngôn ngữ mẹ đẻ của bạn, mặc định là `Tiếng Trung Giản thể`.

Lưu ý rằng cài đặt này liên quan đến nội dung dịch và phân tích trong quá trình học, không ảnh hưởng đến ngôn ngữ giao diện của phần mềm.

### Ngôn ngữ học tập

Chọn ngôn ngữ bạn muốn học, mặc định là `English(United States)`.

### Dịch vụ chuyển văn bản thành giọng nói

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> Dịch vụ chuyển văn bản thành giọng nói
:::

Dịch vụ chuyển văn bản thành giọng nói (STT, Speech to Text) là một trong những tính năng cốt lõi mà Enjoy cung cấp, và là điều kiện tiên quyết cho [luyện tập theo dõi](./audios.md#跟读音频).

Cài đặt ở đây là giá trị mặc định, trong khi chuyển văn bản thành giọng nói, bạn vẫn có thể chọn dịch vụ khác.

<details>
<summary>
Cục bộ (whisper)
</summary>

Cài đặt mặc định là `Cục bộ`, tức là sử dụng thành phần whisper tích hợp của Enjoy, hoàn toàn sử dụng sức mạnh tính toán của máy tính cục bộ để cung cấp dịch vụ STT, dịch vụ này hoàn toàn miễn phí.

Phần mềm Enjoy tích hợp mô hình whisper nhỏ nhất `tiny.en`, nếu cấu hình máy tính của bạn cao hơn, bạn có thể chọn mô hình lớn hơn để cải thiện độ chính xác của chuyển văn bản thành giọng nói. Nhấp vào nút `Mô hình`, chọn mô hình phù hợp trong cửa sổ bật lên để tải xuống và chọn tự động.

::: tip Về việc chọn mô hình whisper
Mô hình whisper tải xuống sẽ được lưu trong thư mục `/EnjoyLibrary/whisper/models/`. Nếu tải xuống tự động thất bại, bạn cũng có thể tải xuống [tại đây](https://hf-mirror.com/ggerganov/whisper.cpp) và đặt vào thư mục đó, sau đó chọn trong Enjoy.

Về lý thuyết, mô hình càng lớn thì độ chính xác của nhận diện càng cao, nhưng cũng chạy chậm hơn, thậm chí không thể chạy trên một số máy tính cấu hình thấp.

Các mô hình kết thúc bằng `.en` chỉ hỗ trợ tiếng Anh và có độ chính xác cao hơn, ví dụ như `base.en`; còn các mô hình không kết thúc bằng `.en` hỗ trợ nhiều ngôn ngữ, ví dụ như `base`.
:::

::: warning Kiểm tra dịch vụ whisper cục bộ
Một số máy tính hoặc hệ điều hành (như macOS 11) có thể gặp vấn đề về tương thích (hoặc vấn đề không rõ) khiến dịch vụ whisper cục bộ không hoạt động. Nhấp vào nút `Kiểm tra` để kiểm tra xem dịch vụ whisper có hoạt động bình thường trên máy tính của bạn không. Nếu có thông báo không hoạt động, bạn có thể chọn dịch vụ khác.
:::

</details>

<details>
<summary>
Azure AI STT
</summary>

Sử dụng dịch vụ API nhận diện giọng nói của Microsoft Azure AI để cung cấp STT, dịch vụ này là **dịch vụ tính phí**, mỗi lần sử dụng sẽ bị trừ vào số dư tài khoản Enjoy, nếu số dư không đủ, bạn cần [nạp tiền](#充值) để tiếp tục sử dụng.

</details>

<details>
<summary>
Cloudflare AI STT
</summary>

Sử dụng dịch vụ cloud của whisper do Cloudflare cung cấp, dịch vụ này hiện miễn phí. Theo thực nghiệm, đối với một số âm thanh có thời gian ngắn, nhận diện có thể bị sai sót lớn.

</details>

<details>
<summary>
OpenAI STT
</summary>

Sử dụng dịch vụ cloud của OpenAI để cung cấp whisper, dịch vụ này yêu cầu [cấu hình khóa OpenAI của bạn](#openai-配置).

</details>

### AI Engine Mặc định

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> AI Engine Mặc định
:::

Enjoy cung cấp nhiều tính năng tiện ích, như [trích xuất từ khóa](./webpage#提取关键词汇), [tra từ](./webpage#查单词), đánh dấu phiên âm, tất cả đều sử dụng dịch vụ AI để thực hiện.

Giá trị mặc định là `Enjoy AI`, do Enjoy cung cấp dịch vụ này, mỗi lần sử dụng sẽ bị trừ vào số dư tài khoản, nếu số dư không đủ, bạn cần [nạp tiền](#充值) để tiếp tục sử dụng. EnjoyAI cung cấp các mô hình phổ biến hiện nay ngoài OpenAI, người dùng có thể chọn linh hoạt.

Nếu bạn có [khóa OpenAI](#openai-配置) khả dụng, bạn cũng có thể chọn **AI Engine Mặc định** là `OpenAI`.

Trong mô hình mặc định, bạn cũng có thể chọn mô hình khác cho các dịch vụ khác nhau.

### Cấu hình OpenAI

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> OpenAI
:::

Cấu hình khóa API OpenAI, có thể yêu cầu tại [trang web](https://platform.openai.com/api-keys). Dịch vụ OpenAI đã cấu hình có thể được sử dụng trong [trợ lý AI](./ai-assistant.md), [trích xuất từ khóa](./webpage#提取关键词汇), [tra từ](./webpage#查单词), đánh dấu phiên âm và các dịch vụ khác.

- Khóa: Khóa API OpenAI
- Mô hình: Mô hình sử dụng mặc định
- Địa chỉ API: Nếu sử dụng khóa chính thức, không cần điền; nếu không, hãy điền theo thông tin của nhà cung cấp khóa.

::: warning Địa chỉ API
Do OpenAI không cung cấp dịch vụ ở một số khu vực, một số người dùng sử dụng dịch vụ trung chuyển của bên thứ ba. Hãy chắc chắn điền **Địa chỉ API** theo thông tin của nhà cung cấp dịch vụ. Nếu có lỗi khi sử dụng, có thể cần thêm `/v1` vào cuối địa chỉ API.
:::

## Cài đặt nâng cao

### Cài đặt API

Cài đặt địa chỉ API của dịch vụ Enjoy. Mặc định là `https://enjoy.bot`.

### Cài đặt Proxy

Cài đặt dịch vụ proxy cho ứng dụng Enjoy.

### Đặt lại cài đặt

Đăng xuất và đặt lại tất cả cài đặt của ứng dụng Enjoy về giá trị mặc định.

### Đặt lại tất cả

Đăng xuất và xóa tất cả dữ liệu cá nhân.

## Cài đặt tài khoản

### Đường dẫn lưu trữ tài nguyên

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> Đường dẫn lưu trữ tài nguyên
:::

Enjoy áp dụng nguyên tắc **ưu tiên cục bộ**, hầu hết dữ liệu đều được lưu trữ cục bộ, tức là trong **đường dẫn lưu trữ tài nguyên**.
Kho tài nguyên là một thư mục có tên `EnjoyLibrary`, mặc định đặt trong `My Documents` (tức là `Tài liệu của tôi`).

Khi thời gian sử dụng Enjoy kéo dài, thư mục kho tài nguyên có thể tạo ra các tệp cache lớn, gây tốn nhiều dung lượng. Theo nhu cầu cụ thể, bạn cũng có thể thay đổi đường dẫn kho tài nguyên, ví dụ từ _C ổ đĩa_ sang _D ổ đĩa_ lớn hơn.

Nếu đã có dữ liệu, khi thay đổi, bạn có thể sao chép thư mục `EnjoyLibrary` cũ sang đường dẫn mục tiêu, sau đó nhấp vào nút `Sửa` trong phần mềm Enjoy, chọn đường dẫn mục tiêu và khởi động lại phần mềm để hoàn tất thay đổi.

::: tip Kho tài nguyên chứa gì
Mở thư mục `EnjoyLibrary`, bạn sẽ thấy cấu trúc thư mục như sau

```
.
├── 2400xxxx
│   ├── audios
│   │   ├── 0687ae31c4178bbf0466503e56d887f8.mp3
│   │   └── ...
│   ├── enjoy_database.sqlite
│   ├── recordings
│   │   ├── 025542894635903d5ea6f2395cb404c0.wav
│   │   └── ...
│   ├── speeches
│   │   ├── 0687ae31c4178bbf0466503e56d887f8.mp3
│   │   └── ...
│   └── videos
│       ├── 23876d46305bae2e049c691872dd3cde.mkv
│       └── ...
├── cache
│   ├── 0687ae31c4178bbf0466503e56d887f8.json
│   └── ...
├── logs
│   ├── main.log
│   └── main.old.log
├── waveforms
│   ├── 0687ae31c4178bbf0466503e56d887f8.waveform.json
│   └── ...
└── whisper
│   ├── models
│   │   ├── tiny.en.bin
│   │   └── ...
```

- `/2400xxxx/`: ID tài khoản Enjoy đã đăng nhập, dữ liệu dưới thư mục này đều là dữ liệu cá nhân bạn tạo ra khi sử dụng
  - `/2400xxxx/audios/`: Tệp âm thanh đã thêm
  - `/2400xxxx/speeches/`: Tệp giọng nói do TTS tạo ra
  - `/2400xxxx/videos/`: Tệp video đã thêm
  - `/2400xxxx/recordings/`: Tệp ghi âm
  - `/2400xxxx/enjoy_database.sqlite`: Tệp cơ sở dữ liệu cá nhân
- `/cache/`: Tệp cache được tạo ra trong quá trình sử dụng, nếu chiếm quá nhiều dung lượng, có thể xóa một cách an toàn
- `/logs/`: Lưu trữ nhật ký hoạt động của phần mềm, giúp nhà phát triển khắc phục sự cố
- `/waveforms/`: Cache dữ liệu sóng âm thanh sau khi giải mã
- `/whisper/models`: Tệp mô hình của dịch vụ chuyển văn bản thành giọng nói whisper

:::

::: danger An toàn dữ liệu cá nhân
Dữ liệu lưu trữ trong thư mục `EnjoyLibrary/2400xxxx/` đều là dữ liệu cá nhân tạo ra khi sử dụng Enjoy, **không nên xóa hoặc chỉnh sửa** bất kỳ tệp nào trong thư mục đó, nếu không có thể dẫn đến mất dữ liệu hoặc phần mềm Enjoy không hoạt động bình thường.

Như đã đề cập trước đó, Enjoy áp dụng nguyên tắc ưu tiên cục bộ, hầu hết dữ liệu không được tải lên máy chủ đám mây, xin hãy bảo quản dữ liệu cá nhân của bạn một cách cẩn thận.
:::

### Nạp tiền

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt tài khoản -> Số dư
:::

Enjoy cung cấp một số dịch vụ AI tính phí, đều là **tính phí theo mức sử dụng**, mỗi lần sử dụng sẽ trừ vào số dư, khi số dư không đủ, dịch vụ sẽ dừng lại.

Nếu muốn tiếp tục sử dụng, vui lòng nhấp vào nút `Nạp tiền` để nạp thêm.

::: danger Lưu ý trước khi nạp tiền
Cần lưu ý rằng sau khi nạp tiền thành công, số dư sẽ được phản ánh trong tài khoản Enjoy, tất cả số dư chỉ có thể được sử dụng để thanh toán dịch vụ tính phí của Enjoy, **không hỗ trợ hoàn tiền**, **không hỗ trợ rút tiền**.

Hãy cân nhắc cẩn thận trước khi nạp tiền.
:::

## Phím tắt

Các phím tắt có thể sử dụng trong ứng dụng Enjoy, nhấp vào phím để thay đổi.

## Giao diện

Có thể thay đổi chủ đề và ngôn ngữ giao diện.

## Về

Phiên bản hiện tại và liên kết cập nhật.
