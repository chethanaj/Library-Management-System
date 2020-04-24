./build.sh eureka 1.0.0
./build.sh bookservice 1.0.0
./build.sh customer-service 1.0.0
./build.sh lend-service 1.0.0
./build.sh apigateway 1.0.0
./build.sh admin-server 1.0.0
./build.sh zipkin-server 1.0.0
./build-ui.sh 1.0.0
docker-compose up
