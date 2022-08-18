# Toonie,

This is a collaborative app for revising image blueprints together

## Developing Toonie

For building Toonie, You'll first need Node.js installed(Node.js version 16+ and npm version 7.10+ are required).

Toonie requires local applications such as Envoy, Yorkie. To start them:

```
docker-compose -f docker/docker-compose.yml up --build -d
```

Next, Let's starts Toonie in the development mode.

```
$ yarn
$ yarn start
```

## Deploying

When PR is merged into main, it is automatically distributed by GitHub Actions.

### Layout

Toonie is deployed to AWS and the configuration is shown below. This repository is used to distribute static pages.

```
[Route53]
 ㄴ toonie.yorkie.dev - [gh-pages] # for serving static pages
 ㄴ api.yorkie.dev      - [EKS]      # for serving API
```
