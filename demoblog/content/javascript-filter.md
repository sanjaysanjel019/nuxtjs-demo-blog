---
title: Understanding Javascript Filter - Beginner's way to understand
description: How would you describe Javascript Filter method to a beginner....here is how
image:  https://cdn.hashnode.com/res/hashnode/image/upload/v1595504976074/eedE6oFsm.png
publishedAt: 2021-04-01
authors:
  - name: Sanjay Sanjel
    avatarUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUstgs8cVrAZ4A2s8adMnLH6X-FtkDWM08Qg&usqp=CAU
    link: https://twitter.com/
tags:
  - Javascript
  - ES6
  - Modern Javascript
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark


multiselectOptions:
  - VuePress
  - Gridsome
  - Nuxt

---


`filter()` is a Javascript Method which was added to the ECMA-262 standard in the 5th edition. `filter()` provides an easy way of creating a new array out of an existing array under certain constraints.
Simple Definition

`filter()` method creates a new array with certain constraints that are provided to the original array.
## An intuitive sense of Javascript Filter

As the name says, Javascript `filter()` does what is says. It filters things. As naive as it may seem , it actually is the case. Let's take an example of a simple water filter - what does it do ? It takes impure water, filters out dirty things and gives you clean water. The same analogy can be applied to Javascript filter. It takes an array, and you put certain constraints (like remove dirty things) and then gives you another array of items.


![filter.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1595504976074/eedE6oFsm.png)

As we see in the above picture, it takes an array(here a array of red and yellow arrows) and we provide a certain filter(give me only red lines) and as a result you get a array of only filtered yellow arrows.
Syntax and Uses

`filter()` has the following syntax.

```javascript
var newArray = newArray.filter(function(items){
if(condition)
      return true;
})
```

Let's understand with a simple example:

Let's suppose that you have an array that contains students marks. So, now you want to give a simple present to students who have scored marks greater than 90. For this you'll have to separate the marks array that contains marks of students of the whole class into only those who have secured more than 90 marks.

`const studentsMarks = [40,35,89,92,94,46,98,65,93,97,45];`

As we know, we want to filter only those students who have secured more than 90 marks and place them in a separate array called topStudents. Here's how we do that using `filter()`:

```javascript
const topStudents = studentsMarks.filter(function(student){
if(studentsMarks>90)
{ return true; }
})
```

Just writing this will create a new array named topStudents that will contain all the students who have secured marks more than 90.

If you `console.log(topStudents)` you'll see the following results:

[92,94,98,93,97]

So, as you see this makes it much easier to create a new array out of an existing array.
## Minimizing our existing code

For much simplicity and less code, the above code could be written using arrow functions. Let's see how we can minimize the code written above:

```javascript
const topStudents = studentsMarks.filter(function(student){
return student>90;
})
```

So, we omitted the `if()` statement using the above code which made our code less. This could even be made more beautiful using arrow function. Here's how we can write using arrow functions.

```javascript
const topStudents = studentsMarks.filter(student => student>90)
```

So, using arrow functions we minimized our code to just one line. This makes code much more beautiful, simple and easy to maintain. That's why I'm in love with Modern Javascript.
