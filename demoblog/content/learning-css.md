---
title: Learning CSS I never heard  of
description: Let's learn about some of the interesting CSS stuffs that you may never heard of....
image:  https://cdn.hashnode.com/res/hashnode/image/upload/v1617299285287/3OgmI5gq7.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress
publishedAt: 2021-04-01
authors:
  - name: Sanjay Sanjel
    avatarUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUstgs8cVrAZ4A2s8adMnLH6X-FtkDWM08Qg&usqp=CAU
    link: https://twitter.com/
tags:
  - CSS
  - Web Development
  - Frontend Tricks
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark


---



In this series of the blog post, I will be writing about CSS properties that I never knew existed. I am not much of a frontend developer by myself but I found these properties to be pretty interesting. So,I thought it will be a great idea to share what I learnt which will further enhance my learning and information retaining process too.


> These articles are pretty much like tutorial docs to things I learn. So, your suggestions on how to maintain and further how to develop good writing would be immensely helpful.

### Properties no. 1 : `place-items:center`

We all know sometimes centre a `<div>` element could be a problem.(especially for beginners). The margin, padding sometimes messes up and results in a lot of frustration. Initially, for me, I didn't understand much of how CSS worked and I hated writing CSS. So, this property will be pretty handy if you are already writing CSS.

**Note: This will only work on CSS layout options: Grid and Flexbox**

To use this property we'll have a short HTML code where we will have one parent and a child element.

```html
<div class="container">
  <div class="box">
<p>Hello   World</p>
  </div>
</div>

```
So, we have a parent-div called as `container` and a child div called `box`.
 Inside the `box` div, we have a simple `<p>` tag.

Let's add a bit of styling to our page.

```css
.container{
  background-color:coral;
  height:200px;
  width:500px;

}

.box{
  padding:10px;
  background-color:skyblue
}
```

This is how our current layout looks:

![current.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1596783389450/6a-GY6cp1.png)

Now, let's add a bit of line to our CSS Code. 

First, we specify the parent element to `display: grid` and then insert our magical line of code i.e. `place-items: centre`. Here is what our final CSS code will look like :

```css
.container{
  background-color:coral;
  height:200px;
  width:500px;
  display:grid;
  place-items:center
}

.box{
  padding:10px;
  background-color:skyblue
}
```
So, what `place-items: centre` does is that it places the child element of it at center, so even if you alter the screen-size, the child element will always be placed in the center of the parent element.

Here's how our design will look like after the final CSS :

![finallayout.PNG](https://cdn.hashnode.com/res/hashnode/image/upload/v1596783619697/fkt0uczf9.png)

So, as you see, with just a single line of code, it became much easier to center the child elements.

In case you don't want to write the code yourself, here's a CodePen [ link.](https://codepen.io/sanjaysanjel/pen/gOrbxdj) 