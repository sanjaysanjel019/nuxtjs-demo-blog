---
title: What is Byte Pair Encoding and how does it work in LLMs ?
description: Tokenization is one of the most basic things one learns when they want to dive deep into how LLMs actually function. Though the primary objective is very simple, the way things are implemented to optimize the LLMs are very thoughtful and intersting.
image: https://cdn.hashnode.com/uploads/covers/6a53a8c8c43edf0829ce4cd9/bebb3744-57bd-4b08-b18d-6ccb9d8b15e0.png
publishedAt: 2026-07-12
authors:
  - name: Sanjay Sanjel
    avatarUrl: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUstgs8cVrAZ4A2s8adMnLH6X-FtkDWM08Qg&usqp=CAU
    link: https://twitter.com/
tags:
  - Artificial Intelligence
  - Tokenization
  - Building LLMs from Scratch
link: https://codesandbox.io/embed/nuxt-content-l164h?hidenavigation=1&theme=dark



---
**Understanding Byte Pair Encoding mechanism for creating Tokens in a LLM**

Tokenization is one of the most basic things one learns when they want to dive deep into how LLMs actually function. Though the primary objective is very simple, the way things are implemented to optimize the LLMs are very thoughtful and intersting.

In this post, we'll be learning about how Byte-pair encoding words, what it is actually used for, how it's implemented in major LLMs and  try to understand the core of LLMs as much as possible.

***So why do you need tokenization in the first place ?***

We need to break down the inputs that is provided to the LLMs in a way which is efficient and understandable. For this, a certain weitage needs to be given to the input that is provided,so that the LLM is able to interpret the input that is provided. For this, the inputs are broken down to something called tokens, which are then fed to the LLMs.

For ex: "This is a piece of input text that needs to be fed to an existing LLM" is a phrase, say an input phrase. Now, how do we represent and provide this information to the LLM.

One simple way is we can break this down into each word, so that our input would be something like : 

```python
["This","is","a","piece","of","input","text","that","needs","to","be","fed","to","an","existing","LLM"]
```

When we break our input into separate distinct word, we normally call them "Word Based Tokenizer".

The idea here is simple, but we run into a problem pretty soon. 

Since we feed a large corpus of data to build a LLM, what if a new words arrives or how can we represent different meaning of similar words. In this scenario, we will run into a problem 
commonly known as Out of Vocabulary (OOO). If we build our LLMs tokenization taking into account the word based tokenizer, we'll have problems if new words are fed on the LLMs.

For ex: boys and boy are similar, but carry a small difference on it's usage and understanding.

We could go even minute and break out words into each character - we normally call them "Character Based Tokenizer". Our input would be something like : 
```python
[
    'T', 'h', 'i', 's', ' ', 'i', 's', ' ', 'a', ' ', 
    'p', 'i', 'e', 'c', 'e', ' ', 'o', 'f', ' ', 'i', 
    'n', 'p', 'u', 't', ' ', 't', 'e', 'x', 't', ' ', 
    't', 'h', 'a', 't', ' ', 'n', 'e', 'e', 'd', 's', 
    ' ', 't', 'o', ' ', 'b', 'e', ' ', 'f', 'e', 'd', 
    ' ', 't', 'o', ' ', 'a', 'n', ' ', 'e', 'x', 'i', 
    's', 't', 'i', 'n', 'g', ' ', 'L', 'L', 'M'
]
```

But then again, this will create a very small vocabulary - and also have a problem of representation of meaning or context. Here each character cannot be able to properly convey meaning or provide any relavent context.

Let's circle back to our two algorithms we've discussed until now : 

1) ***Word Based Tokenizer*** : good, but will run into out of vocabulary issue. Unable to represent different meaning of different words.
2) ***Character Based Tokenizer*** : very small vocab, so easy to implement and also solved out-of-vocabulary issue. But it cannot represent meaning or context of provided input.

So, then how can we effectively solve this problem ? Create a system of tokenization that solves both out of vocab problem and also provides us a way to inject context and represent
meaning.

Here we come across a concept called Subword Based Tokenization. The Subword based tokenization helps to solve the problem that is stated above.
There are two specific rules we follow for subword based tokenization : 

**Rule #1 :** Do not split frequently used words into smaller subwords 
**Rule #2 :** Split the rare worsds into smaller meaningful subword.

What does it mean ? Let's see below : 

"boy" should not be split into subwords.
"boys" however can be splitted into boy+s.

Here we can take "boy" as a root word. and "s" as another word.
So, if we split the words in this way : we could potentially make a case that "boy" and "boys" are related or similar in some way.

Subword Splitting helps the model learn that different words with the same root words. 

Similarly, this way of splitting the words also helps the model learn that the word "modernization:" and "tokenization" has different ROOT words.

**Byte Pair Encoding**

Byte Pair Encoding(BPE) is a subword tokeniztion mechanism.
BPE is an algorighm that works on the idea : most common pair of consecutive bytes of data is replaced with a byte that does not occur in data.

Let's understand this with a simple example:

For ex: 

We have a text such as :::: aaabdaaabac

Here the byte pair "aa" occurs the most. We will replace it with let's say "Z".

So the word aaabdaaabac will be ---> ZabdZabac

The next common byte pair is ab. Let's replace it with Y.

So the word ZabdZabac will be --> ZYdZYac

Now, in this word ZYdZYac we do not have a common byte-pair, so we stop here. Although ac is a byte pair here but it only occurs once, so we ignore it for now.

Our final compressed data is : ZYdZYac

In this way, we've essentially compressed our data and represented in a way that will be easier to fed into a LLM.

Byte Pair Encoding ensures that most common words in the vocab are represented as a single token while rare words are broken down into two or more subword tokens.



