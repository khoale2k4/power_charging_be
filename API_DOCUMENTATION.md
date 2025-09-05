# Power Charging API Documentation

## Database Schema

### Tables
- **Station**: Trạm sạc
- **Device**: Thiết bị sạc
- **Package**: Gói sạc
- **User**: Người dùng
- **Order**: Đơn hàng

## API Endpoints

### Stations API (`/stations`)

#### GET `/stations`
Lấy danh sách tất cả trạm sạc

#### GET `/stations/:id`
Lấy thông tin trạm sạc theo ID

#### GET `/stations/nearby?lat=10.123&lng=106.456&radius=10`
Tìm trạm sạc gần vị trí (bán kính tính bằng km)

#### POST `/stations`
Tạo trạm sạc mới
```json
{
  "address": "123 Đường ABC, Quận 1, TP.HCM",
  "lat": 10.1234567,
  "lng": 106.4567890
}
```

#### PUT `/stations/:id`
Cập nhật thông tin trạm sạc

#### DELETE `/stations/:id`
Xóa trạm sạc

### Devices API (`/devices`)

#### GET `/devices`
Lấy danh sách tất cả thiết bị

#### GET `/devices/available`
Lấy danh sách thiết bị có sẵn (ACTIVE và không có người dùng)

#### GET `/devices/status/:status`
Lấy thiết bị theo trạng thái (ACTIVE, INACTIVE, MAINTENANCE)

#### GET `/devices/station/:stationId`
Lấy thiết bị theo trạm sạc

#### GET `/devices/:id`
Lấy thông tin thiết bị theo ID

#### POST `/devices`
Tạo thiết bị mới
```json
{
  "stationId": 1,
  "status": "ACTIVE"
}
```

#### PUT `/devices/:id`
Cập nhật thông tin thiết bị

#### PUT `/devices/:id/status`
Cập nhật trạng thái thiết bị
```json
{
  "status": "MAINTENANCE"
}
```

#### DELETE `/devices/:id`
Xóa thiết bị

### Packages API (`/packages`)

#### GET `/packages`
Lấy danh sách tất cả gói sạc

#### GET `/packages/type/:type`
Lấy gói sạc theo loại (HOUR, KWH)

#### GET `/packages/hourly`
Lấy gói sạc theo giờ

#### GET `/packages/kwh`
Lấy gói sạc theo kWh

#### GET `/packages/:id`
Lấy thông tin gói sạc theo ID

#### POST `/packages`
Tạo gói sạc mới
```json
{
  "name": "Gói 2 giờ",
  "price": 50000,
  "type": "HOUR"
}
```

#### PUT `/packages/:id`
Cập nhật thông tin gói sạc

#### DELETE `/packages/:id`
Xóa gói sạc

### Users API (`/users`)

#### GET `/users`
Lấy danh sách tất cả người dùng

#### GET `/users/using-devices`
Lấy danh sách người dùng đang sử dụng thiết bị

#### GET `/users/username/:username`
Lấy thông tin người dùng theo username

#### GET `/users/email/:email`
Lấy thông tin người dùng theo email

#### GET `/users/:id`
Lấy thông tin người dùng theo ID

#### POST `/users`
Tạo người dùng mới
```json
{
  "username": "user123",
  "email": "user@example.com",
  "hashedPassword": "password123"
}
```

#### POST `/users/register`
Đăng ký người dùng mới
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/users/login`
Đăng nhập
```json
{
  "username": "user123",
  "password": "password123"
}
```

#### PUT `/users/:id`
Cập nhật thông tin người dùng

#### PUT `/users/:id/using-device`
Cập nhật thiết bị đang sử dụng
```json
{
  "deviceId": 1
}
```

#### DELETE `/users/:id`
Xóa người dùng

### Orders API (`/orders`)

#### GET `/orders`
Lấy danh sách tất cả đơn hàng

#### GET `/orders/user/:userId`
Lấy đơn hàng theo người dùng

#### GET `/orders/user/:userId/active`
Lấy đơn hàng đang hoạt động của người dùng

#### GET `/orders/device/:deviceId`
Lấy đơn hàng theo thiết bị

#### GET `/orders/device/:deviceId/active`
Lấy đơn hàng đang hoạt động của thiết bị

#### GET `/orders/payment-status/:status`
Lấy đơn hàng theo trạng thái thanh toán (PENDING, PAID, FAILED)

#### GET `/orders/:id`
Lấy thông tin đơn hàng theo ID

#### POST `/orders`
Tạo đơn hàng mới
```json
{
  "userId": 1,
  "deviceId": 1,
  "packageId": 1,
  "totalAmount": 2,
  "amountLeft": 2,
  "price": 50000,
  "paymentStatus": "PENDING"
}
```

#### PUT `/orders/:id`
Cập nhật thông tin đơn hàng

#### PUT `/orders/:id/payment-status`
Cập nhật trạng thái thanh toán
```json
{
  "status": "PAID"
}
```

#### PUT `/orders/:id/amount-left`
Cập nhật số lượng còn lại
```json
{
  "amountLeft": 1.5
}
```

#### DELETE `/orders/:id`
Xóa đơn hàng

## Database Connection

Cấu hình database trong file `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=power_charging
```

## Chạy ứng dụng

```bash
# Cài đặt dependencies
npm install

# Chạy development
npm run start:dev

# Build production
npm run build
npm run start:prod
```

## Lưu ý

- Tất cả password sẽ được hash bằng bcryptjs
- Database sẽ tự động tạo bảng khi chạy lần đầu (synchronize: true trong development)
- API sử dụng TypeORM để tương tác với MariaDB/MySQL
