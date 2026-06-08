# KHUI AI Chat - Multi-LLM Integration

Giao diện chat AI đẹp mắt với hỗ trợ nhiều provider (OpenAI, Anthropic/Claude, OpenRouter, v.v.)

## 🚀 Các tính năng

- ✅ Giao diện chat hiện đại (dark mode)
- ✅ Danh sách nhân vật AI có sẵn
- ✅ Tìm kiếm nhân vật
- ✅ Hỗ trợ nhiều LLM provider:
  - OpenAI (GPT-3.5, GPT-4, etc.)
  - Anthropic Claude
  - OpenRouter (proxy đến nhiều model)
  - Mock (test offline)
- ✅ Chat history trong sidebar
- ✅ Chuyển đổi provider trên giao diện
- ✅ Responsive design (desktop + mobile)

## 📦 Cài đặt

### 1. Clone repository
```bash
git clone https://github.com/nghiphamxuan2-glitch/khui-ai-chat.git
cd khui-ai-chat
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình API keys

Copy `.env.example` thành `.env` và điền API key:
```bash
cp .env.example .env
```

Chỉnh sửa `.env`:
```env
# OpenAI
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-3.5-turbo

# Anthropic Claude
ANTHROPIC_API_KEY=your-anthropic-key
ANTHROPIC_MODEL=claude-2

# OpenRouter (optional - supports many models)
OPENROUTER_API_KEY=your-openrouter-key
OPENROUTER_MODEL=gpt-4o-mini

PORT=5173
```

**⚠️ QUAN TRỌNG:** Không commit file `.env` lên GitHub! Thêm vào `.gitignore`:
```bash
echo ".env" >> .gitignore
```

### 4. Chạy server

**Development:**
```bash
npm start
# hoặc với nodemon để auto-restart:
npm run dev
```

Server sẽ chạy tại `http://localhost:5173`

**Production:**
Nếu deploy trên hosting (Render, Railway, Heroku):
- Thêm biến môi trường tại dashboard của hosting
- Chạy: `npm start`

### 5. Mở giao diện

- Frontend: Mở `index.html` trong trình duyệt (hoặc serve bằng `python -m http.server 8000`)
- Hoặc host cùng server: thêm `app.use(express.static('public'))` trong `server.js` và di chuyển `index.html` vào thư mục `public/`

## 🎯 Cách sử dụng

1. **Chọn nhân vật:**
   - Click "Trang chủ" → Chọn một nhân vật (Luna, Alex, Maya, etc.)
   - Hoặc tìm kiếm bằng search box

2. **Chọn Provider:**
   - Dropdown ở header chat chọn provider (OpenAI, Claude, OpenRouter, etc.)

3. **Chat:**
   - Gõ tin nhắn → Nhấn Send hoặc Shift+Enter
   - AI sẽ trả lời dựa trên provider bạn chọn

4. **Quay lại:**
   - Click nút mũi tên hoặc "Trang chủ" để quay lại home

## 🔧 API Configuration

### OpenAI
- Lấy key tại: https://platform.openai.com/api-keys
- Model: `gpt-3.5-turbo`, `gpt-4`, `gpt-4o-mini`, etc.

### Anthropic (Claude)
- Lấy key tại: https://console.anthropic.com
- Model: `claude-2`, `claude-instant-1`, etc.
- Docs: https://docs.anthropic.com

### OpenRouter
- Lấy key tại: https://openrouter.ai/keys
- Hỗ trợ 100+ models: GPT-4, Claude, Mistral, Llama, etc.
- Model: tùy chọn trên dashboard OpenRouter

## 📝 API Endpoint

### POST `/api/chat`

**Request:**
```json
{
  "provider": "openai",
  "character": "Luna",
  "message": "Xin chào!"
}
```

**Response:**
```json
{
  "reply": "Xin chào! Mình là Luna, một AI assistant. Tôi có thể giúp bạn với gì?"
}
```

**Error:**
```json
{
  "error": "OpenAI error",
  "detail": "..."
}
```

## 🚀 Deploy

### Option 1: Render.com
1. Push code lên GitHub
2. Connect GitHub repo tại https://dashboard.render.com
3. Thêm environment variables (OPENAI_API_KEY, etc.)
4. Deploy!

### Option 2: Railway.app
1. Connect GitHub account
2. New Project → Deploy from GitHub
3. Thêm env variables
4. Auto-deploy on git push

### Option 3: Vercel (chỉ frontend)
- Deploy `index.html` tĩnh
- Gọi external server proxy

## 🛡️ Security Best Practices

1. **Không bao giờ** commit `.env` file
2. **Luôn luôn** gọi LLM qua server proxy (không từ browser)
3. **Giữ API key** trong environment variables, không hardcode
4. **Rate limiting** - thêm middleware để tránh abuse
5. **Input validation** - sanitize user input trước khi gửi API

## 📚 Cấu trúc Project

```
khui-ai-chat/
├── index.html              # Frontend giao diện
├── server.js               # Express proxy server
├── package.json            # Dependencies
├── .env.example            # Template config
├── .env                    # (gitignored) Actual keys
└── README.md               # This file
```

## 🐛 Troubleshooting

**"Cannot connect to server"**
- Đảm bảo server đang chạy: `npm start`
- Check port (mặc định 5173)
- CORS configured? Check `server.js`

**"API key not configured"**
- Check `.env` file có tồn tại và đúng key
- Restart server sau khi chỉnh `.env`

**"Invalid API response"**
- Kiểm tra API key còn hạn không
- Check quota/billing trên dashboard provider
- Xem logs server để chi tiết lỗi

## 💡 Next Steps

- [ ] Thêm streaming (token-by-token display)
- [ ] Lưu conversation history vào database
- [ ] Thêm voice input/output
- [ ] Theme customization
- [ ] User authentication
- [ ] Conversation export (PDF, JSON)

## 📄 License

MIT

## 🤝 Contribution

Contributions welcome! Submit PRs tại GitHub.

---

**Made with ❤️ by KHUI AI Team**
