<h1 align="center">Welcome to Adonis User Policy 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/mikield/adonis-user-policy#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/mikield/adonis-user-policy/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/mikield/adonis-user-policy/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/mikield/Adonis User Policy" />
  </a>
  <a href="https://twitter.com/AdmiralMiki" target="_blank">
    <img alt="Twitter: AdmiralMiki" src="https://img.shields.io/twitter/follow/AdmiralMiki.svg?style=social" />
  </a>
</p>

> Adonis User Policy (Authorization). <br> This is a trait wich adds `can` and `canNot` methods to User Model (or other class :smile:)

### 🏠 [Homepage](https://github.com/mikield/adonis-user-policy#readme)

## Install

```sh
adonis install @mikield/adonis-user-policy
```

#### This package relies on https://github.com/mikield/adonis-true-traits which is included when installing the user policy package. You need to register its provider in `start/app.js`

```js
const providers = [
  ...,
  '@mikield/adonis-true-traits'
]
```

## Usage

#### Mix `User` model class with a `PolicyTrait` class

```js
'use strict'

const Model = use('Model')
const PolicyTrait = use('@mikield/adonis-user-policy')

class User extends Model {
  ...
}

module.exports = mix(User).with(PolicyTrait)
```

##### If you want to create user related policy checks, for example `user.can('createPosts')` — then, for example:

###### Create a Policy `User.js` under `app\Policies` folder.

```js
'use strcit'

class User {
    static createPosts(user) {
       return !user.roles.contains('create-post') //We can check a user role for example
    }
}

module.exports = Post
```
###### And attach it to `User` model.

```js
'use strict'

const Model = use('Model')
const PolicyTrait = use('@mikield/adonis-user-policy')

class User extends Model {

  //User policy
  static get policy(){
    return 'App/Policies/User'
  }

}

module.exports = mix(User).with(PolicyTrait)
```

##### Or if you want to check access based on another model — then, for example:

###### Create a Policy `Post.js` under `app\Policies` folder.

```js
'use strcit'

class Post {

    static add(user, post) { //In this case the post will be a class and not a instance
       return !user.banned //User can create a Post if it is not banned
    }

    static edit(user, post){ //In this case the post will be a instance and not a class
       return post.owner.id === user.id //Only the owner of the post can edit the post
    }
}

module.exports = Post
```

##### Next register a Policy in other `Post` model.

```js
'use strict'

const Model = use('Model')

class Post extends Model {

  //Post policy
  static get policy(){
    return 'App/Policies/Post'
  }

}

module.exports = Post
```


##### On a User instance call `can` or `canNot` function.

###### Without `Post` model.

```js
const User = use('App/Models/User')

Route.get('/test-user-policy', async () => {
  const user = await User.find(1)

  if(user.can('createPost')) {
    ...
  }

  if(user.canNot('createPost')) {
    ...
  }
})

```

###### With `Post` model.

```js
const User = use('App/Models/User')
const Post = use('App/Models/Post')

Route.get('/test-user-policy', async () => {
  const user = await User.find(1)
  
  if(user.can('add', Post)){
    ...
  }

  if(user.canNot('add', Post)){
    ...
  }
})

```

###### With `Post` instance (existing Post object).

```js
const User = use('App/Models/User')
const Post = use('App/Models/Post')

Route.get('/test-user-policy', async () => {
  const user = await User.find(1)
  const post = await Post.find(1)

  if(user.can('edit', post)) {
    ...
  }

  if(user.canNot('edit', post)) {
    ...
  }
})

```


## Author

👤 **Vladyslav Gaysyuk**

* Website: https://mikield.rocks
* Twitter: [@AdmiralMiki](https://twitter.com/AdmiralMiki)
* Github: [@mikield](https://github.com/mikield)
* LinkedIn: [@mikield](https://linkedin.com/in/mikield)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mikield/adonis-user-policy/issues). You can also take a look at the [contributing guide](https://github.com/mikield/adonis-user-policy/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

<a href="https://www.patreon.com/mikield">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

## 📝 License

Copyright © 2020 [Vladyslav Gaysyuk](https://github.com/mikield).<br />
This project is [MIT](https://github.com/mikield/adonis-user-policy/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_