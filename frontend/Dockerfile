FROM node:18

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем всё содержимое проекта в контейнер
COPY . .

# Указываем команду запуска
CMD ["npm", "start"]