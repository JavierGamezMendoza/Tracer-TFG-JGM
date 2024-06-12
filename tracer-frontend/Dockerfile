
# Usa una imagen de Node.js para construir la aplicación React
FROM node:20.12.2 as build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el resto de los archivos del proyecto
COPY . .

# Instala las dependencias
RUN npm install

# Construye la aplicación React
RUN npm run build --prod

# Usa una imagen de Nginx para servir la aplicación React
FROM nginx:stable-alpine
LABEL authors="Javier Gámez Mendoza"

# Copia los archivos construidos desde la fase de construcción
COPY --from=build /app/build /usr/share/nginx/html

# Copia la configuración de Nginx
COPY ./nginx.conf /etc/nginx/nginx.conf

#RUN nginx -t

# Exponer el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]