# Базовый образ Node.js
FROM node:16-alpine

# Установка рабочей директории в контейнере
WORKDIR /app

# Копирование файлов package.json и package-lock.json (или yarn.lock)
COPY package*.json yarn.lock* ./

# Установка зависимостей проекта
RUN npm install --silent

# Копирование всех файлов проекта в рабочую директорию
COPY . .

# Сборка проекта (игнорируя предупреждения ESLint)
RUN npm run build --silent

# Открытие порта, на котором будет запущено приложение
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
