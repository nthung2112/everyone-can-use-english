# Tài nguyên âm thanh

Việc sử dụng tài nguyên âm thanh và video để luyện nghe là một trong những chức năng chính của Enjoy.

## Thêm tài nguyên âm thanh

Enjoy hỗ trợ thêm tài nguyên âm thanh từ máy tính cục bộ và từ trực tuyến. Trên trang âm thanh, nhấp vào `Thêm tài nguyên`, nhập URL trong cửa sổ pop-up, hoặc nhấp vào `Tệp cục bộ` để chọn tệp âm thanh từ máy tính của bạn để thêm vào.

Nếu là tài nguyên trực tuyến, Enjoy sẽ tải tệp xuống thư mục tải xuống mặc định (tức là `Downloads` hoặc `Tải xuống của tôi`), sau đó tự động thêm vào [Thư viện tài nguyên](./settings#资源库保存路径).

## Luyện nghe âm thanh

Sau khi thêm thành công, hệ thống sẽ tự động chuyển đến trang phát âm thanh.

Khi mở lần đầu tiên, cần phải phân tích dữ liệu sóng âm thanh (và tạo Pitch contour) và tạo phụ đề âm thanh (sử dụng [Dịch vụ chuyển giọng nói thành văn bản](./settings#语音转文本服务)). Việc tạo dữ liệu có thể mất một thời gian. Sau khi dữ liệu được tạo thành công, tốc độ mở lại sẽ nhanh hơn.

::: tip Làm gì nếu bị kẹt ở trang tải?
Khi mở trang âm thanh, quy trình tải sẽ được thực hiện theo các bước sau:

1. Phân tích dữ liệu sóng âm thanh
2. Chuyển giọng nói thành văn bản

Nếu bị kẹt lâu ở bước đầu tiên, có thể là do kích thước âm thanh quá lớn (chủ yếu liên quan đến thời gian của âm thanh) khiến thời gian tải quá lâu, thậm chí thất bại. Nếu không phải do kích thước âm thanh, có thể có lỗi khác, vui lòng liên hệ với nhà phát triển.

Nếu bước hai chuyển giọng nói thành văn bản thất bại, hãy kiểm tra xem bạn có đang sử dụng mô-đun whisper cục bộ cho chuyển giọng nói thành văn bản không, vì có thể vì vấn đề tương thích và lỗi không xác định trên một số máy tính. Nếu gặp vấn đề này, vui lòng chọn dịch vụ chuyển giọng nói thành văn bản khác trong [Cài đặt dịch vụ chuyển giọng nói thành văn bản](./settings#语音转文本服务).
:::

## Phát

Nhấp vào nút phát (hoặc phím tắt <kbd>Space</kbd>) để phát hoặc tạm dừng âm thanh.

Enjoy sẽ cắt âm thanh theo câu, chế độ phát mặc định là "Phát từng câu" để nghe và luyện tập từng câu.

Các chế độ phát khác bao gồm:

- Lặp lại từng câu
- Phát tất cả

## Ngắt câu thông minh

Enjoy phân chia câu hiện tại thành nhiều đoạn dựa trên điểm dừng của âm thanh và dấu câu, để luyện tập từng phần.

Bạn cũng có thể nhấp vào bất kỳ từ ngữ nào trong câu hiện tại (hoặc nhấn <kbd>Shift</kbd> để chọn nhiều từ) để chọn từ hoặc cụm từ để luyện nghe.

## Ghi âm

Enjoy sẽ cắt âm thanh theo câu, người dùng luyện tập đọc theo từng câu. Nhấp vào nút ghi âm đỏ (hoặc phím tắt <kbd>r</kbd>) dưới câu âm thanh đang hoạt động để bắt đầu ghi âm, người dùng có thể bắt chước âm thanh để đọc câu hiện tại như một bài luyện tập.

![Trang phát âm thanh](/images/enjoy/audio-page.png)
_\* Trang phát âm thanh_

::: tip Quyền ghi âm
Trên máy Mac, khi lần đầu tiên sử dụng chức năng ghi âm, hệ thống sẽ yêu cầu quyền sử dụng micrô. Hãy chắc chắn nhấn cho phép, nếu không sẽ không thể sử dụng chức năng ghi âm.
:::

## So sánh ghi âm

So sánh Pitch contour của ghi âm với âm thanh gốc để tự chỉnh sửa phát âm. Trong chế độ so sánh, nhấn nút phát sẽ đồng thời phát ghi âm và âm thanh gốc.

![So sánh ghi âm](/images/enjoy/recording-comparing.png)
_\* So sánh ghi âm với âm thanh gốc_

## Đánh giá phát âm

Enjoy tích hợp chức năng đánh giá phát âm của Microsoft Azure như một tham khảo cho việc tự kiểm tra phát âm.

Chức năng này sử dụng **văn bản câu trong khi ghi âm** làm tham khảo để đánh giá tình trạng phát âm của ghi âm. Chi tiết các chỉ số có thể tham khảo [tài liệu chính thức của Microsoft](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment?pivots=programming-language-javascript#scripted-assessment-results).

![Ví dụ đánh giá phát âm](/images/enjoy/pronouce-assessment.png)
_\* Ví dụ đánh giá phát âm_

::: warning Đề xuất sử dụng chức năng đánh giá phát âm
Chức năng này là dịch vụ trả phí, mỗi lần sử dụng sẽ trừ tiền trong tài khoản Enjoy. Nếu số dư không đủ, cần phải [nạp tiền](./settings#充值) để tiếp tục sử dụng.

Lưu ý rằng đánh giá phát âm tập trung vào việc phát âm từ có chính xác hay không, không đánh giá sự thay đổi âm điệu.
:::

## Chỉnh sửa thông tin âm thanh

Trên trang âm thanh, chuyển sang chế độ danh sách để thực hiện các thao tác chỉnh sửa âm thanh, chẳng hạn như chỉnh sửa tiêu đề âm thanh, thêm mô tả và xóa âm thanh.
