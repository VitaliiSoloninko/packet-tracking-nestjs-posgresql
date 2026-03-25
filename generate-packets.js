const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Крупные города Германии с координатами
const germanCities = [
  { name: 'Berlin', lat: 52.520008, lng: 13.404954 },
  { name: 'Hamburg', lat: 53.551086, lng: 9.993682 },
  { name: 'Munich', lat: 48.137154, lng: 11.576124 },
  { name: 'Cologne', lat: 50.937531, lng: 6.960279 },
  { name: 'Frankfurt', lat: 50.110924, lng: 8.682127 },
  { name: 'Stuttgart', lat: 48.775846, lng: 9.182932 },
  { name: 'Düsseldorf', lat: 51.227741, lng: 6.773456 },
  { name: 'Dortmund', lat: 51.513587, lng: 7.465298 },
  { name: 'Essen', lat: 51.455643, lng: 7.011555 },
  { name: 'Leipzig', lat: 51.339695, lng: 12.373075 },
  { name: 'Bremen', lat: 53.079296, lng: 8.801694 },
  { name: 'Dresden', lat: 51.050407, lng: 13.737262 },
  { name: 'Hanover', lat: 52.375892, lng: 9.73201 },
  { name: 'Nuremberg', lat: 49.45203, lng: 11.07675 },
  { name: 'Duisburg', lat: 51.434765, lng: 6.762329 },
  { name: 'Bochum', lat: 51.481845, lng: 7.216236 },
  { name: 'Wuppertal', lat: 51.256386, lng: 7.150764 },
  { name: 'Bonn', lat: 50.735851, lng: 7.10175 },
  { name: 'Bielefeld', lat: 52.020736, lng: 8.535202 },
  { name: 'Mannheim', lat: 49.483845, lng: 8.47674 },
  { name: 'Karlsruhe', lat: 49.00689, lng: 8.403653 },
  { name: 'Münster', lat: 51.960665, lng: 7.626135 },
  { name: 'Wiesbaden', lat: 50.08273, lng: 8.24091 },
  { name: 'Augsburg', lat: 48.371667, lng: 10.898333 },
  { name: 'Aachen', lat: 50.775421, lng: 6.083862 },
];

const statuses = ['pending', 'in_transit', 'delivered', 'cancelled'];

// Генерация случайной даты между 2026-01-01 и 2026-04-30
function randomDate(start, end) {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  return date.toISOString();
}

// Добавление небольшого случайного смещения к координатам (для вариативности)
function addRandomOffset(coord, isLat) {
  const offset = (Math.random() - 0.5) * 0.05; // ±0.025 градуса
  return (coord + offset).toFixed(6);
}

// Генерация данных
const packets = [];
const startDate = new Date('2026-01-01');
const endDate = new Date('2026-04-30');

for (let i = 0; i < 250; i++) {
  const city = germanCities[Math.floor(Math.random() * germanCities.length)];
  const createdAt = randomDate(startDate, endDate);
  const updatedAtDate = new Date(createdAt);
  updatedAtDate.setHours(
    updatedAtDate.getHours() + Math.floor(Math.random() * 72),
  ); // +0-72 часа
  const updatedAt = updatedAtDate.toISOString();

  packets.push({
    trackingNumber: uuidv4(),
    lat: addRandomOffset(city.lat, true),
    lng: addRandomOffset(city.lng, false),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    createdAt,
    updatedAt,
  });
}

// Создание CSV
const csvHeader = 'trackingNumber,lat,lng,status,createdAt,updatedAt\n';
const csvRows = packets
  .map(
    (p) =>
      `${p.trackingNumber},${p.lat},${p.lng},${p.status},${p.createdAt},${p.updatedAt}`,
  )
  .join('\n');

const csvContent = csvHeader + csvRows;

// Сохранение в файл
fs.writeFileSync('packets-data.csv', csvContent, 'utf8');

console.log('✅ Сгенерировано 250 посылок в файл packets-data.csv');
console.log(`📦 Статусы: ${statuses.join(', ')}`);
console.log(`🌍 Города: ${germanCities.length} городов Германии`);
console.log(`📅 Период: 01.2026 - 04.2026`);
