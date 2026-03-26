# Docker Usage Guide

## Локальная разработка с Docker

### Запуск проекта

```bash
# Сборка и запуск контейнеров
docker-compose up -d

# Просмотр логов
docker-compose logs -f

# Просмотр логов только приложения
docker-compose logs -f app

# Остановить контейнеры
docker-compose down

# Остановить контейнеры и удалить volumes (очистить БД)
docker-compose down -v
```

### Проверка работы

После запуска проект будет доступен:

- API: http://localhost:3000
- Swagger документация: http://localhost:3000/api
- PostgreSQL: localhost:5432

### Импорт данных в Docker PostgreSQL

```bash
# Войти в контейнер PostgreSQL
docker exec -it packet-tracking-db psql -U postgres -d packet_tracking

# Импортировать CSV данные
docker exec -i packet-tracking-db psql -U postgres -d packet_tracking << EOF
\COPY packets (trackingNumber, lat, lng, status, createdAt, updatedAt) FROM '/tmp/packets-data.csv' WITH (FORMAT csv, HEADER true, DELIMITER ',');
EOF
```

Или использовать pgAdmin для подключения к localhost:5432.

### Пересборка образа

```bash
# Пересборка образа приложения
docker-compose up -d --build

# Пересборка только app сервиса
docker-compose up -d --build app
```

### Отладка

```bash
# Войти в контейнер приложения
docker exec -it packet-tracking-app sh

# Проверить переменные окружения
docker exec packet-tracking-app env

# Проверить статус контейнеров
docker-compose ps

# Проверить здоровье PostgreSQL
docker exec packet-tracking-db pg_isready -U postgres
```

## Деплой на сервер

### Подготовка сервера

```bash
# Установить Docker и Docker Compose на сервере
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Установить Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Деплой проекта

```bash
# 1. Скопировать проект на сервер
scp -r . user@your-server:/path/to/app

# Или использовать git
git clone <repository-url>
cd packet-tracking-nestjs-posgresql

# 2. Создать .env файл на сервере
nano .env

# 3. Запустить контейнеры
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
