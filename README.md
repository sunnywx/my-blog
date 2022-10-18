# wx-blog

> My awesome blog built with preact


## Setup

```shell
git clone --depth 1https://github.com/sunnywx/sunnywx.github.io.git my-blog
cd my-blog
yarn
```

## Develop

```shell
# generate all blogs
yarn gen:blog-urls

# run mock server to serve previous seed data
yarn mock:server

## run preact-cli dev mode
yarn dev
```

## Production

```shell
yarn build
yarn serve
```

## Deploy to github page

```shell
yarn dep:github
```

## Deploy to own vps

```shell
yarn dep:vps
```

## License 
MIT