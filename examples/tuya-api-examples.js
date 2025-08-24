// Tuya API Usage Examples
// Sử dụng curl hoặc Postman để test các API endpoints

const BASE_URL = 'http://localhost:3000';

// 1. Lấy access token
console.log('1. Lấy access token:');
console.log(`curl -X GET "${BASE_URL}/tuya/auth/token"`);
console.log('');

// 2. Lấy danh sách assets
console.log('2. Lấy danh sách assets:');
console.log(`curl -X GET "${BASE_URL}/tuya/assets"`);
console.log('');

// 3. Lấy devices của một asset
console.log('3. Lấy devices của một asset:');
console.log(`curl -X GET "${BASE_URL}/tuya/assets/250446343/devices"`);
console.log('');

// 4. Gửi lệnh điều khiển device (bật/tắt)
console.log('4. Gửi lệnh điều khiển device:');
console.log(`curl -X POST "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/command" \\
  -H "Content-Type: application/json" \\
  -d '{
    "code": "switch",
    "value": true
  }'`);
console.log('');

// 5. Lấy trạng thái device
console.log('5. Lấy trạng thái device:');
console.log(`curl -X GET "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/status?command_code=switch"`);
console.log('');

// 6. Lấy thống kê theo giờ
console.log('6. Lấy thống kê theo giờ:');
console.log(`curl -X GET "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/statistics?code=add_ele&start_time=2025082400&end_time=2025082423&stat_type=sum&time_type=hours"`);
console.log('');

// 7. Lấy tổng thống kê
console.log('7. Lấy tổng thống kê:');
console.log(`curl -X GET "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/statistics/total?code=add_ele&stat_type=sum"`);
console.log('');

// 8. Thêm timer
console.log('8. Thêm timer:');
console.log(`curl -X POST "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/timers" \\
  -H "Content-Type: application/json" \\
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
  }'`);
console.log('');

// 9. Tìm kiếm timers
console.log('9. Tìm kiếm timers:');
console.log(`curl -X GET "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/timers"`);
console.log('');

// 10. Xóa timers
console.log('10. Xóa timers:');
console.log(`curl -X DELETE "${BASE_URL}/tuya/devices/bf8017f97b3f5a6f52a8ih/timers" \\
  -H "Content-Type: application/json" \\
  -d '{
    "user_id": "beu1755919785468Ht4d",
    "timer_ids": "601351533"
  }'`);
console.log('');

// 11. Refresh access token
console.log('11. Refresh access token:');
console.log(`curl -X GET "${BASE_URL}/tuya/auth/refresh"`);
console.log('');

// 12. Xem tokens hiện tại
console.log('12. Xem tokens hiện tại:');
console.log(`curl -X GET "${BASE_URL}/tuya/auth/tokens"`);
console.log('');

// JavaScript/Node.js examples
console.log('=== JavaScript/Node.js Examples ===');
console.log('');

console.log('// Sử dụng fetch API');
console.log(`
async function getAssets() {
  try {
    const response = await fetch('${BASE_URL}/tuya/assets');
    const data = await response.json();
    console.log('Assets:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

async function sendDeviceCommand(deviceId, code, value) {
  try {
    const response = await fetch(\`${BASE_URL}/tuya/devices/\${deviceId}/command\`, {
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

// Sử dụng
getAssets();
sendDeviceCommand('bf8017f97b3f5a6f52a8ih', 'switch', true);
`);

console.log('');
console.log('=== Axios Examples ===');
console.log(`
const axios = require('axios');

async function getAssets() {
  try {
    const response = await axios.get('${BASE_URL}/tuya/assets');
    console.log('Assets:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

async function sendDeviceCommand(deviceId, code, value) {
  try {
    const response = await axios.post(\`${BASE_URL}/tuya/devices/\${deviceId}/command\`, {
      code,
      value,
    });
    console.log('Command result:', response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

// Sử dụng
getAssets();
sendDeviceCommand('bf8017f97b3f5a6f52a8ih', 'switch', true);
`);
