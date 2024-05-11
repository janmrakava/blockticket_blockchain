const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, 'server', '.env');

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, '');
  console.log('.env file created in /server directory.');
} else {
  console.log('.env file already exists.');
}
