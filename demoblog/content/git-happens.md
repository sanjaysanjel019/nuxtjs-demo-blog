---
title: TryHackMe - GitHappens writeups
description: Let's have a look and a thorough follow through of how to solve the GitHappens room of TryHackMe.....
image: https://cdn.hashnode.com/res/hashnode/image/upload/v1617299955534/qf4IlEd40.png?w=1600&h=840&fit=crop&crop=entropy&auto=compress
publishedAt: 2021-04-01
authors:
  - name: Sanjay Sanjel
    avatarUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUstgs8cVrAZ4A2s8adMnLH6X-FtkDWM08Qg&usqp=CAU
    link: https://twitter.com/
tags:
  - Hacking
  - TryhackMe
  - Try Harder
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark



---

This will be my first writeup of  THM machine and I hope that this will be helpful for all people seeking.


So, As the name suggests the Room is 'Git Happens' meaning that there must be something related to Git. So, let's start and deploy the machine.

Now, let's go to our deployed machine. Once you've deployed your machine visit the address and you'll be greeted by a login page as below.
![git1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1598602480907/n_I7oxnPa.png)


 We'll be using a tool called  [GitTools by Interwache](https://github.com/internetwache/GitTools) . You can visit the Github repo and clone the repo.

I suggest you to make a folder and then clone the repo for easiess. So,as soon as you clone the repo you may explore the folder and find .git folder.

You'll find a folder called **Dumper**.  Inside it you can find a file called `gitdumper.sh`. 


As we all know this room is somehow dedicated to Git, I just tried to access .git directory at the end. Once you visit the **IP_ADDR/.git ** link you may be redirected to the page like below.

![git2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1598602572048/Hlzrj8ksd.png)

Now, let's start the process.

1. Go to the folder where you cloned the GitTools repo.
2. Navigate to GitTools>Dumper and run gitdumper.sh by the following code
```
./gitdumper.sh YOUR_MACHINE_IP/.git FOLDER_NAME
```

Replace the **YOUR_MACHINE_IP **with the IP address of your machine and **FOLDER_NAME **with any desired name.

The code will take a while and download all the activities from that Git repo along with all the commit messages and changes.

![git3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1598602587394/C8qIpP1eF.png)

If you write` git log --pretty=oneline` you can see all the commit messages of the git repo.

So, the main idea is to see all the changes in the git repo and see if we find something interesting. For that we'll dive into each commit messages  SHA and view all the changes that were created with each commit.

So, we'll git log all the commits, choose the SHA and then git show all of them. Feeling overwhelmed? Here's the code.

`git log | grep commit | cut -d " " -f2 | xargs git show`

So, what we're doing as mentioned above is logging all the commit messages, cutting all unnecessary texts and then showing all content of the git.

You'll have list of all commit codes as show below.

![hydra.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1598602746993/YFGWdP_zF.png)

After you run this command, all the git changes will be shown.  Since we have to search for login functionality, we'll be looking for login() function if it exists.

You'll find a **`login()`** function  written in plain Javascript where the creator is checking if the admin is valid or not. You'll find the required key in the password.

Scroll down and check for the `login()` function and VOILA there you'll have your flag.

Thank you for reading. This is my first post and attempt so any suggestions and truly welcome.