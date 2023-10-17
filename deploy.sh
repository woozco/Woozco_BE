sudo docker stop backend
sudo docker rm backend
sudo docker image rm woozcobe
sudo docker build -t woozcobe .
sudo docker run -d -p 8080:8080 -p 3001:3001 --name backend --network woozco-net woozcobe
