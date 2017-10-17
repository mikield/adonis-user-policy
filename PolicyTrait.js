"use strict";
/*
* User Policy for AdonisJS
*
* (c) Vladyslav Gaysyuk <mikield@icloud.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/


const Policy = (Model) => class extends Model {
    can(action, model) {
        let bindPolicy = null
        if (typeof model === 'function') { // Static
            bindPolicy = model.policy
        } else {                          // Object (Instance)
            bindPolicy = model.constructor.policy
        }
        if (bindPolicy === null) {
            return false
        }
        const ModelPolicy = use(bindPolicy)
        if (ModelPolicy[action] === undefined) {
            return false
        }
        return ModelPolicy[action](this, model)
    }

    canNot(action, model) {
        return !this.can(action, model)
    }
}
module.exports = Policy;
