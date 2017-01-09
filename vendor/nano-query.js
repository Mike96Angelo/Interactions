/*
 * nanoQuery function (can replace jQuery in 90% cases)
 * Syntax:
 * _($el, selector) - select and return the first matching element
 * _($el, selector, callback) - perform a callback on all selected elements
 * _($el, selector, event, handler) - add event handler to all selected elements
 */

module.exports=function(d, s, c, x) {
    var r = d.querySelectorAll(s);

    return r.length ? (
        c
        ?
        [].forEach.call(
            r,
            x
            ?
            function(e){
                e.addEventListener(c, x, !!0)
            }
            :
            c
            )
        :
        r[0]
    )
    :
    null
}
