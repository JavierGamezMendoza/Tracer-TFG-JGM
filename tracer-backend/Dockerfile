FROM maven:3-openjdk-17 as builder

COPY src /usr/src/app/src
COPY pom.xml /usr/src/app

RUN mvn -f /usr/src/app/pom.xml clean package -DskipTests


FROM openjdk:17-alpine
LABEL authors="Javier Gámez Mendoza"

ENV BBDD_HOST="db"
ENV BBDD_NAME="tracer"
ENV APP_PORT=8080
ENV LOG_LEVEL="INFO"
ENV DLL_AUTO="update"

VOLUME /tmp
VOLUME /mediafiles
EXPOSE 8080
RUN mkdir -p /mediafiles
COPY --from=builder /usr/src/app/target/tracer-0.0.1-SNAPSHOT.jar /app/app.jar
#ADD ./target/api_store-0.0.1-SNAPSHOT.jar app.jar
WORKDIR /app

ENTRYPOINT ["java", "-jar", "/app/app.jar"]