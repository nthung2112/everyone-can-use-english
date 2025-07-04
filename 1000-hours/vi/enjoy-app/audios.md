# Tài nguyên âm thanh

Sử dụng tài nguyên âm thanh và video để luyện đọc theo là một trong những tính năng cốt lõi của Enjoy.

## Thêm tài nguyên âm thanh

Enjoy hỗ trợ thêm tài nguyên âm thanh từ máy tính và từ nguồn trực tuyến. Tại trang âm thanh, nhấn `Thêm tài nguyên`, trong cửa sổ bật lên, nhập địa chỉ URL hoặc nhấn `Tệp cục bộ` để chọn tệp âm thanh trên máy tính của bạn để thêm vào.

Nếu là tài nguyên trực tuyến, Enjoy sẽ tải tệp về thư mục tải xuống mặc định (ví dụ như `Downdoads` hoặc `My Downloads`), sau đó tự động thêm vào [Kho tài nguyên](./settings#资源库保存路径).

## Luyện đọc theo âm thanh

Sau khi thêm thành công, hệ thống sẽ tự động chuyển sang trang phát âm thanh.

Khi mở, cần phân tích dữ liệu sóng âm thanh (và tạo biểu đồ cao độ - Pitch contour) cùng tạo phụ đề âm thanh (sử dụng [dịch vụ chuyển giọng nói thành văn bản](./settings#语音转文本服务)). Lần mở đầu tiên có thể mất chút thời gian chờ đợi. Khi dữ liệu đã được tạo xong, những lần mở tiếp theo sẽ nhanh hơn.

::: tip Làm sao nếu bị kẹt ở trang tải?
Khi mở trang âm thanh, hệ thống sẽ thực hiện theo các bước sau để tải:

1. Phân tích dữ liệu sóng âm thanh
2. Chuyển giọng nói thành văn bản

Nếu bị kẹt lâu ở bước đầu tiên, có thể do tệp âm thanh quá lớn (đặc biệt là độ dài âm thanh) khiến việc tải mất nhiều thời gian hoặc thậm chí thất bại. Nếu không phải do kích thước tệp, có thể có lỗi khác, vui lòng liên hệ nhà phát triển.

Nếu bước thứ hai chuyển giọng nói thành văn bản thất bại, hãy kiểm tra xem bạn có đang sử dụng thành phần whisper cục bộ để chuyển đổi không. Trên một số máy tính, do vấn đề tương thích hoặc lỗi chưa rõ, việc này có thể không hoạt động. Trong trường hợp này, hãy chuyển sang dùng dịch vụ chuyển đổi giọng nói thành văn bản đám mây khác trong [cài đặt dịch vụ chuyển giọng nói thành văn bản](./settings#语音转文本服务).
:::

## Phát âm thanh

Nhấn nút phát (hoặc phím tắt <kbd>Space</kbd>) để bắt đầu hoặc tạm dừng âm thanh.

Enjoy sẽ tự động chia âm thanh thành từng câu, chế độ phát mặc định là “phát từng câu” để bạn có thể nghe và luyện tập từng câu một cách lặp đi lặp lại.

Các chế độ phát khác có thể chọn bao gồm:

- Lặp lại từng câu
- Phát tất cả

## Cắt câu thông minh

Enjoy dựa trên các khoảng dừng tự nhiên và dấu câu trong âm thanh gốc để chia câu hiện tại thành các đoạn nhỏ, giúp bạn luyện tập từng đoạn một cách dễ dàng.

Bạn cũng có thể chọn từ hoặc cụm từ trong câu hiện tại bằng cách nhấn vào từ đó (hoặc nhấn giữ <kbd>Shift</kbd> để chọn nhiều từ) để luyện nghe và nói.

## Thu âm

Enjoy chia tách âm thanh theo từng câu, người dùng luyện đọc theo từng câu một. Khi câu âm thanh đang được kích hoạt, nhấn nút thu âm màu đỏ (hoặc phím tắt <kbd>r</kbd>) để bắt đầu thu âm, bạn có thể bắt chước cách đọc câu trong âm thanh để luyện tập.

![音频播放页面](/images/enjoy/audio-page.png)
_\* 音频播放页面_

::: Mẹo: Quyền truy cập micro
Khi sử dụng tính năng ghi âm lần đầu trên máy Mac, hệ thống sẽ hiển thị hộp thoại yêu cầu quyền truy cập micro. Vui lòng đảm bảo bạn chọn "Cho phép" để có thể sử dụng tính năng ghi âm. :::

## So sánh bản ghi âm

So sánh biểu đồ cao độ (Pitch contour) của bản ghi âm với âm thanh gốc để tự điều chỉnh phát âm. Khi ở chế độ so sánh, nhấn nút phát sẽ cùng lúc phát cả bản ghi âm và âm thanh gốc.

![录音对比](/images/enjoy/recording-comparing.png)
_\* 录音于原音对比_

## Đánh giá phát âm

Enjoy tích hợp chức năng đánh giá phát âm của Microsoft Azure làm tài liệu tham khảo cho việc tự kiểm tra phát âm.

Chức năng này sẽ sử dụng **nội dung văn bản của câu nói trong quá trình ghi âm làm cơ sở tham khảo** để đánh giá chất lượng phát âm, chi tiết về các chỉ số có thể tham khảo từ Microsoft. [官方文档](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment?pivots=programming-language-javascript#scripted-assessment-results)。

![发音评估示例](/images/enjoy/pronouce-assessment.png)
_\* 发音评估示例_

::: warning Lời khuyên khi sử dụng đánh giá phát âm
Tính năng này là tính năng trả phí, mỗi lần sử dụng sẽ trừ tiền trực tiếp vào số dư tài khoản Enjoy của bạn. Nếu số dư không đủ, bạn cần [nạp tiền](./settings#充值) trước khi có thể tiếp tục sử dụng.

Lưu ý rằng đánh giá phát âm chủ yếu tập trung vào việc phát âm từ có chính xác hay không, không đánh giá được độ chính xác của các biến đổi cao độ.
:::

## Chỉnh sửa thông tin âm thanh

Tại phía trên trang âm thanh, chuyển sang chế độ danh sách, bạn có thể thực hiện các thao tác chỉnh sửa âm thanh như sửa tiêu đề, thêm mô tả hoặc xóa âm thanh.