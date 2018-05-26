# node-etherview
A simple node.js app to view ethereum blockchain info. This is just a simple demo for me to try out node.js, and browsing the ethereum blockchain. The project includes config to run it in docker.

### Prerequisites
You'll need an ethereum node running  - eg: `ethereum/client-go`:
```
docker run -it -p 8545:8545 -p 30303:30303 ethereum/client-go --rpc --rpcaddr "0.0.0.0"
```
_Note: This opens your container to external calls. "0.0.0.0" should not be used when exposed to public networks._

### Running the app

Copy `.env.example` to `.env`, and change the values if necessary:

 * `WEB3_PROVIDER` will need to be the IP address where your ethereum node instance can be accessed.
 * `HTTP_PORT` set to the port you'd like your web server to run on.
 * `WS_PORT` set to the port you'd like the websocket server to run on.

Then build the docker image:
```
$ docker build -t node-etherview .
```
Then use the `docker-compose.yml` file to run the app:
```
docker-compose up -d
```
You can now access your ethereum blockchain viewer in your browser at [http://localhost](http://localhost) (assuming you're running the container on your local machine, and are using port 80 - if you're not, you'll probably know the correct host/port to use.)