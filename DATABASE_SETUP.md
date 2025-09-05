# Database Setup và API Documentation

## Tổng quan

Dự án đã được thiết lập với đầy đủ các service và controller cho database power_charging với các bảng:
- **Station**: Trạm sạc
- **Device**: Thiết bị sạc  
- **Package**: Gói sạc
- **User**: Người dùng
- **Order**: Đơn hàng

## Cấu trúc dự án

```
src/
├── entities/           # TypeORM Entities
│   ├── station.entity.ts
│   ├── device.entity.ts
│   ├── package.entity.ts
│   ├── user.entity.ts
│   ├── order.entity.ts
│   └── index.ts
├── services/
│   ├── database/       # Database Services
│   │   ├── station.service.ts
│   │   ├── device.service.ts
│   │   ├── package.service.ts
│   │   ├── user.service.ts
│   │   ├── order.service.ts
│   │   └── index.ts
│   └── tuya.service.ts
├── controllers/
│   ├── database/       # Database Controllers
│   │   ├── station.controller.ts
│   │   ├── device.controller.ts
│   │   ├── package.controller.ts
│   │   ├── user.controller.ts
│   │   ├── order.controller.ts
│   │   └── index.ts
│   └── tuya.controller.ts
└── app.module.ts       # Main module với TypeORM config
```

## Database Configuration

### 1. Tạo database
```sql
CREATE DATABASE power_charging;
```

### 2. Cấu hình environment variables
Tạo file `.env` với nội dung:
```env
# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=power_charging

# Application Configuration
PORT=3000
NODE_ENV=development
```

### 3. Chạy ứng dụng
```bash
# Cài đặt dependencies (đã cài)
npm install

# Chạy development
npm run start:dev

# Build production
npm run build
npm run start:prod
```

## API Endpoints

### Stations API (`/stations`)
- `GET /stations` - Lấy danh sách trạm sạc
- `GET /stations/:id` - Lấy trạm sạc theo ID
- `GET /stations/nearby?lat=10.123&lng=106.456&radius=10` - Tìm trạm gần
- `POST /stations` - Tạo trạm sạc mới
- `PUT /stations/:id` - Cập nhật trạm sạc
- `DELETE /stations/:id` - Xóa trạm sạc

### Devices API (`/devices`)
- `GET /devices` - Lấy danh sách thiết bị
- `GET /devices/available` - Lấy thiết bị có sẵn
- `GET /devices/status/:status` - Lấy thiết bị theo trạng thái
- `GET /devices/station/:stationId` - Lấy thiết bị theo trạm
- `GET /devices/:id` - Lấy thiết bị theo ID
- `POST /devices` - Tạo thiết bị mới
- `PUT /devices/:id` - Cập nhật thiết bị
- `PUT /devices/:id/status` - Cập nhật trạng thái
- `DELETE /devices/:id` - Xóa thiết bị

### Packages API (`/packages`)
- `GET /packages` - Lấy danh sách gói sạc
- `GET /packages/type/:type` - Lấy gói theo loại (HOUR/KWH)
- `GET /packages/hourly` - Lấy gói theo giờ
- `GET /packages/kwh` - Lấy gói theo kWh
- `GET /packages/:id` - Lấy gói theo ID
- `POST /packages` - Tạo gói mới
- `PUT /packages/:id` - Cập nhật gói
- `DELETE /packages/:id` - Xóa gói

### Users API (`/users`)
- `GET /users` - Lấy danh sách người dùng
- `GET /users/using-devices` - Lấy người dùng đang sử dụng thiết bị
- `GET /users/username/:username` - Lấy người dùng theo username
- `GET /users/email/:email` - Lấy người dùng theo email
- `GET /users/:id` - Lấy người dùng theo ID
- `POST /users` - Tạo người dùng mới
- `POST /users/register` - Đăng ký người dùng
- `POST /users/login` - Đăng nhập
- `PUT /users/:id` - Cập nhật người dùng
- `PUT /users/:id/using-device` - Cập nhật thiết bị đang dùng
- `DELETE /users/:id` - Xóa người dùng

### Orders API (`/orders`)
- `GET /orders` - Lấy danh sách đơn hàng
- `GET /orders/user/:userId` - Lấy đơn hàng theo người dùng
- `GET /orders/user/:userId/active` - Lấy đơn hàng đang hoạt động
- `GET /orders/device/:deviceId` - Lấy đơn hàng theo thiết bị
- `GET /orders/device/:deviceId/active` - Lấy đơn hàng đang hoạt động
- `GET /orders/payment-status/:status` - Lấy đơn hàng theo trạng thái thanh toán
- `GET /orders/:id` - Lấy đơn hàng theo ID
- `POST /orders` - Tạo đơn hàng mới
- `PUT /orders/:id` - Cập nhật đơn hàng
- `PUT /orders/:id/payment-status` - Cập nhật trạng thái thanh toán
- `PUT /orders/:id/amount-left` - Cập nhật số lượng còn lại
- `DELETE /orders/:id` - Xóa đơn hàng

## Tính năng đặc biệt

### 1. Password Hashing
- Tất cả password được hash bằng bcryptjs
- Tự động hash khi tạo/cập nhật user

### 2. Tìm kiếm trạm gần
- API `/stations/nearby` sử dụng công thức Haversine
- Tìm trạm trong bán kính nhất định (km)

### 3. Quản lý trạng thái thiết bị
- ACTIVE: Hoạt động bình thường
- INACTIVE: Không hoạt động
- MAINTENANCE: Bảo trì

### 4. Quản lý đơn hàng
- Theo dõi số lượng còn lại (amountLeft)
- Quản lý trạng thái thanh toán
- Lọc đơn hàng đang hoạt động

### 5. TypeORM Features
- Auto-synchronize database schema (development)
- Relations giữa các entities
- Query builder và repository pattern

## Lưu ý

1. **Database**: Sử dụng MariaDB/MySQL
2. **Environment**: Cấu hình qua file `.env`
3. **Development**: `synchronize: true` tự động tạo bảng
4. **Production**: Tắt `synchronize` và dùng migrations
5. **Security**: Password được hash, cần thêm JWT cho authentication

## Test API

Sau khi chạy `npm run start:dev`, server sẽ chạy tại `http://localhost:3000`

Ví dụ test:
```bash
# Tạo trạm sạc
curl -X POST http://localhost:3000/stations \
  -H "Content-Type: application/json" \
  -d '{"address":"123 ABC Street","lat":10.1234567,"lng":106.4567890}'

# Lấy danh sách trạm
curl http://localhost:3000/stations

# Tạo gói sạc
curl -X POST http://localhost:3000/packages \
  -H "Content-Type: application/json" \
  -d '{"name":"Gói 2 giờ","price":50000,"type":"HOUR"}'
```
