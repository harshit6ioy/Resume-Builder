FROM php:8.2-apache

# Install dependencies and enable Apache mod_rewrite
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl libssl-dev pkg-config \
    && a2enmod rewrite

# Install MongoDB extension (Required for Laravel MongoDB)
RUN pecl install mongodb && docker-php-ext-enable mongodb

# Install other Laravel required extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Copy Composer from official image
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy application files
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Set Apache DocumentRoot to the public directory
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Configure Apache to use Render's dynamic $PORT environment variable
RUN sed -i "s/80/\${PORT}/g" /etc/apache2/sites-available/000-default.conf /etc/apache2/ports.conf

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Run config cache and route cache to optimize production performance
RUN php artisan config:cache && php artisan route:cache && php artisan view:cache

# Start Apache
CMD ["apache2-foreground"]
