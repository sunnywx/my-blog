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

## Troubleshooting

1. `npx gh-pages -d build -b gh-page` fatal: A branch named 'gh-page' already exists.
    解决方法: `rm -rf node_modules/.cache/gh-pages`

## License 
MIT