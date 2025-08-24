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

# Tuya Backend API Service

Dự án backend NestJS để tích hợp với Tuya Cloud-to-Cloud Connection API.

## Tính năng

- **Authentication**: Lấy và refresh access token
- **Assets Management**: Quản lý assets của user
- **Device Management**: Quản lý devices trong assets
- **Device Control**: Gửi lệnh điều khiển devices
- **Device Status**: Lấy trạng thái devices
- **Statistics**: Lấy thống kê sử dụng điện
- **Timer Management**: Quản lý timer cho devices

## Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd tuya_be
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Tạo file `.env` từ `env.example`:
```bash
cp env.example .env
```

4. Cấu hình các biến môi trường trong file `.env`:
```env
# Tuya API Configuration
TUYA_BASE_URL=https://openapi.tuyaeu.com
TUYA_CLIENT_ID=your_client_id_here
TUYA_SECRET=your_secret_here
TUYA_USER_ID=beu1755919785468Ht4d

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Chạy ứng dụng

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `GET /tuya/auth/token` - Lấy access token
- `GET /tuya/auth/refresh` - Refresh access token
- `GET /tuya/auth/tokens` - Xem tokens hiện tại

### Assets
- `GET /tuya/assets` - Lấy danh sách assets của user
- `GET /tuya/assets/:assetId/devices` - Lấy devices của một asset

### Device Control
- `POST /tuya/devices/:deviceId/command` - Gửi lệnh điều khiển device
- `GET /tuya/devices/:deviceId/status` - Lấy trạng thái device

### Statistics
- `GET /tuya/devices/:deviceId/statistics` - Lấy thống kê theo thời gian
- `GET /tuya/devices/:deviceId/statistics/total` - Lấy tổng thống kê

### Timer Management
- `POST /tuya/devices/:deviceId/timers` - Thêm timer
- `GET /tuya/devices/:deviceId/timers` - Tìm kiếm timers
- `DELETE /tuya/devices/:deviceId/timers` - Xóa timers

## Ví dụ sử dụng

### Lấy access token
```bash
curl -X GET "http://localhost:3000/tuya/auth/token"
```

### Lấy danh sách assets
```bash
curl -X GET "http://localhost:3000/tuya/assets"
```

### Gửi lệnh điều khiển device
```bash
curl -X POST "http://localhost:3000/tuya/devices/bf8017f97b3f5a6f52a8ih/command" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "switch",
    "value": true
  }'
```

### Lấy trạng thái device
```bash
curl -X GET "http://localhost:3000/tuya/devices/bf8017f97b3f5a6f52a8ih/status?command_code=switch"
```

### Thêm timer
```bash
curl -X POST "http://localhost:3000/tuya/devices/bf8017f97b3f5a6f52a8ih/timers" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "beu1755919785468Ht4d",
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

### Lấy thống kê
```bash
curl -X GET "http://localhost:3000/tuya/devices/bf8017f97b3f5a6f52a8ih/statistics?code=add_ele&start_time=2025082400&end_time=2025082423&stat_type=sum&time_type=hours"
```

## Cấu trúc dự án

```
src/
├── controllers/
│   └── tuya.controller.ts      # API endpoints
├── services/
│   └── tuya.service.ts         # Business logic
├── interfaces/
│   └── tuya.interface.ts       # TypeScript interfaces
├── utils/
│   └── tuya-signature.util.ts  # Signature generation
└── app.module.ts               # Module configuration
```

## Lưu ý

- Đảm bảo cấu hình đúng `TUYA_CLIENT_ID` và `TUYA_SECRET` từ Tuya Developer Console
- Access token sẽ được tự động refresh khi hết hạn
- Tất cả API calls đều sử dụng HMAC-SHA256 signature theo chuẩn Tuya API
- Service tự động xử lý authentication và token management

## Troubleshooting

### Lỗi 401 Unauthorized
- Kiểm tra lại `TUYA_CLIENT_ID` và `TUYA_SECRET`
- Đảm bảo access token chưa hết hạn

### Lỗi 500 Internal Server Error
- Kiểm tra logs để xem chi tiết lỗi
- Đảm bảo tất cả biến môi trường đã được cấu hình đúng

## License

MIT
