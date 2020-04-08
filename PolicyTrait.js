"use strict";
/*
* User Policy for AdonisJS
*
* (c) Vladyslav Gaysyuk <hello@mikield.rocks>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/


module.exports = (Model) => class extends Model {
    can(action, model = null) {
        let bindPolicy = null

        if (!model) {
            bindPolicy = this.policy
        } else {
            if (typeof model === 'function') {
                bindPolicy = model.policy
            } else {
                bindPolicy = model.constructor.policy
            }
        }

        if (!bindPolicy) {
            throw new Error(`Policy for ${model ? model : this} not found. Are you sure you have a registered policy?`)
        }

        const ModelPolicy = use(bindPolicy)
        if (ModelPolicy[action] === undefined) {
            throw new Error(`Trying to call policy method ${action} witch is not defined.`)
        }
        return ModelPolicy[action](this, model)
    }

    canNot(action, model = null) {
        return !this.can(action, model)
    }
}