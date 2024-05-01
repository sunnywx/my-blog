class Person{}

function setPerson(obj){
  // pass by value, obj now point to same addr as person
  console.log(obj === person)
  obj.name='awesome'

  // obj point to different object
  obj=new Person()
  obj.name='another'
  console.log(obj === person)

  // when func finished, obj will be freed
}

const person=new Person()
setPerson(person)
console.log(person)