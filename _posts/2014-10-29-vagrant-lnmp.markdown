---
layout: post
category: "web"
title: "vagrant with LNMP stack"
tags: ["vagrant", "lnmp"]
---

####安装vagrant
    1.安装[virtualbox]https://www.virtualbox.org/wiki/Downloads
    2.下载最新的[vagrant]http://downloads.vagrantup.com/
    3.下载打包的 linux系统 http://www.vagrantbox.es/

####启动vagrant
    vagrant init
    vagrant box add [ubuntu-precise32] //选择你下载到本地的vagrant box 或者在线的box
    例如安装 php-laravel homestead开发环境可以这样操作： vagrant box add laravel/homestead
    vagrant up

####在vagrant 虚拟机(我的系统是 ubuntu-precise32) 中搭建nginx + php-fpm + mysql等开发环境
    apt-get update
    apt-get install vim
    apt-get install build-essential     //安装gcc, g++等构建环境
    apt-get install python-software-properties

    //安装nginx
    apt-get install nginx
    service nginx start

    //在ubuntu12.04中安装 php5.4
    add-apt-repository ppa:ondrej/php5  //添加新的源
    apt-get update

    //安装php-fpm
    apt-get install php5-fpm

    //安装其它php 的库
    apt-get install php5-cli php5-mysql php5-curl php5-gd

    //安装mysql
    apt-get install mysql-server

    //安装git
    apt-get install git-core

    //安装composer (php自动化构建工具)
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer

    //安装node.js
    apt-get install nodejs
