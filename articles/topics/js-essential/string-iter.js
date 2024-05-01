const s='hello world'
const msg=s[Symbol.iterator]()

do{
  console.log(msg.next())
} while (!msg.next().done)

console.log(msg.next())

for (let p of s){
  console.log(p)
}