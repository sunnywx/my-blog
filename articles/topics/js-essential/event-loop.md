event loop
==

## overview

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```
(每个方框代表event loop的某个阶段, 图表来源于nodejs官网)

## Phases Overview
- timers: this phase executes callbacks scheduled by setTimeout() and setInterval().
- pending callbacks: executes I/O callbacks deferred to the next loop iteration.
- idle, prepare: only used internally.
- poll: retrieve new I/O events; execute I/O related callbacks (almost all with the exception of close callbacks, the ones scheduled by timers, and setImmediate()); node will block here when appropriate.
- check: setImmediate() callbacks are invoked here.
- close callbacks: some close callbacks, e.g. socket.on('close', ...).

in js, everything is a task

## macro task
宏任务，包括 setTimeout, setInterval, setImmediate. 这里 setImmediate 在 一次tick的 check阶段执行，如果是在 io cycle里
setImmediate的优先级高于 setTimeout

## micro task
微任务，包括 promise

## process.nextTick
由process.nextTick发起的callback, 会被加到 nextTick queue，优先级高于微任务

## execution order

main thread code > nextTick queue > microtask queue > macrotask queue

- process.nextTick() fires immediately on the same phase
- setImmediate() fires on the following iteration or 'tick' of the event loop

```js
const foo = () => console.log('foo')
const bar = () => console.log('bar')

const baz = () => {
  console.log('enter baz')
// foo();
  setTimeout(foo, 0)

  process.nextTick(() => console.log('call nextTick'));

// promise add task to job queue which has a higher priority than normal queue like settimeout
  new Promise((res) => {
// promise executor func is executed immediately
    console.log('enter promise')
    res('promise resolved') // delayed when job queue popped
  }).then((msg) => console.log(msg))

  bar()
}

baz()
```

## Ref

- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- [https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/#what-is-the-event-loop)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)
- javascript concurrency book