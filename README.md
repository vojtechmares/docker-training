<!-- markdownlint-disable MD033 -->
<!-- markdownlint-disable-next-line MD041 -->
<p align="center">
  <h1 align="center" style="font-size: 4rem;">Docker Training</h1>
  <p align="center" style="font-size: 1.5rem;">
    Reliable builds at every environment and easy software distribution!
  </p>
  <p align="center">
    <a href="https://www.docker.com/"><img alt="Docker" src="https://img.shields.io/badge/TRAINING ON-DOCKER-2496ED?style=for-the-badge"></a>
    <a href="https://www.mares.cz"><img alt="Vojtěch Mareš" src="https://img.shields.io/badge/TRAINING BY-Vojtěch Mareš-fd9a00?style=for-the-badge"></a>
  </p>
  <p align="center"><a href="https://www.mares.cz">Vojtěch Mareš</a> | <a href="mailto:vojtech@mares.cz">vojtech@mares.cz</a></p>
</p>
<!-- markdownlint-enable MD033 -->

## About the course

### Contribute

The course is forever open-source, so feel free to fork, create issues, contribute or just download the materials.

## About the lector

Hi 👋, I'm Vojtěch Mareš and I will be your lector. I am a freelance DevOps architect, consultant and lector. I work with clients to improve their systems with

- CI pipelines
- Containerization with Docker
- Application orchestration on Kubernetes
- Observability with Prometheus, Grafana, Loki and Open Telemetry
- Infrastructure either on cloud or on-premise managed with Terraform
- I work with: Git, Kubernetes, Terraform, GitHub, GitLab, Prometheus, Grafana, Docker, PostgreSQL, and more...

## What is Docker

Docker is today's de-factor standard for building, shipping and running containerized applications.

### Docker

Docker is: the company, the CLI, the system daemon. See [Docker glossary](#docker-glossary) for distinction between those terms.

### Image

Image is a an artifact produced by a build process using the `Dockerfile` which is a "recipe" how to build the image.

### Container

Container is a running process based on an image.

### Use cases for containers

Most of modern world's backends are run in containers. Containers make building, deploying, developing and distribution easy.

Thanks to the extensive toolchain around containers and also containers are not very complicated technology – they are not virtualization, they are just "walls around processes".

Todays common use-cases are:

- simplification of software distribution – pull an image and run it almost anywhere
- simplified local development – no need to install dependencies on your machine, everything is nicely packed inside the image already
- runtime orchestration – because container images are easy to distribute and relatively cheap to start, they became de-facto standard for running applications thanks to tools like Kubernetes

## Docker glossary

| **Term** | **Explanation** |
| -------- | --------------- |
| Docker Inc. | The company behind Docker |
| Docker daemon | A container runtime by Docker Inc. |
| Image | An artifact produced by a build process |
| Container | A running process of given image |
| Dockerfile | A build "recipe" on how to build an image |
| Containerfile | Basically a Dockerfile, just by Red Hat |
| Container runtime | A universal name for running containers, such as Docker daemon, containerd, CRI-O and others |
| Open Container Initiative (OCI) | Organization responsible for maintaining the Image, Runtime, and Distribution specifications |
| Container Runtime Interface (CRI) | An API specification for running containers |
| Container Network Interface (CNI) | An API specification for container networking |

## What are containers

Containers are lightweight process isolation and software delivery solution.

1. Build it.
1. Push it.
1. Pull it.
1. Run it.

### Containers are not virtualization

Standard virtualization creates an entire new linux machine on a physical host, running a new instance of system Kernel, init process (for example: systemd) and then running everything again on the guest system.

Meanwhile containers share the same Kernel and are created using Kernel primitives – namespaces and cgroups. These primitives ensure process isolation and separating the "insides" of container from the host system (users, filesystem,...).

Containers ensure that each process has its own space on filesystem, network, memory and CPU. With containers you can control all of these resources easily.

## 12 Factor Apps

See: [12factor.net](https://12factor.net/)

Twelve rules to build better and self-contained apps.

## Docker Docs

See: https://docs.docker.com/

## Setup

### Install Docker

See:

- https://www.docker.com/
- https://docs.docker.com/desktop/
- https://docs.docker.com/engine/
- https://docs.docker.com/compose/

### Visual Studio Code extension

See: https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker

## System commands

- `docker version`
- `docker info`
- `docker system df`: Show Docker disk usage
- `docker system prune`
  - `--all`: Remove all unused images not just dangling ones
  - `--volumes`: Prune anonymous volumes
  - `--force`: Do not prompt for confirmation

## Working with images

- `docker pull <image>` - download an image
- `docker image ls` - list all images
- `docker image ls -q` - quiet output, just IDs
- `docker image ls <image>` - list image versions
- `docker image rm <image>` - remove image
- `docker image inspect <image>` - show image properties

## Start a container

```bash
docker run ubuntu
```

Run with custom command:

```bash
# print /etc/os-release file from inside the container
docker run ubuntu cat /etc/os-release
```

Standard tty interactive access:

```bash
docker run -it ubuntu
```

> `-it` means interactive, it will attach to your session and you will be able to run a bash commands in this example.

Run image in background:

```bash
# sleep for 30s and then exit
docker run -d ubuntu sleep 30
```

> `-d` means detached, if you want to run the container in the background.

Common parameters:

- `--name <name>` - set container name (Wozniak easter egg)
- `-d` - run in detached mode
- `-it` - map TTY a STDIN (for bash eg.)
- `-e <variable>=<value>` - set ENV variable
- `--env-file=<env_file>` - load all variables defined in ENV file

> [!NOTE]
>
> All parameters must always go before `<image>`, otherwise the arguments will be passed to the container process as arguments.
>
> ```bash
> # Will work:
> docker run -it ubuntu
>
> # Won't work:
> docker run ubuntu -it
> ```

## Working with containers

- `docker container ls` - list containers
- `docker ps`- list containers
- `docker start <container>`
- `docker stop <container>`
- `docker restart <container>`
- `docker rm <container>` - remove container

Restart policy:

Default behavior is, that when container stops or fails, it will stay stopped. This can be changed with `--restart <restart policy>`

- `--restart on-failure` - restart only when container return non zero return code
- `--restart always` - always, even on Docker daemon restart (server restart also)
- `--restart unless-stopped` - similar to always, but keep stopped container stopped on Docker daemon restart (server restart also)

If you want to set maximum restart count for on-failure restart policy, you can use: `--restart on-failure:<count>`

List containers:

- `docker container ls` - list running containers
- `docker container ls -a` - list all containers
- `docker container ls -a -q` - list IDs of all containers

or alternatively use short syntax without the "container" word:

- `docker ps` - list running containers
- `docker ps -a` - list all containers
- `docker ps -a -q` - list IDs of all containers

## Container logs

```bash
docker logs <container>
```

Print logs from container.

Arguments

- `-f` - follow, works like `tail -f`
- `-t` - show time prefix

Example:

```bash
# Start the container
docker run --name postgres-16 -d -e POSTGRES_PASSWORD=postgres postgres:16

# Get container logs
docker logs -f postgres-16
```

## Execute a command inside container

```bash
docker exec <container> <command>
```

Execute a command inside a container.

Arguments can be used:

- `-it` to run it interactively
- `-e` to se environment variable
- `-d` to run in detached mode
- `-u` run as user

PostgreSQL example:

```bash
# Start the container
docker run --name postgres-16 -d -e POSTGRES_PASSWORD=postgres postgres:16

# Execute command inside
docker exec -it postgres-16 bash
# or
docker exec -it -u postgres postgres-16 psql
```

## Build an image

- `docker build`
- Dockerfile

```dockerfile
FROM ubuntu:24.04

RUN apt-get update && apt-get install curl tz-data ca-certificates

COPY local/path in/container/path

CMD [ "/bin/bash" ]
```

Dockerfile keywords:

- `FROM` - select base image, default is `scratch`
- `COPY` - copy files from host system to the image
- `RUN` - run a command during build (e.g. `apt-get install ...`)
- `CMD` - command to be executed on container start
- `ENV` - set environment variable
- `ARG` - build argument, works like environment variable but is only available during build time
- `EXPOSE` - define which port will be exposed
- `WORKDIR` - change the current working directory
- `USER` - change current user (user must exist)
- `VOLUME` - define volume
- `ADD` - instead of copy, archives added by add are extracted

`.dockerignore` - similar to `.gitignore`, to ignore files during build, useful with `COPY` when you do not want to copy files, e.g. build cache, locally installed dependencies, etc.

```dockerignore
node_modules
.vscode
README.md
.git
out
.DS_Store
```

Build image:

- `docker build <path>` - build an image, path is relative context for `COPY` etc.
- `docker build -t <tag> <path>` - build image with tag (can include registry)
- `docker build -f <path-to-dockerfile> -t <tag> <path>` - custom path to Dockerfile, default is `./Dockerfile`
- `docker tag <old tag> <new tag>` - creates a new tag for image

Cross-platform build:

```bash
docker build --platform linux/amd64 .

# multiplatform
docker build --platform linux/amd64,linux/arm64 .
```

## Port-forwarding

Or port-publishing. Aka you expose a port from the container to the host system.

```bash
docker run -p [<network-addr>:]<host-port>:<container-port> <image>
```

```bash
docker run -ti -p 8080:80 nginx
docker run -ti -p 127.0.0.1:8080:80 nginx
```

> [!NOTE]
>
> Its recommended to specify the address, especially when deploying to production, since a port is attached to a network interface directly, this bypasses firewall rules (iptables, etc.) and will expose your app to public internet. A common use-case is to run app behind a reverse proxy (NGINX, Traefik, Caddy,...). By attaching port to local IP (`127.0.0.1`) or other non public CIDR, app will be accessible only through the proxy and not via public server IP.

## Container volumes

See: https://docs.docker.com/engine/storage/volumes/

Volumes are used for persistent data storage for containers and can share data between containers. Data are written directly to the host.

- `docker volume` - all volume management commands
- `docker volume ls` - list all volumes
- `docker volume rm <volume>` - remove volume
- `docker volume prune` - remove all not used (not bound to container) volumes

Examples:

```bash
docker run -ti -v /data ubuntu
docker run -ti -v my-volume:/data ubuntu
docker run -ti -v $(pwd)/my-data:/data ubuntu
```

Get volume paths for an image:

```bash
docker image inspect redis --format "{{.Config.Volumes|json}}"

docker image inspect postgres:16 --format "{{.Config.Volumes|json}}"
```

Read only volumes:

In case you want read only volume (configuration for example), just add a `:ro` suffix to the volume, to make it read only.

```bash
docker run -it -v /data:ro ubuntu

# try writing to the volume (must be executed inside the container)
echo "Hello world" >> /data/hello.txt
```

Show all volumes and mounts for all containers:

```bash
docker ps -a --format '{{ .ID }}' | xargs -I {} docker inspect -f '{{ .Name }} ({{ .ID }}){{ printf "\n" }}{{ range .Mounts }}{{ printf "\n\t" }}{{ .Type }} {{ if eq .Type "bind" }}{{ .Source }}{{ end }}{{ .Name }} => {{ .Destination }}{{ end }}{{ printf "\n" }}' {}
```

Find container with specific volume:

```bash
docker ps -a --filter volume=<volume>
```

Socket forwarding:

> [!NOTE]
>
> If you want to expose host machine sockets, you can use volumes to do so. But keep in mind that read only volumes does not work for this use-case!

```bash
docker run -v /var/run/docker.sock:/var/run/docker.sock docker docker ps
```

> [!WARNING]
>
> Exposing sockets directly is a big security risk and should not be done in production unless you really know what are you doing!

> [!WARNING]
>
> !! Possible Security Risk !!
> Since you can mount your host's rootfs to container with root privileges. Every process with access to Docker or Docker socket potentially has root privileges on host system!
>
> userns-remap can fix that
>
> ```bash
> docker run -v /:/rootfs -ti ubuntu
> ```

userns-remap:

Docker can remap root user (or any other) user from container to higher-ID user on host system.

See: https://docs.docker.com/engine/security/userns-remap/

This has to be explicitly enabled.

As a dockerd argument

```bash
dockerd --userns-remap="default"
```

Via config file (`/etc/docker/daemon.json`)

```json
{
  "userns-remap": "default"
}
```

## Image tags

To differentiate between image versions etc., use image tags – the string after colon (`:v1.3.4`). Its common to use Git commit hash and/or version.

There is also a special `latest` tag, which is the default tag to be used, if none is specified.

Either create tag on build or re-tag an existing image for example. To re-tag existing image, the image must be present locally if working with Docker, or use other tools that allow for working with remote registries if re-tagging image within same registry.

```bash
# build image with tag
docker build -t ttl.sh/docker-training-build-example:1h

# re-tag existing image
docker tag ubuntu:24.04 ttl.sh/docker-training-base:48h
```

### Immutable tags

## Push images

- `docker push`

```bash
docker push ttl.sh/docker-training-demo:1h
```

## Pull images

```bash
docker pull ttl.sh/docker-training-demo:1h
```

## Image Registry (OCI Artifact Registry)

Registries can be public (pull image without authentication) or private.

Public & free registries:

- Docker Hub (default registry)
- GitHub Container Registry (ghcr.io)
- Quay.io
- ttl.sh (for debugging)

### Private registries

Cloud:

- [Amazon Elastic Container Registry](https://aws.amazon.com/ecr/)
- [Google Cloud Artifact Registry](https://cloud.google.com/artifact-registry/docs)
- [Azure Container Registry](https://azure.microsoft.com/en-us/products/container-registry)
- [Digital Ocean Registry](https://www.digitalocean.com/products/container-registry)
- and more...

Self-hosted:

- Distribution – official implementation of image registry, open source
- Harbor – open source OCI registry with scanning via Trivy support and service accounts for program access
- GitLab – open source core Git repository hosting with built-in image registry
- and more...

## Docker in Docker (DinD)

Run Docker in Docker:

```bash
# Start DinD container
docker run --name docker -d --privileged docker:dind

# Test it
docker exec docker docker info
docker exec docker docker image ls
docker exec docker docker run hello-world
docker exec -ti docker sh
```

This is a common case for GitLab CI runner, running Docker in Docker either with its `services` directive or via exposed socket (insecure!).

## Lint `Dockerfile`

To avoid mistakes, use [Hadolint](https://github.com/hadolint/hadolint) to lint your Dockerfiles.

It works like every other linter, checks for common mistakes, etc.

```bash
hadolint <path-to-dockerfile>
```

## Docker networks

- `docker network ls`
- `docker network create <network>`
- `docker network rm <network>`

Create network:

```bash
docker network create -d bridge my_bridge
```

Run & attach containers:

```bash
# Run on network
docker run -d --net=my_bridge --name nginx nginx

# Connect to network
docker run -d --name nginx-2 nginx
docker network connect my_bridge nginx-2
```

Test the network:

```bash
docker run -ti --net my_bridge curl bash
```

## Docker Compose

Docker Compose (or docker-compose for v1 cli).

Docker Compose is configured with YAML config file `compose.yml` (or with `.yaml` extension, or `docker-compose.yml` for as old file name).

```yaml
version: "3.9"
services:
  nginx:
    image: nginx:latest
    container_name: nginx
    ports:
      - "8080:8080"
  app:
    image: dummy-app
  postgresql:
    image: postgresql:17
    ports:
      - "5432:5432"
```

### `compose.yaml` file

See: [Docker Compose file reference](https://docs.docker.com/reference/compose-file/)

### Docker Compose services

```yaml
version: "3"

services:
  app:
    image: node:latest
  database:
    image: postgresql:17
  # ...
```

### Docker Compose ports

```yaml
version: "3"

services:
  nginx:
    image: nginx:latest
    ports:
      - "8080:80" # host:container
```

### Docker Compose volumes

```yaml
version: "3"

services:
  database:
    image: postgresql:17
    environment:
      POSTGRES_PASSWORD: postgres
      POSTGRES_USER: postgres
      POSTGRES_DATABASE: app
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
```

### Docker Compose networks

Link services together:

```yaml
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    links:
      - "db:database"
  db:
    image: postgres
    ports:
      - "5432:5432"
```

Networks:

```yaml
version: "3"

services:
  nginx:
    image: nginx:latest
    ports:
      - "8080:80" # host:container
    networks:
      - demo-net

networks:
  demo-net:
    driver: bridge
    # custom driver options
    driver_opts:
      com.docker.network.bridge.host_binding_ipv4: "127.0.0.1"
```

### Run Docker Compose

```bash
# start
docker compose up

# start in detached mode
docker compose up -d

# stop
docker compose down
```

### Build with Docker Compose

```bash
docker compose build

# run
docker compose up -d
```

## cAdvisor

[cAdvisor](https://github.com/google/cadvisor) is a tool that analyzes resource usage and performance characteristics of running containers. Its developed by Google, but its not an official product.

## Containers in production

Already mentioned Docker Compose - its fine for a single server.

Or...

### Kubernetes

Or you can opt in for something bigger like Kubernetes to run your applications in production on scale.

### Managed container platforms

- Google Cloud Run
- AWS ECS
- Azure Containers
- Fly.io
- Render
- Knative (on top of Kubernetes)

## OCI

OCI aka Open Container Initiative is an organization backing the image, runtime and distribution specification, to ensure a well-maintained and well-designed APIs.

To work with OCI registry/images/etc., you can use the following tools

- crane

    [crane](https://github.com/google/go-containerregistry/tree/main/cmd/crane) is a tool for interacting with remote images and registries.

    Install on Mac:

    ```bash
    brew install crane
    ```

    **Copy Image**

    Copy image from one registry to another without pulling it to local machine.

    `crane copy <source> <destination>`

    Example:

    ```bash
    crane copy ubuntu ttl.sh/training-ubuntu
    ```

- [ORAS](https://oras.land/)

    Distribute Artifacts across OCI registries with easy.

## Best practices

Collection of best practices to optimize your images and minimize attack surface.

### Optimize builds

- Cache images
- Optimize layers (`ENV`, `EXPOSE`, `WORKDIR` go first)
- Use cache mounts (see: https://docs.docker.com/build/cache/optimize/#use-cache-mounts)

    ```dockerfile
    FROM node:latest
    WORKDIR /app
    RUN --mount=type=cache,target=/root/.npm npm install
    ```

### Single process

The best practice is to run only a single process inside a container.

Then you do not need to handle signal propagation to gracefully shutdown everything.

But, there are exceptions. But consider this wisely. A common case of multi-process containers are databases such as PostgreSQL or MySQL, to run for example a backup process and the database core process itself.

For example NGINX which usually runs a master process and then multiple worker processes. In a container, run NGINX with a single worker and scale via launching multiple containers.

### Multi-platform images

With Docker, you can create a multi-platform images, for example with multiple tags and create a manifest, which acts like an index for the platforms.

### Start binary, not shell

Use the `CMD [ "/my/app", "arg" ]` notation instead of `CMD command`.

The `CMD command` starts a shell process and in the shell then executes your program.

The shell does not handle signals and therefore your app does not receive them either, making graceful shutdown impossible.

Using the `CMD [ "/my/app", "arg" ]` option, this starts the binary under the given path. And system signals are sent directly to the main process.

### Multi-stage builds

With multi-stage builds, you use multiple `FROM`s inside your Dockerfile, creating stages.

In each stage, you can perform a certain step – install dependencies only required for build, build the app and then copy the final binary to the runtime image.

WIth multi-stage builds, you also limit the amount of dependencies and programs in your final image, minimizing the attack surface.

### Mount secrets on build instead of copying them

To avoid leaking secrets (even when deleted from image in the end), mount files, for example `.npmrc` to the image on build instead of copying the file, which even when deleted would remain in the image metadata.

```bash
docker build --secret id=yoursecret,src=/host/secret/file/path
```

You can give a single `RUN` instruction access to this secret. By default this creates a file in `/run/secrets/<secret-id>`, but you can also specify a target path of your choice.

```dockerfile
RUN --mount=type=secret,id=yoursecret ...
RUN --mount=type=secret,id=yoursecret,target=/target/path/to/secret ...
```

Example for AWS `credentials` file:

```bash
docker build --secret id=aws,src=$HOME/.aws/credentials .
```

```dockerfile
# consume the secret
RUN --mount=type=secret,id=aws \
    AWS_SHARED_CREDENTIALS_FILE=/run/secrets/aws \
    aws s3 cp ...
```

### Rootless images

Improve security by running your containerized app under a different user then root with the least privileges required.

If you app is running for example an HTTP server, the server must be bind to port higher then 1024, since those are reserved and required either root user or `NET_BIND_SERVICE` Kernel capability.

```dockerfile
FROM ubuntu:24.04

RUN useradd bob

USER bob

CMD whoami
```

Validate:

```bash
$ docker build -t rootless examples/rootless
# ...

$ docker run rootless
bob
```

### Minimalistic base image

Use minimalistic base images like `debian:slim` or `alpine` instead of full blown image.

But make sure that your app works on Alpine Linux for example, since its using musl instead of the common libc library.

[Distroless](https://github.com/GoogleContainerTools/distroless) are special minimalistic images containing only a libc or a runtime like Node.js or Python. Therefore you have to use multi-stage builds to build your app. Distroless images do not offer a way to install system dependencies via apt, therefore your app has to be self-contained binary, for example Golang or cannot require any system libraries.

Slim base images:

- `debian:slim`
- `alpine`
- `distroless`

### Image signing

To improve your image security and trust-worthiness, sign your images with your private key and validate with public key before starting the image, making sure that the image is the one you want and it was not tampered with (compromised registry or man-in-the-middle attack).

- `cosign sign`

### SBOMs

SBOM or Software Bill Of Materials

SBOMs contain list of all tech, libs, etc. used in the image and their respective version. Thanks to that, security can be accessed based on metadata, prove that image does not contain unnecessary tools, etc. and also track CVEs and patch images respectively.

Inspect SBOMs of an image with `docker scout`:

```bash
$ docker scout sbom --format list <image>

$ docker scout sbom --format list ubuntu:24.04
{"level":"info","msg":"SBOM obtained from attestation, 131 packages found\n","time":"2025-05-28T00:34:31+02:00"}

         Name                    Version             Type
─────────────────────────────────────────────────────────────
  acl                  2.3.2-1build1.1               deb
  apt                  2.7.14build2                  deb
  attr                 1:2.5.2-1build1.1             deb
  audit                1:3.1.2-2.1build1.1           deb
  base-files           13ubuntu10.2                  deb
  base-passwd          3.6.3build1                   deb
  bash                 5.2.21-2ubuntu4               deb
  bsdutils             1:2.39.3-9ubuntu6.2           deb
  bzip2                1.0.8-5.1build0.1             deb
# ... (shortened)
```

Add as build attestation:

```bash
docker build --tag <image> \
  --attest type=sbom,generator=docker/scout-sbom-indexer:latest \
  --push .
```

### Image scanning

- [Trivy](https://trivy.dev)
- Harbor - uses Trivy to scan on push or continuously scan images withing the registry
- validate image signature
  - on push
  - before running

### Migrate from Docker Compose to Kubernetes with "Kompose"

See: https://kompose.io/

Kompose "translates" `docker-compose.yaml` file to Kubernetes manifests.

## Docker alternatives

You may not be able to use Docker, either due to corporate licensing or you simple want only open-source software.

### Podman

[Podman](https://podman.io/) and [Podman Desktop](https://podman-desktop.io/) are RedHat developed open-source alternatives to Docker and Docker Desktop respectively. Both are open-source and can be used as a 1:1 Docker replacement.

### Rancher Desktop

[Rancher Desktop](https://rancherdesktop.io/) in another open-source Docker Desktop replacement developed by SUSE Rancher.

### OrbStack

[OrbStack](https://orbstack.dev/) is fast, but paid Docker Desktop alternative only for Mac.

### containerd

[containerd](https://containerd.io/) is above all a container runtime, but with its CLI tool `nerdctl` and integration with BuildKit, it can be used as a Docker replacement.

MacOS support is buggy.

### portainer.io

[portainer.io](https://www.portainer.io/) is a Web UI for Docker. It helps you easily manage containers on your sever(s) or local machine.

## Thank you! & Questions?

That's all, thank you for your attention.

Questions?

Let's go for a beer 🍻.

## Vojtěch Mareš

- email: [vojtech@mares.cz](mailto:vojtech@mares.cz)
- web: [mares.cz](https://www.mares.cz)
- x (twitter): [@vojtechmares_](https://x.com/vojtechmares_)
- linkedin: [/in/vojtech-mares](https://www.linkedin.com/in/vojtech-mares/)

Did you like the course? Tweet a recommendation on X (Twitter) and tag me (@vojtechmares_) and/or add me on Linked In and I will send you a request for recommendation. Thanks!
