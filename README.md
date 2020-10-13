# my awesome blog

> sunnywang's blog, powered by gatsbyjs

## Usage

```
npm i
npm start
```

## Develop

```
npm run dev
```

## Deploy

```shell script
npm run deploy
```

> Use `gh-pages` tool push `public` files to `master` branch

## TODO

- [x] Blog list add pagination
- [ ] Article page add share links
- [ ] Article page add comment
- [ ] Add tags page
- [ ] Data fetching use external service as api backend

## Troubleshooting

1. Failed to install `sharp` on mac 10.15

1) build `libvips` from tar ball,
   see [https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball](https://libvips.github.io/libvips/install.html#building-libvips-from-a-source-tarball)
2) `./configuration --with-webp --with-graphicsmagic --without-tiff`
   (On my mac, libtiff will cause error, but `brew info tiff` is installed, wired)
3) npm i --unsafe-perm --verbose
4) If npm failed, on my mac, caused by `zlib`, because zlib pkg-config file `zlib.pc` is wrong with old brew
   , reinstall zlib: `brew reinstall zlib`

## License

MIT
