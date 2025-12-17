# Развертывание audio.kupus.me

## Шаги развертывания

### 1. Соберите сайт

```bash
cd /var/www/kupus.me
npm run docs:build
```

Это создаст готовые файлы в `docs/.vitepress/dist`

### 2. Установите nginx конфиг

```bash
sudo cp audio.kupus.me /etc/nginx/sites-available/audio.kupus.me
sudo ln -s /etc/nginx/sites-available/audio.kupus.me /etc/nginx/sites-enabled/
```

### 3. Проверьте конфигурацию

```bash
sudo nginx -t
```

Должно быть: `syntax is ok` и `test is successful`

### 4. Перезагрузите nginx

```bash
sudo systemctl reload nginx
```

### 5. Проверьте работу

Откройте в браузере: **http://audio.kupus.me**

---

## Настройка HTTPS с Certbot

После того, как сайт работает по HTTP:

```bash
sudo certbot --nginx -d audio.kupus.me
```

Certbot автоматически:
- ✅ Получит SSL сертификат от Let's Encrypt
- ✅ Обновит ваш nginx конфиг
- ✅ Настроит редирект с HTTP на HTTPS
- ✅ Создаст задачу для автопродления сертификата

После этого сайт будет доступен по **https://audio.kupus.me**

---

## Обновление контента

Когда добавляете новые книги или изменяете контент:

```bash
cd /var/www/kupus.me
git pull                  # Получить изменения из GitHub
npm run docs:build        # Собрать новую версию
sudo systemctl reload nginx  # Перезагрузить nginx (опционально)
```

### Скрипт автоматизации

Создайте файл `deploy.sh`:

```bash
#!/bin/bash
cd /var/www/kupus.me
git pull
npm install  # На случай если обновились зависимости
npm run docs:build
echo "✅ Сайт обновлён!"
```

Сделайте исполняемым:
```bash
chmod +x deploy.sh
```

Теперь просто запускайте:
```bash
./deploy.sh
```

---

## Логи

Если что-то не работает, смотрите логи:

```bash
# Логи доступа
sudo tail -f /var/log/nginx/audio.kupus.me.access.log

# Логи ошибок
sudo tail -f /var/log/nginx/audio.kupus.me.error.log
```

---

## Устранение проблем

### Сайт не открывается (502 / 504)
- Проверьте, что nginx запущен: `sudo systemctl status nginx`
- Перезапустите: `sudo systemctl restart nginx`

### Страница не найдена (404)
- Проверьте, что сборка выполнена: `ls -la docs/.vitepress/dist`
- Убедитесь, что путь в конфиге правильный: `/var/www/kupus.me/docs/.vitepress/dist`

### Старый контент после обновления
- Очистите кэш браузера (Ctrl+Shift+R или Cmd+Shift+R)
- Пересоберите сайт: `npm run docs:build`

### DNS не резолвится
- Проверьте A-запись для audio.kupus.me в настройках домена
- Подождите до 48 часов для распространения DNS
- Проверьте: `dig audio.kupus.me` или `nslookup audio.kupus.me`
