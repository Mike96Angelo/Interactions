var Generator = require('generate-js'),
    baseEventListener = require('./base-event-listener');

var Interactions = Generator.generate(function Interactions(options) {
    var _ = this;

    _.defineProperties({
        writable: true
    }, {
        thisArg: options.thisArg,
        emitter: options.emitter,
        $: options.$ || (window.$ && window.$.noConflict()) || (window.jQuery.noConflict())
    });

    _.parseInteractions(options.interactions);
});

Interactions.actions = {};

Interactions.registerAction = function registerAction(type, action) {
    Interactions.actions[type] = action;
};

Interactions.registerActions = function registerActions(interactions) {
    for (var key in interactions) {
        Interactions.registerAction(interactions[key]);
    }
};

Interactions.definePrototype({
    parseInteractions: function parseInteractions(interactions) {
        var _ = this,
            action, key, i;

        for (key in interactions) {
            i = interactions[key];
            i.$ = i.$ || _.$;
            action = Interactions.actions[i.event] || baseEventListener(i.event);
            action.call(_.thisArg, _.emitter, i);
        }
    },
});

if (window) window.Interactions = Interactions;

module.exports = Interactions;
