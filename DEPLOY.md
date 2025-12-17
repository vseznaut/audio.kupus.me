# Развертывание audiobook.kupus.me

## Два варианта развертывания

### Вариант 1: Статические файлы (Рекомендуется)

Nginx раздаёт собранные статические файлы напрямую. Это быстрее и эффективнее.

#### Шаги:

1. **Соберите сайт:**
   ```bash
   npm run docs:build
   ```

2. **Скопируйте nginx конфиг:**
   ```bash
   sudo cp audiobook.kupus.me /etc/nginx/sites-available/audiobook.kupus.me
   sudo ln -s /etc/nginx/sites-available/audiobook.kupus.me /etc/nginx/sites-enabled/
   ```

3. **Проверьте конфигурацию:**
   ```bash
   sudo nginx -t
   ```

4. **Перезагрузите nginx:**
   ```bash
   sudo systemctl reload nginx
   ```

5. **При обновлении контента:**
   ```bash
   npm run docs:build
   sudo systemctl reload nginx
   ```

---

### Вариант 2: Через прокси на preview сервер

Nginx проксирует запросы на запущенный VitePress preview сервер.

#### Шаги:

1. **Соберите сайт:**
   ```bash
   npm run docs:build
   ```

2. **Запустите preview сервер:**
   ```bash
   # В отдельном tmux/screen или с nohup
   npm run docs:preview
   # Или в фоне:
   nohup npm run docs:preview > /var/log/vitepress-preview.log 2>&1 &
   ```

3. **Скопируйте nginx конфиг:**
   ```bash
   sudo cp audiobook.kupus.me.proxy /etc/nginx/sites-available/audiobook.kupus.me
   sudo ln -s /etc/nginx/sites-available/audiobook.kupus.me /etc/nginx/sites-enabled/
   ```

4. **Проверьте и перезагрузите nginx:**
   ```bash
   sudo nginx -t
   sudo systemctl reload nginx
   ```

---

## Настройка HTTPS с Certbot

После того, как сайт работает по HTTP:

```bash
sudo certbot --nginx -d audiobook.kupus.me
```

Certbot автоматически:
- Получит SSL сертификат
- Обновит конфиг nginx
- Настроит редирект с HTTP на HTTPS

### Автопродление сертификата

Certbot автоматически создаёт cron job для продления. Проверить:

```bash
sudo certbot renew --dry-run
```

---

## Автоматизация деплоя

Создайте скрипт для быстрого обновления:

```bash
#!/bin/bash
# deploy.sh

cd /var/www/kupus.me
git pull
npm install
npm run docs:build
sudo systemctl reload nginx

echo "✅ Сайт обновлён!"
```

Сделайте исполняемым:
```bash
chmod +x deploy.sh
```

Используйте:
```bash
./deploy.sh
```

---

## Проверка работы

1. **HTTP:** http://audiobook.kupus.me
2. **После certbot:** https://audiobook.kupus.me

## Логи

- Access: `/var/log/nginx/audiobook.kupus.me.access.log`
- Error: `/var/log/nginx/audiobook.kupus.me.error.log`
- VitePress (если прокси): `/var/log/vitepress-preview.log`

## Устранение проблем

### 502 Bad Gateway (вариант с прокси)
- Проверьте, что preview сервер запущен: `ps aux | grep vitepress`
- Проверьте порт: `netstat -tlnp | grep 4173`

### 404 Not Found (вариант со статикой)
- Проверьте путь к файлам в nginx конфиге
- Убедитесь, что сборка выполнена: `ls -la docs/.vitepress/dist`

### Не обновляется контент
- Очистите кэш браузера (Ctrl+F5)
- Пересоберите: `npm run docs:build`
- Перезагрузите nginx: `sudo systemctl reload nginx`
