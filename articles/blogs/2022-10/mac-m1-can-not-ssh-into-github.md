---
title: 解决mac m1 无法ssh到github
date: 2022/10/20
desc:
tags:
  - mac
  - github
---

今天在mac m1 去`git fetch`某个项目的上游，发现用ssh的方式要输入密码，而之前一直用https的方式，最近github出于
安全考虑，禁用了https方式下的`git push`，当然借助access token和credential helper也能在https下无密码push。
然而ssh是更方便和更安全的方式，就去排查为什么原来的pubkey无法使用。

先看ssh接连时的debug信息
```shell
ssh -T git@github.com -vvv
```

我用的key是 `ed25519` 的加密，结果是尝试了一堆私钥后，github最后没有发送数据包，拒绝了ssh的方式

<!-- ![](/assets/images/ssh-01.webp) -->

默认回退到了password的方式，fuck。。

于是在网上搜问题，各种google, stackoverflow，有的说是 `~/.ssh`目录下的权限导致的，比如 `~/.ssh/*.pub` 必须是 mode 0644，其它文件权限是 mode 0600, 检查都没问题。
再考虑本地起 ssh-agent, ssh-add把github的私钥添加到agent，步骤如下

```shell
eval "$(ssh-agent -s)"
```

在zsh环境下，可以
```shell
exec ssh-agent zsh
```
最终的效果都是启动了一个 ssh-agent进程，zsh的方式会启动两个ssh-agent进程。

再将github的私钥加到agent
```shell
ssh-add --apple-use-keychain ~/.ssh/id_ed25519
```

这里 `--apple-use-keychain`仅仅针对mac 12.0以后的版本，之前的可以用 `-K, -A`参数。

再去`ssh -Tvv git@github.com` 还是不行，用`ssh-add -D`删除agent里的所有私钥，只添加github的私钥还是不行。
这下有点慌了，就去github ssh settings里把之前的公钥删掉，重新新建密钥对，重复上面的步骤，并仔细看 ssh的debug信息，依旧不行。

## ssh over https

折腾了半天，看来ssh这条路要放弃了，只能老老实实用https，然而不甘心，又耐心把github的ssh有关的文档看了看，发现还有一种可以通过https去ssh
的方式，看到希望了。

```shell
$ ssh -T -p 443 git@ssh.github.com
Hi sunnywx! You've successfully authenticated, but GitHub does not provide shell access.
```

注意这里shell的是 `ssh.github.com` 而不是之前的 `github.com`.

还差最后一步，就是要在 `~/.ssh/config`里加上强制ssh到github.com的请求都走 https的443端口

```shell
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

测试一下
```shell
ssh -T git@github.com
```

You've successfully authenticated.

好了，问题解决，但是为什么原来的 rsa, ed25519, ecdsa的密钥都不行，怀疑是github服务器上的sshd 的authorized_keys导致的，也可能是我mac m1环境的问题。
这个事说明，文档还是要耐心去看的，debug日志也要耐心看 ：）

## 参考资料

- [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/cn/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [Using SSH over the HTTPS port](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port)