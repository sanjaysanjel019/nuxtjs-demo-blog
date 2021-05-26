---
title: Understanding Provide and Inject Pattern  in VueJs
description: Are you tired of passing props and events through multiple intermediary components? If so, you can pass data easily with the help of Providers and Inject..
image: https://cdn.hashnode.com/res/hashnode/image/upload/v1622020438166/0gMOHXcha.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress
publishedAt: 2021-05-26
authors:
  - name: Sanjay Sanjel
    avatarUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUstgs8cVrAZ4A2s8adMnLH6X-FtkDWM08Qg&usqp=CAU
    link: https://twitter.com/
tags:
  - VueJs
  - Web Development
  - WebDev
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark

---
We've all known before - passing of data through components. We've heard about terms like **Props** and **Events**. We've watched tutorials and read docs about it. But still, we're in doubt about component communication between parent component and child component. In this post, I will be discussing the potential problem that arises in component communication and how you can handle that via **Provide-Inject **pattern.

## Communication Pattern in VueJs

The most common method of communication between components is obviously through props and events. Before that, I want to make sure that you know the basic design pattern in Vue.

![Vue Component Architecture](https://cdn.hashnode.com/res/hashnode/image/upload/v1622014514153/Kf7UvOusD.png)

So, as we see the UI that we build we Vue consists of individual parts known as **component**. The components are then organized like a Lego so the whole application consists of combination of different individual components.

![Component Design pattern in Vue](https://cdn.hashnode.com/res/hashnode/image/upload/v1622014703902/cVquv38gK.png)

Components are like lego blocks. You combine them to make whole UI of your application.

[ Image source: **Edureka**](https://www.edureka.co/blog/what-is-react/ "Edureka ")

### What are props?
Props are data or custom attributes you can register in a component. We pass data to the child elements via props. That means, if you want to pass data from parent component to child component, you pass it through props.

![Vue Props and Component Communication](https://cdn.hashnode.com/res/hashnode/image/upload/v1622015982588/S3cxncNvj.png)

Okay, but how do we pass data from child components to parent component then ? Well, we do this with the help of events. We trigger an event and send it all the way through other components to the Main component.


![Event Communication with Vue Components](https://cdn.hashnode.com/res/hashnode/image/upload/v1622016215337/FZiom1lOL.png)

So, it's that simple. 

- Passing data from parent to child components -> Via **Props**
- Passing data from child to parent components -> Via **Events**

##  So, what is the real problem here?

The real problem arises when we have nested components and the components at the bottom has to send events to the **MainApp **Components or if **MainApp **component has to send props to the end child components.

The problem is we have to pass props through all **intermediary components** all the way through the end child components. This means we have to emit custom events in each component and also expect props in each component.

![Component Commuication Problem](https://cdn.hashnode.com/res/hashnode/image/upload/v1622016949363/9G2UXgNlA.png)

So, as we see, the data that we want to send from **MainComponent** to the **child-component** need to pass through different other components which may have no logical associations with the data provided.

Here's where **Provide-Inject ** pattern comes into action. We provide the data we want to send via **Provider **and **Inject **the data to the associated component.

![Provide- Inject Pattern in VueJS](https://cdn.hashnode.com/res/hashnode/image/upload/v1622017701463/Q6TwyepWv.png)

So, in this way we send data directly to the associated components without sending multiple props chain through intermediary components.

## Let's understand it with Code Example

Let us consider three components for our simple project.

- MainApp Component ( Root Component)
- PostList Component ( Parent Component)
- PostDetail Component (Child Component)

Here is the component structure.

![Component Structure VueJs Project](https://cdn.hashnode.com/res/hashnode/image/upload/v1622018861971/aAN-FzX5Y.png)

### MainApp Component

This component has one other component **PostList** to display the Posts. We pass `students` as a props to the PostList component and also have an event named as `clicked-one` that triggers `displayMessage` methods.

```
<template>

  <h1 v-if="isDisplayHeading"> Black + White Zetsu </h1>
  <PostList :students="students" @clicked-one="displayMessage"/>

</template>

<script>

export default {
  name: 'App',
  components: {
    PostList
  },
  data(){
    return{
      isDisplayHeading:false,
      students:[
        { 
          name:"Sarthak",
          age:23,
          address:"New York"
        },
         { 
          name:"Orochimaru",
          age:16,
          address:"Konoha"
        }
      ]
    }
  },
  methods:{
    displayMessage(){
        this.isDisplayHeading= !this.isDisplayHeading;
    }
  }
}
</script>


``` 
### PostList Component

This component receives `students` as props from MainApp Component. This component also renders the `PostList` component passing data properties such as `name`, `address`, and `age`.

```

<template>

  <PostList 
  v-for="student in students"
  :key="student.id"
  :name="student.name"
  :address="student.address"
  :age ="student.age"
  @clicked-one="$emit('clicked-one',$event)"
  />

</template>

<script>

export default {
     props: ['students'],
    emits:['clicked-one']

}
</script>


```


### PostDetail Component

The `PostDetail` components receives `name`,`address` and `age` as props from it's parent component `PostList`. It also emits custom event known as `clicked-one` that is forwarded via it's parent component `PostList.`


```javascript
<template>
 
   <p @click="$emit('clicked-one',name)">The name is {{name}} and he lives in {{address}} </p>

</template>

<script>
export default {
  props:['name','address','age'],
  emits:['clicked-one']
}
</script>



``` 


In the code above, we are passing an array of data called `students` as a prop to the **PostList**
 component from **MainApp**.

Again in a similar fashion, we are sending details of individual students' information like `name`,`age`,`address` to **PostDetail** component in **PostList **component.

![Sending of props from MainApp to PostDetail](https://cdn.hashnode.com/res/hashnode/image/upload/v1622019297804/AIUF1XMLG.png)

We want this same code to be refactored and do it using **Provide-Inject** mechanism.

###  Refactoring Code using Provide-Inject

#### MainApp component

```
<template>

  <h1 v-if="isDisplayHeading"> Black + White Zetsu </h1>
  <PostList :students="students" @clicked-one="displayMessage"/>

</template>

<script>

export default {
  name: 'App',
  components: {
    PostList
  },
  data(){
    return{
      isDisplayHeading:false,
      students:[
        { 
          name:"Sarthak",
          age:23,
          address:"New York"
        },
         { 
          name:"Orochimaru",
          age:16,
          address:"Konoha"
        }
      ]
    }
  },
provide() {
            return {
                students: this.students
            }
        },
  methods:{
    displayMessage(){
        this.isDisplayHeading= !this.isDisplayHeading;
    }
  }
}
</script>


```
We can now remove props that we pass to the PostDetail and inject data to it.

```

<template>

  <PostList 
  v-for="student in students"
  :key="student.id"
  :name="student.name"
  :address="student.address"
  :age ="student.age"
  @clicked-one="$emit('clicked-one',$event)"
  />

</template>

<script>

export default {
inject:['students'],
    emits:['clicked-one']

}
</script>


```
Here we have injected `students` data that is provided by the **MainApp**.

**Note:** You can only inject data that you provide through higher level components.

The idea may not be exactly clear with a few components as provided in the example here. However, in components that is nested in levels, **Provide and Inject** helps you to reduce the code and also simplify it.

**Note:**  *** This blog is an outcome of detailed notes about learning Vue. If any ideas or concepts here are erroneous, please let me know.  Suggestions are always welcome. ***



