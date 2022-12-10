# Club Application - Backend

## Description

Backend of Club Application app.

## MVP Implementation
1. Users are able to view club list 
   1. Available list (with assumptions the one that user has not applied yet)
   2. Applied list
2. Users are able to apply to a club
   1. (assuming) No duplicate application -> future acceptance system the data will be deleted (soft/hard will depends later on)
3. Authentication 
   1. Local strategy for password authentication
   2. Jwt strategy for authorization
   3. Store password created by user using bcrypt hash
4. Project packing & installation will be done with docker container, separated for each frontend and backend service

## Future Improvement
1. Integrate with Campus's SSO
2. \[Debatable] Create base response (debateable since nest.js already have exception as http response)
3. BaseEntity containing id, createdAt, updatedAt, createdBy, updatedBy, statusFlag.
4. BaseUser for future improvement when we're introducing new type of user such as ClubOwner, Admin, etc
5. Replica database for read to improve data reading (since we're focusing on reading operation)
6. Create docker image for production

## Demo
Swagger <br>
http://35.225.195.132:3000/ <br>
Adminer (DB Management) <br>
http://35.225.195.132:8080/ <br>

## Requirements
1. [Docker (Latest)](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
2. Docker Compose (Latest)
3. Git (Latest)

## Installation

```bash
$ git clone https://github.com/Dristand/matchub-be.git
$ cd matchub-be
$ docker compose -f ./docker-compose.yml up -d
```

## Important URL
```bash
# Swagger (API Documentation)
$ host:3000/

# Postgresql (Database)
$ host:5432/

# Adminer (Database Management Tool)
$ host:3645
```

## Stay in touch

- Author - Jeremy Victor
