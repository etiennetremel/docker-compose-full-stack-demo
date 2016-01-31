Docker compose: full stack demo
===============================

Docker compose can be used to setup the following infrastucture:

```
  Client
  Browser
     +
     |
+----v-----+        +----------+        +----------+
| APP      +--------> API      +--------> DATABASE |
| NodeJS   <--------+ NodeJS   <--------+ MongoDB  |
+----------+        +----------+        +----------+
```

### Getting started

Make sure you have Docker installed.

If needed, change the MongoDB path from the docker-compose.yaml to the correct location ```/usr/share/mongodb/db```. You could also create an artifact volume to host it in a Docker container, see Docker documentation "[Creating and mounting a data volume container](https://docs.docker.com/engine/userguide/dockervolumes/)".

```bash
docker-compose up
```

Access [http://localhost:3000](http://localhost:3000).
