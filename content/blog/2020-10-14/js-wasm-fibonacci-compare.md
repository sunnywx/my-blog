---
title: javascript vs webassembly fibonacci benchmark
description: JS和WASM的斐波那契数计算的性能对比，很有趣...
tags:
  - js
  - wasm
date: 2020-10-14 10:31
snapshot:
  - /images/js-wasm-bench.png
---

![](/images/js-wasm-bench.png)

## Rust 环境准备

我准备用`rust`来编译到`wasm`，当然你也可以用 `c/c++`, `go`, `assemblyScript/typescript` 来 compile 到 wasm.

首选准备 rust 环境，安装`rustup`

```shell script
curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh

export PATH="$HOME/.cargo/bin:$PATH"

# 检查rustc 安装成功
rustc --version
# 检查 cargo 安装成功
cargo --version

# 安装wasm的编译目标
rustup target add wasm32-unknown-unknown

```

## 创建 rust lib，编译到 wasm

使用 cargo(rust 的包管理器和 build 工具) 创建一个 type 为 library 的项目

```shell script
cargo new begin_wasm --lib
```

cargo 初始化的目录结构是

```
├── Cargo.toml
└── src
    └── lib.rs
```

`src/lib.rs`就是要编译到 wasm 的 rust 文件，先加入斐波那契数的函数，稍后编译到 wasm 里。

```rust
#[no_mangle]
pub fn fib(n: u32) -> u64 {
    match n {
        0 => 1,
        1 => 1,
        _ => fib(n - 1) + fib(n - 2),
    }
}
```

编译到 wasm

```shell script
cargo build --target wasm32-unknown-unknown
```

这时在项目目录下会多出一个`target`目录，默认 cargo 是在 debug 模式下编译，wasm 文件体积会稍大点。
生成的 wasm 文件在 `target/wasm32-unknwon-unknown/debug/begin_wasm.wasm`

## JS 端创建测试页面

```shell script
touch index.html
```

index.html 的内容如下

```html
<!DOCTYPE html>
<html>
  <head>
    <title>rust wasm</title>
  </head>
  <body>
    <h2>Fibnacci benchmark: JS vs Wasm</h2>

    <div id="result">
      <div id="fib-js"></div>

      <div id="fib-wasm"></div>
    </div>

    <script>
      const wasm_file = "target/wasm32-unknown-unknown/debug/begin_wasm.wasm"

      const fib = n => {
        if (n === 0 || n === 1) {
          return 1
        }
        return fib(n - 1) + fib(n - 2)
      }

      const t1 = Date.now()
      const res_js = fib(40)
      const t2 = Date.now()

      document.getElementById(
        "fib-js"
      ).innerHTML = `==JS==: Calc fib(40), time=${(t2 - t1) /
        1000}s, res=${res_js}`

      const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 }) // alloc wasm memory size

      WebAssembly.instantiateStreaming(fetch(wasm_file), {
        js: { mem: memory },
      }).then(mod => {
        const wasm_exports = mod.instance.exports

        const t1 = Date.now()
        const res_wasm = wasm_exports.fib(40)
        const t2 = Date.now()

        document.getElementById(
          "fib-wasm"
        ).innerHTML = `==WASM==: Calc fib(40), time=${(t2 - t1) /
          1000}s, res=${res_wasm}`
      })
    </script>
  </body>
  <html></html>
</html>
```

## 开启本地 http server

本地测试的话，可以有很多方式开启 http server，你可以用 cargo 安装 rust 版的 http server

```shell script
cargo install https

http  # 启动http server
```

也可以 nodejs 的 npm 安装 http server

```shell script
npm i http-server

http-server .
```

然后打开浏览器(比如我的 chrome)，进到测试页面, benchmark 对比：

![](/images/js-wasm-fib.jpg)

## 总结

以上是对比 js 和 wasm 计算 斐波那契数列的第 42 项，也是很大的一个数了，js 用的时间竟然比 wasm 少?（什么原因呢，各位观众可以在评论区留言发表看法:-p）
wasm 的性能和 c/c++差不多，这里应该是 chrome v8 引擎在处理 js 的计算时做了编译优化，让 js 计算 fib(42) 甚至比 wasm 还快。

当然局部的 benchmark 对比看不出什么优势，在重计算的项目(cpu 密集型)中，wasm 的优势就会比 js 明显。

未来 WASM 会和 JS 优势互补，二者不是对立的关系，wasm 也不会取代 js，wasm 只是增强了 js，就像 typescript 只是给 js 加了类型和静态分析。

很愉快的 WASM 之旅，happy coding :)
