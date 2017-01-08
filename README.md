# Interactions
A simple JavaScript library for creating custom browser input events.

**Currently has a very bare bones event listener setup (no `target` allowed). If you have jQuery on the page, Interactions defaults to it.**

To use, simply supply a THIS argument & a map of events.

```
new Interactions(THIS_ARG_FOR_EVENTS, {
    clickEvent: {
        event: 'click',
        action: function action(e, $el) {
            console.log('click', $el);
            return false;
        }
    },
    dblclick: {
        event: 'dblclick',
        target: '.dblclick',
        action: function action(e, $el) {
            console.log('dblclicked!', $el);
            return false;
        }
    }
}, defaultElement);
```

Need a custom interaction?

```
Interactions.registerAction('shake', function eventListener($el, interaction) {
    var _ = this;

    computer.on('shake', function() {
        interaction.action.call(_, event, $el)
    });
});
```

See demo/index.html for more details.
