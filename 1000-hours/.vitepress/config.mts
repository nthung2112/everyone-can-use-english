import { defineConfig } from 'vitepress';
import { withMermaid } from 'vitepress-plugin-mermaid';
import footnote from 'markdown-it-footnote';
import sup from 'markdown-it-sup';
import sub from 'markdown-it-sub';
import mark from 'markdown-it-mark';
import ins from 'markdown-it-ins';

// import markdownit from 'markdown-it'

export default withMermaid(
  // https://vitepress.dev/reference/site-config
  defineConfig({
    title: '1000 Hour',
    description: 'Fill 1000 hours of focus and you can develop any skill you need...',
    head: [
      ['link', { rel: 'icon', href: '/everyone-can-use-english/images/clock.svg' }],
      [
        'script',
        {
          defer: '',
          src: 'https://cloud.umami.is/script.js',
          ['data-website-id']: '4f5b6184-aae6-41f8-aa7c-8d2062247c76',
        },
      ],
    ],
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Enjoy App', link: '/enjoy-app/', activeMatch: '/enjoy-app/' },
      ],

      search: {
        // provider: 'local'
        provider: 'algolia',
        options: {
          appId: 'KKK8CORNSR',
          apiKey: 'd613ff31a535ff1e9535cf9c88ec420a',
          indexName: '1000h',
        },
      },

      sidebar: {
        '/': [
          {
            text: 'Mô tả ngắn gọn',
            collapsed: true,
            link: '/intro',
            items: [
              { text: '1. Bạn có muốn luyện tập trí não của bạn?', link: '/why' },
              { text: '2. Điều gì là tốt nhất cho bộ não của bạn?', link: '/what' },
            ],
          },
          {
            text: 'Nhiệm vụ huấn luyện',
            collapsed: true,
            items: [
              { text: '1. Bắt đầu nhiệm vụ', link: '/training-tasks/kick-off' },
              { text: '2. Phương pháp huấn luyện', link: '/training-tasks/procedures' },
              {
                text: '3. Trí tuệ nhân tạo',
                collapsed: false,
                link: '/training-tasks/ai',
                items: [
                  {
                    text: '3.1. Kỹ năng ngôn ngữ cơ bản',
                    link: '/training-tasks/language',
                  },
                  {
                    text: '3.2. Thế lưỡng nan của người lớn',
                    link: '/training-tasks/predicaments',
                  },
                  {
                    text: '3.3. Hỗ trợ trí tuệ nhân tạo',
                    link: '/training-tasks/revolution',
                  },
                  { text: '3.4 Nhiệm vụ không khó', link: '/training-tasks/ground' },
                  { text: '3.5 Hiệu quả thật tuyệt vời', link: '/training-tasks/wonder' },
                ],
              },
              { text: '4. Bất ngờ', link: '/training-tasks/surprise' },
            ],
          },
          {
            text: 'Định hình giọng nói',
            link: '/sounds-of-american-english/1-basics',
            collapsed: true,
            items: [
              {
                text: '1. Cơ sở',
                collapsed: true,
                link: '/sounds-of-american-english/1-basics',
                items: [
                  {
                    text: '1.1. Chữ cái',
                    link: '/sounds-of-american-english/1.1-alphabet',
                  },
                  {
                    text: '1.2. Đơn âm',
                    link: '/sounds-of-american-english/1.2-phonemes',
                  },
                  {
                    text: '1.3. Giọng nói',
                    link: '/sounds-of-american-english/1.3-accents',
                  },
                  {
                    text: '1.4. Phát âm',
                    link: '/sounds-of-american-english/1.4-articulators',
                  },
                ],
              },
              {
                text: '2. Giải thích chi tiết',
                collapsed: true,
                link: '/sounds-of-american-english/2-details',
                items: [
                  {
                    text: '2.1. Nguyên âm',
                    collapsed: true,
                    link: '/sounds-of-american-english/2.1-vowels',
                    items: [
                      {
                        text: '2.1.1. Miệng',
                        link: '/sounds-of-american-english/2.1.1-lips',
                      },
                      {
                        text: '2.1.2. Vị trí lưỡi',
                        link: '/sounds-of-american-english/2.1.2-tongue',
                      },
                      {
                        text: '2.1.3. ʌ/ɑː/ɑːr',
                        link: '/sounds-of-american-english/2.1.3-ʌ',
                      },
                      {
                        text: '2.1.4. e/æ',
                        link: '/sounds-of-american-english/2.1.4-e',
                      },
                      {
                        text: '2.1.5. ə/ɚ/ɝː',
                        link: '/sounds-of-american-english/2.1.5-ə',
                      },
                      {
                        text: '2.1.6. ɪ/i/iː',
                        link: '/sounds-of-american-english/2.1.6-i',
                      },
                      {
                        text: '2.1.7. ʊ/u/uː',
                        link: '/sounds-of-american-english/2.1.7-u',
                      },
                      {
                        text: '2.1.8. ɑː/ɔː/ɔːr',
                        link: '/sounds-of-american-english/2.1.8-ɔ',
                      },
                      {
                        text: '2.1.9. aɪ... əʊ',
                        link: '/sounds-of-american-english/2.1.9-aɪ',
                      },
                      {
                        text: '2.1.10. ɤ',
                        link: '/sounds-of-american-english/2.1.10-ɤ',
                      },
                    ],
                  },
                  {
                    text: '2.2. Phụ âm',
                    collapsed: true,
                    link: '/sounds-of-american-english/2.2-consonants',
                    items: [
                      {
                        text: '2.2.1. Phân loại',
                        link: '/sounds-of-american-english/2.2.1-categorization',
                      },
                      {
                        text: '2.2.2. p/b',
                        link: '/sounds-of-american-english/2.2.2-pb',
                      },
                      {
                        text: '2.2.3. t/d',
                        link: '/sounds-of-american-english/2.2.3-td',
                      },
                      {
                        text: '2.2.4. k/g',
                        link: '/sounds-of-american-english/2.2.4-kg',
                      },
                      {
                        text: '2.2.5. f/v',
                        link: '/sounds-of-american-english/2.2.5-fv',
                      },
                      {
                        text: '2.2.6. s/z',
                        link: '/sounds-of-american-english/2.2.6-sz',
                      },
                      {
                        text: '2.2.7. θ/ð',
                        link: '/sounds-of-american-english/2.2.7-θð',
                      },
                      {
                        text: '2.2.8. ʃ/ʒ',
                        link: '/sounds-of-american-english/2.2.8-ʃʒ',
                      },
                      {
                        text: '2.2.9. h',
                        link: '/sounds-of-american-english/2.2.9-h',
                      },
                      {
                        text: '2.2.10. tʃ/dʒ',
                        link: '/sounds-of-american-english/2.2.10-tʃdʒ',
                      },
                      {
                        text: '2.2.11. tr/dr',
                        link: '/sounds-of-american-english/2.2.11-trdr',
                      },
                      {
                        text: '2.2.12. ts/dz',
                        link: '/sounds-of-american-english/2.2.12-tsdz',
                      },
                      {
                        text: '2.2.13. m, n, ŋ',
                        link: '/sounds-of-american-english/2.2.13-mnŋ',
                      },
                      {
                        text: '2.2.14. l, r',
                        link: '/sounds-of-american-english/2.2.14-lr',
                      },
                      {
                        text: '2.2.15. w, j',
                        link: '/sounds-of-american-english/2.2.15-wj',
                      },
                    ],
                  },
                  {
                    text: '2.3. Âm tiết',
                    collapsed: true,
                    link: '/sounds-of-american-english/2.3-syllables',
                    items: [
                      {
                        text: '2.3.1. Cấu tạo',
                        link: '/sounds-of-american-english/2.3.1-structure',
                      },
                      {
                        text: '2.3.2. Nhấn mạnh',
                        link: '/sounds-of-american-english/2.3.2-stress',
                      },
                    ],
                  },
                  {
                    text: '2.4. Kết hợp',
                    collapsed: true,
                    link: '/sounds-of-american-english/2.4-linking',
                    items: [
                      {
                        text: '2.4.1. Tạm ngừng',
                        link: '/sounds-of-american-english/2.4.1-stop',
                      },
                      {
                        text: '2.4.2. Phụ âm + Nguyên âm',
                        link: '/sounds-of-american-english/2.4.2-cv',
                      },
                      {
                        text: '2.4.3. Phụ âm + Phụ âm',
                        link: '/sounds-of-american-english/2.4.3-cc',
                      },
                      {
                        text: '2.4.4. Nguyên âm + Nguyên âm',
                        link: '/sounds-of-american-english/2.4.4-vv',
                      },
                    ],
                  },
                  {
                    text: '2.5. Nhịp',
                    collapsed: true,
                    link: '/sounds-of-american-english/2.5-prosody',
                    items: [
                      {
                        text: '2.5.1. Cao hoặc thấp',
                        link: '/sounds-of-american-english/2.5.1-pitch',
                      },
                      {
                        text: '2.5.2. Thăng trầm',
                        link: '/sounds-of-american-english/2.5.2-tone',
                      },
                      {
                        text: '2.5.3. Sự nhấn mạnh',
                        link: '/sounds-of-american-english/2.5.3-emphasis',
                      },
                      {
                        text: '2.5.4. Sự ưu tiên',
                        link: '/sounds-of-american-english/2.5.4-pace',
                      },
                    ],
                  },
                ],
              },
              {
                text: '3. Tổng kết',
                collapsed: true,
                link: '/sounds-of-american-english/3-wrapping-up',
                items: [
                  {
                    text: '3.1. Thông thạo',
                    link: '/sounds-of-american-english/3.1-fluency',
                  },
                  {
                    text: '3.2. Tâm trạng',
                    link: '/sounds-of-american-english/3.2-emotions',
                  },
                ],
              },
              {
                text: '4. 而后',
                collapsed: true,
                link: '/sounds-of-american-english/4-whats-next',
                items: [
                  {
                    text: '4.1. 多音拼写',
                    link: '/sounds-of-american-english/4.1-multisounds',
                  },
                  {
                    text: '4.2. 组合词汇',
                    link: '/sounds-of-american-english/4.2-compounds',
                  },
                  {
                    text: '4.3. 词根词缀',
                    collapsed: false,
                    link: '/sounds-of-american-english/4.3-components',
                    items: [
                      {
                        text: '4.3.1. 常见前缀',
                        link: '/sounds-of-american-english/4.3.1-prefixes',
                      },
                      {
                        text: '4.3.2. 常见后缀',
                        link: '/sounds-of-american-english/4.3.2-suffixes',
                      },
                      {
                        text: '4.3.3. 常见词根',
                        link: '/sounds-of-american-english/4.3.3-roots',
                      },
                    ],
                  },
                ],
              },
              {
                text: '5. 总结',
                link: '/sounds-of-american-english/5-sumup',
              },
            ],
          },
          // {
          //   text: "语音塑造",
          //   collapsed: true,
          //   items: [
          //     {
          //       text: "1. 基础",
          //       collapsed: true,
          //       link: "/sounds-of-english/01-basics",
          //       items: [
          //         {
          //           text: "1.1. 音素",
          //           collapsed: true,
          //           link: "/sounds-of-english/01-phonemes",
          //           items: [
          //             {
          //               text: "1.1.1. 元音",
          //               link: "/sounds-of-english/01-1-vowels",
          //             },
          //             {
          //               text: "1.1.2. 辅音",
          //               link: "/sounds-of-english/01-2-consonants",
          //             },
          //             {
          //               text: "1.1.3. 美式语音标注",
          //               link: "/sounds-of-english/01-3-us-phonemes",
          //             },
          //             {
          //               text: "1.1.4. 示例",
          //               link: "/sounds-of-english/01-4-pangram",
          //             },
          //           ],
          //         },
          //         {
          //           text: "1.2. 音节",
          //           link: "/sounds-of-english/02-syllables",
          //         },
          //       ],
          //     },
          //     {
          //       text: "2. 详解",
          //       collapsed: true,
          //       link: "/sounds-of-english/03-details",
          //       items: [
          //         {
          //           text: "2.1. 元音",
          //           collapsed: false,
          //           link: "/sounds-of-english/03-vowels-overview",
          //           items: [
          //             {
          //               text: "2.1.1. 口腔内气流共鸣位置",
          //               link: "/sounds-of-english/04-vowel-positions",
          //             },
          //             { text: "2.1.2. ʌ/ɑː", link: "/sounds-of-english/05-Ʌ" },
          //             { text: "2.1.3. e/æ", link: "/sounds-of-english/06-e" },
          //             { text: "2.1.4. ə/əː", link: "/sounds-of-english/07-ə" },
          //             { text: "2.1.5. ɪ/iː", link: "/sounds-of-english/08-i" },
          //             { text: "2.1.6. ʊ/uː", link: "/sounds-of-english/09-u" },
          //             { text: "2.1.7. ɔ/ɔː", link: "/sounds-of-english/10-ɔ" },
          //             {
          //               text: "2.1.8. aɪ, eɪ, ɔɪ, aʊ, əʊ, eə, ɪə, ʊə",
          //               link: "/sounds-of-english/11-aɪ",
          //             },
          //           ],
          //         },
          //         {
          //           text: "2.2. 辅音",
          //           collapsed: false,
          //           link: "/sounds-of-english/12-consonants-overview",
          //           items: [
          //             {
          //               text: "2.2.1. p, b, m, n, f, k, g, h",
          //               link: "/sounds-of-english/13-pbmnfkgh",
          //             },
          //             { text: "2.2.2. f, v", link: "/sounds-of-english/14-fv" },
          //             {
          //               text: "2.2.3. m, n, ŋ",
          //               link: "/sounds-of-english/15-mn",
          //             },
          //             {
          //               text: "2.2.4. t, d, s, z; ʃ, tʃ, dʒ",
          //               link: "/sounds-of-english/16-tdsz",
          //             },
          //             { text: "2.2.5. t, d", link: "/sounds-of-english/17-td" },
          //             {
          //               text: "2.2.6. tr, dr, ts, dz",
          //               link: "/sounds-of-english/18-trdr",
          //             },
          //             {
          //               text: "2.2.7. sp, st, str, sk",
          //               link: "/sounds-of-english/19-sptk",
          //             },
          //             { text: "2.2.8. h", link: "/sounds-of-english/20-h" },
          //             { text: "2.2.9. θ, ð", link: "/sounds-of-english/21-θð" },
          //             { text: "2.2.10. r", link: "/sounds-of-english/22-r" },
          //             { text: "2.2.11. l", link: "/sounds-of-english/23-l" },
          //             { text: "2.2.12. ʒ", link: "/sounds-of-english/24-ʒ" },
          //             {
          //               text: "2.2.13. j, w",
          //               link: "/sounds-of-english/25-jw",
          //             },
          //           ],
          //         },
          //         {
          //           text: "2.3. 连读",
          //           link: "/sounds-of-english/26-catenation",
          //         },
          //         {
          //           text: "2.4. 音标学习",
          //           link: "/sounds-of-english/27-learning-phonetics",
          //         },
          //         {
          //           text: "2.4. 英美口音选择",
          //           link: "/sounds-of-english/28-choosing-accent",
          //         },
          //       ],
          //     },
          //     {
          //       text: "3. 进阶",
          //       collapsed: true,
          //       link: "/sounds-of-english/29-advanced",
          //       items: [
          //         {
          //           text: "3.1 什么更重要？",
          //           link: "/sounds-of-english/30-more-important",
          //         },
          //         { text: "3.2 停顿", link: "/sounds-of-english/31-pause" },
          //         { text: "3.3 高低", link: "/sounds-of-english/32-high-low" },
          //         { text: "3.4 起伏", link: "/sounds-of-english/33-up-down" },
          //         {
          //           text: "3.5 轻重",
          //           link: "/sounds-of-english/34-strong-weak",
          //         },
          //         { text: "3.6 缓急", link: "/sounds-of-english/35-fast-slow" },
          //         {
          //           text: "3.7 长短",
          //           link: "/sounds-of-english/36-long-short",
          //         },
          //       ],
          //     },
          //     {
          //       text: "4. 收官",
          //       collapsed: true,
          //       link: "/sounds-of-english/37-round-up",
          //       items: [
          //         { text: "4.1 流利", link: "/sounds-of-english/38-fluent" },
          //         { text: "4.2 情绪", link: "/sounds-of-english/39-emotional" },
          //       ],
          //     },
          //   ],
          // },

          {
            text: 'Bên trong não',
            collapsed: true,
            items: [
              { text: '1. Không gian nhỏ, thế giới lớn', link: '/in-the-brain/01-inifinite' },
              { text: '2. Mọi thứ đều được kết nối', link: '/in-the-brain/02-links' },
              { text: '3. Mọi thứ đều là lớp thể dục', link: '/in-the-brain/03-sports' },
              {
                text: '4. Mọi thứ đều là một lớp học ngôn ngữ',
                link: '/in-the-brain/04-literature',
              },
              { text: '5. Mọi thứ đều cần năng lượng', link: '/in-the-brain/05-energy' },
              {
                text: '6. Sử dụng nó, vứt nó đi, tái chế nó',
                link: '/in-the-brain/06-use-or-lose',
              },
              {
                text: '7. Lặp lại đủ trong một khoảng thời gian ngắn',
                link: '/in-the-brain/07-repitition',
              },
              {
                text: '8. Cạnh tranh giữa mạng cũ và mạng mới',
                link: '/in-the-brain/08-compitition',
              },
              {
                text: '9. Nếu bạn không chú ý đến nó, nó không tồn tại.',
                link: '/in-the-brain/09-unnoticed',
              },
              {
                text: '10. Thành thạo là trút bỏ gánh nặng',
                link: '/in-the-brain/10-unloading',
              },
              { text: '11. Được chú ý là gánh nặng lớn nhất', link: '/in-the-brain/11-burden' },
              {
                text: '12. Có giới hạn độc quyền không thể tái tạo',
                link: '/in-the-brain/12-unreproducible',
              },
              {
                text: '13. Mọi thứ đều là phản ứng hóa học',
                link: '/in-the-brain/13-chemical',
              },
              {
                text: '14. Ngưỡng an toàn quyết định kết quả',
                link: '/in-the-brain/14-threshold',
              },
            ],
          },
          {
            text: 'Tự đào tạo',
            collapsed: true,
            link: `/self-training/00-intro`,
            items: [
              { text: '1. Chiến đấu với quân đội', link: '/self-training/01-fight' },
              { text: '2. Tự học là có thể', link: '/self-training/02-last-resort' },
              {
                text: '3. Hãy học tập và rèn luyện chăm chỉ',
                link: '/self-training/03-trials-and-errors',
              },
              { text: '4. Thoát khỏi mê cung', link: '/self-training/04-maze' },
              { text: '5. Tự điều chỉnh', link: '/self-training/05-correction' },
              { text: '6. Ổ đĩa tự động', link: '/self-training/06-motives' },
              { text: '7. Tự động viên', link: '/self-training/07-encouraging' },
              { text: '8. Tự giám sát', link: '/self-training/08-supervising' },
              { text: '9. Tự lập kế hoạch', link: '/self-training/09-planning' },
              { text: '10. Trở lại vấn đề cơ bản', link: '/self-training/10-going-back' },
            ],
          },
          {
            text: 'Enjoy App',
            collapsed: true,
            link: `/enjoy-app/`,
            items: [
              {
                text: 'Bắt đầu nhanh',
                collapsed: false,
                items: [
                  { text: 'Giới thiệu Enjoy', link: '/enjoy-app/' },
                  { text: 'Tải xuống và cài đặt', link: '/enjoy-app/install' },
                  { text: 'Cài đặt phần mềm', link: '/enjoy-app/settings' },
                ],
              },
              {
                text: 'Đào tạo tiếp theo',
                collapsed: false,
                items: [
                  { text: 'Tài nguyên âm thanh', link: '/enjoy-app/audios' },
                  { text: 'Tài nguyên video', link: '/enjoy-app/videos' },
                ],
              },
              {
                text: 'Đọc văn bản',
                collapsed: false,
                items: [
                  { text: 'Bài viết trực tuyến', link: '/enjoy-app/webpage' },
                  { text: 'Sách điện tử địa phương', link: '/enjoy-app/ebook' },
                ],
              },
              {
                text: 'Trợ lý thông minh',
                collapsed: false,
                items: [
                  { text: 'Giới thiệu', link: '/enjoy-app/ai-assistant' },
                  { text: 'Dịch vụ GPT', link: '/enjoy-app/gpt-conversation' },
                  { text: 'Dịch vụ TTS', link: '/enjoy-app/tts-conversation' },
                ],
              },
              {
                text: 'Khác',
                collapsed: false,
                items: [
                  {
                    text: 'Các câu hỏi thường gặp',
                    link: '/enjoy-app/faq',
                  },
                  {
                    text: 'Tận dụng AI để tạo tài liệu đào tạo',
                    link: '/enjoy-app/use-case-generate-audio-resources',
                  },
                ],
              },
            ],
          },
        ],

        '/enjoy-app/': [
          {
            text: 'Bắt đầu nhanh',
            collapsed: false,
            items: [
              { text: 'Giới thiệu Enjoy', link: '/enjoy-app/' },
              { text: 'Tải xuống và cài đặt', link: '/enjoy-app/install' },
              { text: 'Cài đặt phần mềm', link: '/enjoy-app/settings' },
              { text: 'Cập nhật phiên bản', link: '/enjoy-app/changelog' },
            ],
          },
          {
            text: 'Đào tạo tiếp theo',
            collapsed: false,
            items: [
              { text: 'Tài nguyên âm thanh', link: '/enjoy-app/audios' },
              { text: 'Tài nguyên video', link: '/enjoy-app/videos' },
            ],
          },
          {
            text: 'Đọc văn bản',
            collapsed: false,
            items: [
              { text: 'Bài viết trực tuyến', link: '/enjoy-app/webpage' },
              { text: 'Sách điện tử địa phương', link: '/enjoy-app/ebook' },
            ],
          },
          {
            text: 'Trợ lý thông minh',
            collapsed: false,
            items: [
              { text: 'Giới thiệu', link: '/enjoy-app/ai-assistant' },
              { text: 'Dịch vụ GPT', link: '/enjoy-app/gpt-conversation' },
              { text: 'Dịch vụ TTS', link: '/enjoy-app/tts-conversation' },
            ],
          },
          {
            text: 'Khác',
            collapsed: false,
            items: [
              {
                text: 'Các câu hỏi thường gặp',
                link: '/enjoy-app/faq',
              },
              {
                text: 'Tận dụng AI để tạo tài liệu đào tạo',
                link: '/enjoy-app/use-case-generate-audio-resources',
              },
            ],
          },
          {
            text: 'Trở lại',
            link: '/intro',
          },
        ],
      },

      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/nthung2112/everyone-can-use-english/tree/main/1000-hours',
        },
      ],
    },

    markdown: {
      // https://vitepress.dev/reference/markdown
      math: true,
      config: (md) => {
        // use more markdown-it plugins!
        md.use(footnote);
        md.use(sub);
        md.use(sup);
        md.use(mark);
        md.use(ins);
      },
      // toc: {
      //   level: [2, 3, 4]
      // }
    },
    outDir: '../docs',
    base: '/everyone-can-use-english',
  })
);
