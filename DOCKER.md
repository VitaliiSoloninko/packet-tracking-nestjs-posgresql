# Docker Usage Guide

## Local Development with Docker

### Running the Project

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# View application logs only
docker-compose logs -f app

# Stop containers
docker-compose down

# Stop containers and remove volumes (clear database)
docker-compose down -v
```

### Verification

After startup, the project will be available at:

- API: http://localhost:3000
- Swagger documentation: http://localhost:3000/api
- PostgreSQL: localhost:5432

### Importing Data into Docker PostgreSQL

```bash
# Enter PostgreSQL container
docker exec -it packet-tracking-db psql -U postgres -d packet_tracking

# Import CSV data
docker exec -i packet-tracking-db psql -U postgres -d packet_tracking << EOF
\COPY packets (trackingNumber, lat, lng, status, createdAt, updatedAt) FROM '/tmp/packets-data.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');
EOF
```

Or use pgAdmin to connect to localhost:5432.

### Rebuilding the Image

```bash
# Rebuild application image
docker-compose up -d --build

# Rebuild only app service
docker-compose up -d --build app
```

### Debugging

```bash
# Enter application container
docker exec -it packet-tracking-app sh

# Check environment variables
docker exec packet-tracking-app env

# Check container status
docker-compose ps

# Check PostgreSQL health
docker exec packet-tracking-db pg_isready -U postgres
```

## Server Deployment

### Server Preparation

```bash
# Install Docker and Docker Compose on the server
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Project Deployment

```bash
# 1. Copy project to server
scp -r . user@your-server:/path/to/app

# Or use git
git clone <repository-url>
cd packet-tracking-nestjs-posgresql

# 2. Create .env file on server
nano .env

# 3. Start containers
docker-compose up -d

# 4. Проверить логи
docker-compose logs -f
```

### Обновление на сервере

```bash
# 1. Получить последние изменения
git pull

# 2. Пересобрать и перезапустить
docker-compose up -d --build

# 3. Проверить статус
docker-compose ps
```

## Полезные команды

```bash
# Просмотр всех контейнеров
docker ps -a

# Удалить все остановленные контейнеры
docker container prune

# Удалить неиспользуемые образы
docker image prune

# Полная очистка системы Docker
docker system prune -a --volumes

# Статистика использования ресурсов
docker stats
```

## Production настройки

Для production окружения рекомендуется:

1. Изменить пароли в docker-compose.yml
2. Использовать Docker secrets для чувствительных данных
3. Настроить HTTPS с помощью Nginx reverse proxy
4. Использовать внешнюю базу данных или настроить backup для PostgreSQL volumes
5. Настроить логирование и мониторинг
6. Установить лимиты ресурсов для контейнеров
