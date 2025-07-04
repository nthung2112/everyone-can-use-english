# Cài đặt phần mềm

Enjoy chỉ cần đăng nhập là có thể sử dụng ngay, **không cần thiết lập phức tạp**. Tuy nhiên, bạn vẫn có thể tùy chỉnh một số cài đặt cá nhân theo nhu cầu.

Mở phần mềm Enjoy, nhấn vào biểu tượng bánh răng ở góc dưới thanh bên trái để mở mục `Cài đặt phần mềm`.

## Cài đặt cơ bản

### Ngôn ngữ mẹ đẻ

Vui lòng chọn ngôn ngữ mẹ đẻ của bạn, mặc định là `Tiếng Trung giản thể`.

Lưu ý, thiết lập này ảnh hưởng đến việc dịch và phân tích trong quá trình học, nhưng không thay đổi ngôn ngữ giao diện phần mềm.

### Ngôn ngữ học

Chọn ngôn ngữ bạn muốn học, mặc định là `English (United States)`.

### Dịch giọng nói thành văn bản (Speech-to-Text - STT)

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> Dịch giọng nói thành văn bản
:::

Dịch giọng nói thành văn bản (STT) là tính năng quan trọng trong Enjoy, đồng thời cũng là điều kiện tiên quyết cho [bài tập lặp lại theo giọng đọc](./audios.md#跟读音频).

Thiết lập này đặt giá trị mặc định, bạn vẫn có thể chọn dịch vụ khác khi dùng chức năng chuyển giọng nói thành văn bản.

<details>
<summary>
Dịch vụ cục bộ (whisper)
</summary>

Thiết lập mặc định là `cục bộ`, sử dụng mô-đun whisper tích hợp trong Enjoy, tận dụng hoàn toàn sức mạnh xử lý trên máy tính cá nhân để cung cấp dịch vụ STT, hoàn toàn miễn phí.

Enjoy chọn mặc định mô hình whisper `tiny.en`; nếu máy bạn cấu hình cao hơn, có thể chọn mô hình lớn hơn để tăng độ chính xác chuyển giọng nói thành văn bản.

::: tip Lựa chọn mô hình whisper
Lần đầu sử dụng, phần mềm sẽ tự động tải mô hình. Mô hình càng lớn thì thời gian tải càng lâu. Thông thường nên chọn mô hình từ `medium` trở xuống.

Về lý thuyết, mô hình càng lớn độ chính xác càng cao nhưng chạy chậm hơn, thậm chí không thể hoạt động trên máy cấu hình thấp.

Các mô hình kết thúc bằng `.en` hỗ trợ duy nhất tiếng Anh với độ chính xác cao hơn (ví dụ `base.en`), còn các mô hình không kết thúc `.en` hỗ trợ đa ngôn ngữ (ví dụ `base`).
:::

::: warning Kiểm tra dịch vụ whisper cục bộ
Một số máy hoặc hệ điều hành (như macOS 11) có thể do vấn đề tương thích hoặc nguyên nhân khác không chạy được dịch vụ whisper cục bộ. Nhấn nút `Kiểm tra` để kiểm tra trạng thái dịch vụ trên máy bạn. Nếu không hoạt động, có thể chuyển sang dịch vụ khác.
:::
</details>

<details>
<summary>
Azure AI STT
</summary>

Sử dụng API nhận dạng giọng nói của Microsoft Azure AI để cung cấp dịch vụ STT. Đây là **dịch vụ có phí**, mỗi lần sử dụng sẽ trừ tiền trong tài khoản Enjoy. Nếu số dư không đủ, bạn cần [nạp tiền](#充值) trước khi sử dụng tiếp.
</details>

<details>
<summary>
Cloudflare AI STT
</summary>

Sử dụng dịch vụ đám mây whisper của Cloudflare, hiện tại miễn phí. Thực tế thử nghiệm cho thấy với các đoạn âm ngắn, độ chính xác nhận dạng có thể khá thấp.
</details>

<details>
<summary>
OpenAI STT
</summary>

Dùng dịch vụ đám mây whisper của OpenAI, cần [cấu hình khóa API OpenAI riêng của bạn](#openai-配置).
</details>

### Dịch văn bản thành giọng nói (Text-to-Speech - TTS)

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> Dịch văn bản thành giọng nói
:::

TTS có thể tổng hợp văn bản thành giọng nói hỗ trợ cho bài tập lặp lại theo giọng đọc. Ngoài giá trị mặc định, bạn vẫn có thể chọn dịch vụ khác khi sử dụng TTS.

EnjoyAI cung cấp dịch vụ TTS của OpenAI và Azure, bạn chỉ cần chọn mô hình `azure/speech`. Azure TTS có nhiều lựa chọn giọng đọc phong phú hơn.

### AI engine mặc định

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> AI engine mặc định
:::

Enjoy cung cấp nhiều tính năng tiện lợi.

Mặc định là `Enjoy AI`, dịch vụ do Enjoy cung cấp, mỗi lần sử dụng sẽ trừ tiền trong tài khoản; nếu không đủ tiền, bạn cần [nạp tiền](#充值) để tiếp tục dùng. Enjoy AI tích hợp các mô hình phổ biến ngoài OpenAI, cho phép người dùng linh hoạt lựa chọn.

Nếu bạn có [khóa API OpenAI](#openai-配置), có thể chọn **AI engine mặc định** là `OpenAI`.

Ngoài ra, bạn có thể chọn các mô hình khác nhau cho từng dịch vụ cụ thể.

## Cài đặt từ điển

### Nhập từ điển

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt từ điển -> Nhập từ điển
:::

#### Nhập từ điển đã được Enjoy tối ưu

| Tên từ điển                                           | Ngôn ngữ     | Hỗ trợ phát âm | Tên file           | Dung lượng  |
|-----------------------------------------------------|--------------|----------------|--------------------|------------|
| Longman Dictionary of Contemporary English         | Anh-Anh / Anh-Trung | Có             | ldocd5.zip         | 1.63GB     |
| Collins COBUILD Advanced British EN-CN Dictionary  | Anh-Trung    | Không          | ccalecd.zip        | 13.879MB   |
| Collins COBUILD Advanced British English Learners Dictionary | Anh-Anh      | Có             | ccabeld.zip        | 485.6MB    |
| Oxford Dictionary of English                         | Anh-Anh      | Không          | oxford_en_mac.zip  | 33.6MB     |
| Korean English Dictionary                            | Hàn-Anh      | Không          | koen_mac.zip       | 52.1MB     |
| Japanese English Dictionary                          | Nhật-Anh     | Không          | jaen_mac.zip       | 39.8MB     |
| German English Dictionary                            | Đức-Anh      | Không          | deen_mac.zip       | 32.1MB     |
| Russian English Dictionary                           | Nga-Anh      | Không          | ruen_mac.zip       | 18.1MB     |

::: tip Tải từ điển
Tải từ đám mây: [Liên kết](https://pan.baidu.com/share/init?surl=zK-dHs40HpfYNUEdoYxZUw)
Mã giải nén: 7975
:::

Sau khi tải file từ điển dạng `zip`, nhấn nút `Nhập từ điển` để tiến hành nhập.

#### Nhập từ điển định dạng mdx

Từ điển mdx là các file dạng định dạng mdict.

Nếu bộ từ điển bạn tải chỉ có một file `.mdx`, có thể nhập trực tiếp. Nếu có nhiều file, nhập cả tất cả file `.mdx`, `.mdd`, `.js` v.v.

## Cài đặt nâng cao

### Cài đặt API

Cấu hình địa chỉ API của dịch vụ Enjoy. Mặc định là `https://enjoy.bot`.

### Cài đặt Proxy

Thiết lập dịch vụ proxy cho ứng dụng Enjoy.

### Trạng thái mạng

Kiểm tra trạng thái kết nối mạng giữa client Enjoy và server.

### Cấu hình OpenAI

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> OpenAI
:::

Cấu hình khóa API OpenAI, có thể đăng ký tại [trang chính thức](https://platform.openai.com/api-keys). Khóa này sẽ được sử dụng cho các dịch vụ như [chat](./chat.md).

- Khóa: Khóa API OpenAI
- Mô hình: Mô hình mặc định sử dụng
- Địa chỉ endpoint: Nếu dùng khóa chính thức, không cần điền; nếu dùng bên thứ ba, phải nhập theo thông tin nhà cung cấp.

::: warning Địa chỉ endpoint
Do OpenAI không hỗ trợ dịch vụ ở một số khu vực, một số người dùng phải sử dụng dịch vụ trung gian của bên thứ ba. Hãy chắc chắn điền đúng **địa chỉ endpoint**. Nếu có lỗi khi dùng, thử thêm `/v1` vào cuối địa chỉ.
:::

### Khôi phục cài đặt

Đăng xuất và khôi phục tất cả cài đặt của Enjoy về mặc định.

### Xóa toàn bộ

Đăng xuất và xóa sạch mọi dữ liệu cá nhân.

## Cài đặt tài khoản

### Đường dẫn lưu thư viện tài nguyên

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt cơ bản -> Đường dẫn lưu thư viện tài nguyên
:::

Enjoy thiết kế theo nguyên tắc **ưu tiên lưu trữ cục bộ**, hầu hết dữ liệu được lưu trong thư mục thư viện tài nguyên, tên là `EnjoyLibrary`, mặc định nằm trong thư mục `My Documents` (tức `Tài liệu của tôi`).

Khi sử dụng lâu, thư mục thư viện có thể tích tụ nhiều file cache lớn, chiếm dung lượng ổ đĩa. Bạn có thể đổi vị trí thư mục này, ví dụ từ ổ C sang ổ D có dung lượng lớn hơn.

Nếu đã có dữ liệu trước, bạn nên sao chép cả thư mục `EnjoyLibrary` sang vị trí mới rồi vào phần mềm nhấn `Thay đổi`, chọn vị trí thư mục mới và khởi động lại phần mềm để thay đổi được xác nhận.

::: tip Thư viện chứa những gì?
Mở thư mục `EnjoyLibrary`, bạn sẽ thấy cấu trúc thư mục như sau:

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

- `/2400xxxx/`: thư mục tên theo ID tài khoản Enjoy, chứa dữ liệu cá nhân bạn tạo
  - `/audios/`: các file âm thanh bạn thêm
  - `/speeches/`: các file giọng nói tạo từ TTS
  - `/videos/`: file video bạn thêm vào
  - `/recordings/`: file ghi âm
  - `/enjoy_database.sqlite`: file cơ sở dữ liệu cá nhân
- `/cache/`: các file cache phát sinh trong quá trình dùng, có thể xóa an toàn khi cần giải phóng dung lượng
- `/logs/`: lưu nhật ký hoạt động phần mềm, giúp hỗ trợ khắc phục sự cố
- `/waveforms/`: dữ liệu dạng sóng âm thanh và video đã giải mã để sử dụng nội bộ
- `/whisper/models/`: file mô hình của dịch vụ chuyển giọng nói thành văn bản whisper
:::

::: danger Bảo mật dữ liệu cá nhân
Thư mục `EnjoyLibrary/2400xxxx/` chứa dữ liệu cá nhân suốt quá trình bạn dùng Enjoy, vui lòng **không xóa hoặc chỉnh sửa** các file trong thư mục này nếu không muốn mất dữ liệu hoặc gây lỗi phần mềm.

Như đã nói, Enjoy ưu tiên lưu trữ cục bộ, gần như mọi dữ liệu đều không được tải lên máy chủ đám mây, bạn cần bảo quản dữ liệu này cẩn thận.
:::

### Tình trạng sử dụng ổ đĩa

Nhấn `Chi tiết` để xem dung lượng đang sử dụng của thư viện tài nguyên Enjoy.

Nhấn `Giải phóng ổ đĩa` để xoá hàng loạt các file ghi âm, giải phóng dung lượng.

### Nạp tiền

::: info Đường dẫn cài đặt
Cài đặt phần mềm -> Cài đặt tài khoản -> Số dư
:::

Enjoy cung cấp một số dịch vụ AI tính phí theo mức sử dụng, mỗi lần dùng sẽ trừ tiền vào số dư tài khoản. Khi số dư hết, dịch vụ sẽ tạm ngừng.

Nếu muốn tiếp tục dùng, hãy nhấn nút `Nạp tiền` để bổ sung tiền vào tài khoản.

::: danger Lưu ý trước khi nạp tiền
Sau khi nạp tiền thành công, số dư sẽ hiển thị trong tài khoản Enjoy, tiền này chỉ dùng để thanh toán dịch vụ tính phí của Enjoy, **không được hoàn lại** và **không thể rút ra**.

Vui lòng cân nhắc kỹ trước khi nạp, và nạp vừa đủ dùng.
:::

## Phím tắt

Danh sách các phím tắt có thể dùng trong ứng dụng Enjoy, bạn có thể nhấn vào mỗi phím để chỉnh sửa lại.

## Giao diện

Cho phép thay đổi chủ đề màu sắc và ngôn ngữ giao diện phần mềm.

## Giới thiệu

Thông tin phiên bản hiện tại và các liên kết cập nhật.