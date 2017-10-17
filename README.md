# adonis-laravel-broadcaster
Adonis User Policy (Authorization).
This is a trait wich adds `can` and `canNot` methods to User Model (or other class :smile:)

# Registering the trait and policies
```js
'use strict'

const Model = use('Model')
const PolicyTrait = use('@mikield/adonis-user-policy')

class User extends Model {
  ...
}

module.exports = mix(User).with(PolicyTrait)
```

Create a Policy `Post.js` under (for example) `app\Policies` folder.
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


Next register a Policy (just a class) in other Models.

```js
'use strict'

const Model = use('Model')

class Post extends Model {
  static get policy(){
    return 'App/Policies/Post'
  }
  ...
}

module.exports = Post
```

# Usage
On a User instance call `can` or `canNot` function.

```js
const User = use('App/Models/User')
const Post = use('App/Models/Post')

Route.get('/test-user-policy', async () => {
  const user = await User.find(1)
  const post = await Post.find(1)
  console.log(
    user.can('add', Post),
    user.can('edit', post)
    )
})

```