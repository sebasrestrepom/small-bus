<h1 align="center">Small Bus</h1>
<p align="center">
  <img src="https://media.istockphoto.com/vectors/bus-stop-bus-station-location-marker-icon-vector-id1136216828?b=1&k=6&m=1136216828&s=170667a&w=0&h=MJSZ6_tojqzp3jUyu275c-7D2cyu2kdNN21Nf5Qu5Q0=" width="300" alt="Small Bus Logo" />
</p>

  <h2 align="center">API developed for request rides</h2>

</p>

# Description

API developed in NestJs using Typescript as programming language, which is used to make requests for transportation services. This API allows to request a trip and finalize it and associate a payment method to a user.

The API has 3 main endpoints, 1 to initiate the trip where the user's email is sent, the current longitude and current latitude. Another endpoint to end the trip where the trip id, final latitude and final longitude are sent, and finally an endpoint to associate a payment method to the user, where the user's email and the user's bank card token are sent.

Each trip has an initial rate of 3,500 COP and for each kilometer that advances a charge of 1,000 COP is added to the trip, additionally, for each minute that elapses in the trip, a charge of 200 COP is added; similar to a Taximetro system.

Technological stack used:
- NestJs
- PostgreSQL
- Swagger
- TypeORM
- Dotenv
- Axios
- Eslint
- Docker

Among many others ...

## Architecture diagram

Next we will see a model of the system architecture

<p align="center">
  <img src="https://i.ibb.co/RBq0dyN/Diagrama-en-blanco.png" width="300" alt="system model" />
</p>

# Installation

For the installations you need to first clone the repository.

```bash
#Clone repository
$ git clone https://github.com/sebasrestrepom/small-bus.git


```

# Running the app

To run the application you must add the following command in the console, with this command docker-compose will start an instance of the database and run the service, automatically installing all the dependencies and making it ready to be used.

```bash

# run application
$ docker-compose up

```

# API Docs

For more information about methods present on this API visit:

```bash

# copy this url in your browser
http://localhost:4000/docs/

```

In the following image we will see a screenshot of the endpoints that we will find in Swagger

<p align="center">
  <img src="https://i.ibb.co/47xZNF6/swagger1.png" width="800"  alt="Method of Api" />
</p>

You can also see an example of how you should make the request, with some sample data, and a schema of how the endpoint response will be displayed.

<p align="center">
  <img src="https://i.ibb.co/kh5C6py/swagger2.png" width="800"  alt="Example Method Get" />
</p>


## 🐞 Did you find some issue or improvment?

Feel free to contribute and do whatever to consider better to this project.