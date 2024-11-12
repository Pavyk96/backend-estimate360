FROM openjdk-jdk-slim

WORKDIR /app

COPY target/estimate-0.0.1-SNAPSHOT.jar /app/estimate.jar

ENTRYPOINT ["java", "-jar", "/app/estimate.jar"]
