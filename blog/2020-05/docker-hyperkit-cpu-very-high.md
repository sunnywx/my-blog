---
title: docker hyperkit进程cpu占用超过100%
description: com.docker.hyperkit cpu very high
date: 2020-05-06 19:26
snapshot:
  - /images/docker-cpu.jpg
---

解决方法很简单： 在`docker desktop` 设置里，把 cpu 调成 1 核。

这样 `com.docker.hyperkit` 后续 cpu 占用不会超过 100%

![](/assets/images/docker-cpu.jpg)
