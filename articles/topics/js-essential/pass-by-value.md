pass by value
==

> js中函数的参数传递 都是 `按值传递` (pass by value), 无论基础类型 (undefined, null, string, number, bool, symbol), 还是引用类型 (object, array, function)

## primitive value

当传递基础类型时，很好理解，函数参数只是作为函数的局部变量，复制了基础类型的值，这里string在js 里也是基础类型，无论string的长度有多大，
在赋值时都是完整复制value，这与 c 这样的语言不同，在c里 string是字符数组, 按引用传值。

## compound value

当传递复合类型时，直觉的理解，js 好像是按引用传值的，其实不对，当函数参数被外部的引用变量赋值时，函数参数其实是copy了引用变量的地址 (类比c的指针)。

假如是按引用传值，那么参数和外部变量指向的始终是同一个对象，这样在对内部参数在赋值时，外部变量也会被改变，然而在 js里这是不可能的，当修改了内部参数的指向，
这时参数就和外部变量的指向分离了。

```ts
class Person{}

function setPerson(obj){
  // pass by value, obj now point to same addr as person
  console.log(obj === person) // true
  obj.name='awesome person' // assign property will not change obj pointer

  // obj point to different object
  obj=new Person()  // assign new object, obj point to different addr
  obj.name='another'
  console.log(obj === person) // false

  // when func executed here, obj will be freed
}

const person=new Person()
setPerson(person)
console.log(person)
```

- 基础类型的变量在stack上分配内存
- 复合类型的变量(object)在heap上分配内存