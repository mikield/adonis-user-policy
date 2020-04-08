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