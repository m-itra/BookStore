# Запуск проекта BookStore

## 📌 Запуск программы
```sh
docker-compose up --build
```

## 🛠 Запуск компонентов

### 📂 Запуск PostgreSQL
```sh
cd BookStore/BackEnd/BookStore
docker-compose up --build
```

### 🎨 Запуск FrontEnd
```sh
docker build -t frontend -f Dockerfile .
docker run --name front -p 3000:3000 frontend
```

### 🔧 Запуск BackEnd
```sh
docker build -t backend -f bookstore/Dockerfile .
docker run --name back -p 5152:5152 backend
```

## 📊 Миграции базы данных

### Создание миграции
```sh
dotnet ef migrations add init -s BookStore -p Infrastruction
```

### Применение миграций
```sh
dotnet ef database update -s BookStore -p Infrastruction
```
