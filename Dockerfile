FROM maven:3.8.5-openjdk-17 AS builder

WORKDIR /app

COPY pom.xml .
COPY src/ src/

RUN mvn clean package -DskipTests

FROM openjdk:17-slim

WORKDIR /app

COPY --from=builder /app/target/server-0.0.1-SNAPSHOT.jar /app/server.jar

EXPOSE 8080

CMD ["java", "-jar", "server.jar"]