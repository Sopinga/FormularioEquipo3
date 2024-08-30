# Usa la imagen oficial de Nginx
FROM nginx:alpine

# Copia el archivo de configuración de Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos estáticos al contenedor
COPY . /usr/share/nginx/html

# Expon el puerto 80
EXPOSE 80
