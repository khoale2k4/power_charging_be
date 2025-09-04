<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Tuya Backend API

Một backend service được xây dựng bằng NestJS để tích hợp với Tuya IoT Platform API, cung cấp các endpoint để quản lý thiết bị thông minh, điều khiển thiết bị, lập lịch và theo dõi thống kê.

## 🚀 Tính năng

- **Xác thực & Quản lý Token**: Lấy và refresh access token từ Tuya API
- **Quản lý Assets**: Lấy danh sách assets và thiết bị
- **Điều khiển Thiết bị**: Gửi lệnh điều khiển thiết bị (bật/tắt, điều chỉnh thông số)
- **Theo dõi Trạng thái**: Lấy trạng thái hiện tại của thiết bị
- **Thống kê & Báo cáo**: Lấy thống kê sử dụng theo thời gian
- **Quản lý Timer**: Thêm, tìm kiếm và xóa lịch trình thiết bị
- **Xử lý Lỗi**: Error handling toàn diện với HTTP status codes phù hợp

## 🛠️ Công nghệ sử dụng

- **Framework**: NestJS 11.x
- **Language**: TypeScript
- **HTTP Client**: Axios
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier

## 📋 Yêu cầu hệ thống

- Node.js 18+ 
- npm hoặc yarn
- Tuya Developer Account với API credentials

## 🔧 Cài đặt

### 1. Clone repository

```bash
git clone <repository-url>
cd tuya_be
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình môi trường

Copy file `.env.example` thành `.env` và điền thông tin cần thiết:

```bash
cp env.example .env
```

Cập nhật file `.env` với thông tin Tuya API của bạn:

```env
# Tuya API Configuration
TUYA_BASE_URL=https://openapi.tuyaeu.com
TUYA_CLIENT_ID=your_client_id_here
TUYA_SECRET=your_secret_here
TUYA_USER_ID=your_user_id_here
TUYA_CODE=your_code_here

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 4. Chạy ứng dụng

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📚 API Endpoints

### Authentication

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/tuya/auth/token` | Lấy access token mới |
| `GET` | `/tuya/auth/refresh` | Refresh access token |
| `GET` | `/tuya/auth/tokens` | Xem tokens hiện tại |

### Assets & Devices

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/tuya/assets` | Lấy danh sách assets |
| `GET` | `/tuya/assets/:assetId/devices` | Lấy thiết bị của asset |

### Device Control

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/tuya/devices/:deviceId/command` | Gửi lệnh điều khiển thiết bị |
| `GET` | `/tuya/devices/:deviceId/status` | Lấy trạng thái thiết bị |

### Statistics

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `GET` | `/tuya/devices/:deviceId/statistics` | Lấy thống kê theo thời gian |
| `GET` | `/tuya/devices/:deviceId/statistics/total` | Lấy tổng thống kê |

### Timers

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/tuya/devices/:deviceId/timers` | Thêm timer mới |
| `GET` | `/tuya/devices/:deviceId/timers` | Tìm kiếm timers |
| `DELETE` | `/tuya/devices/:deviceId/timers` | Xóa timers |

## 💡 Ví dụ sử dụng

### 1. Lấy access token

```bash
curl -X GET "http://localhost:3000/tuya/auth/token"
```

### 2. Lấy danh sách assets

```bash
curl -X GET "http://localhost:3000/tuya/assets"
```

### 3. Điều khiển thiết bị (bật/tắt)

```bash
curl -X POST "http://localhost:3000/tuya/devices/DEVICE_ID/command" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "switch",
    "value": true
  }'
```

### 4. Lấy trạng thái thiết bị

```bash
curl -X GET "http://localhost:3000/tuya/devices/DEVICE_ID/status?command_code=switch"
```

### 5. Lấy thống kê sử dụng

```bash
curl -X GET "http://localhost:3000/tuya/devices/DEVICE_ID/statistics?code=add_ele&start_time=2025082400&end_time=2025082423&stat_type=sum&time_type=hours"
```

### 6. Thêm timer

```bash
curl -X POST "http://localhost:3000/tuya/devices/DEVICE_ID/timers" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "USER_ID",
    "alias_name": "Morning Timer",
    "category": "dlq",
    "time": "07:00",
    "timezone_id": "Asia/Saigon",
    "date": "20250824",
    "loops": "1111111",
    "functions": [
      {
        "code": "switch",
        "value": true
      }
    ]
  }'
```

## 🔍 Sử dụng với JavaScript/Node.js

### Fetch API

```javascript
async function getAssets() {
  try {
    const response = await fetch('http://localhost:3000/tuya/assets');
    const data = await response.json();
    console.log('Assets:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendDeviceCommand(deviceId, code, value) {
  try {
    const response = await fetch(`http://localhost:3000/tuya/devices/${deviceId}/command`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, value }),
    });
    const data = await response.json();
    console.log('Command result:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Axios

```javascript
const axios = require('axios');

async function getAssets() {
  try {
    const response = await axios.get('http://localhost:3000/tuya/assets');
    console.log('Assets:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

async function sendDeviceCommand(deviceId, code, value) {
  try {
    const response = await axios.post(`http://localhost:3000/tuya/devices/${deviceId}/command`, {
      code,
      value,
    });
    console.log('Command result:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Test watch mode
npm run test:watch
```

## 🚀 Deployment

### Build production

```bash
npm run build
```

### Start production server

```bash
npm run start:prod
```

### Environment variables cho production

```env
NODE_ENV=production
PORT=3000
TUYA_BASE_URL=https://openapi.tuyaeu.com
TUYA_CLIENT_ID=your_production_client_id
TUYA_SECRET=your_production_secret
TUYA_USER_ID=your_production_user_id
TUYA_CODE=your_production_code
```

## 📁 Cấu trúc dự án

```
tuya_be/
├── src/
│   ├── controllers/          # API controllers
│   ├── services/            # Business logic
│   ├── interfaces/          # TypeScript interfaces
│   ├── utils/               # Utility functions
│   └── main.ts              # Application entry point
├── examples/                 # API usage examples
├── test/                    # Test files
├── env.example              # Environment variables template
└── package.json             # Dependencies and scripts
```

## 🔐 Bảo mật

- **Environment Variables**: Không commit file `.env` vào repository
- **API Keys**: Bảo vệ Tuya API credentials
- **Input Validation**: Validate tất cả input từ client
- **Error Handling**: Không expose sensitive information trong error messages

## 🤝 Đóng góp

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Tạo Pull Request

## 📝 License

Dự án này được cấp phép dưới [UNLICENSED](LICENSE) - xem file LICENSE để biết thêm chi tiết.

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi:

1. Kiểm tra [Issues](../../issues) để xem có ai đã báo cáo vấn đề tương tự chưa
2. Tạo issue mới nếu vấn đề chưa được báo cáo
3. Liên hệ với maintainer của dự án

## 🔗 Liên kết hữu ích

- [Tuya IoT Platform Documentation](https://developer.tuya.com/en/docs/iot)
- [NestJS Documentation](https://docs.nestjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
