/**
 * Autor : António Ferraz Lopes
 * DevName: AdilsonDev
 * Company: DevDebian
 * Date: 28-05-2019
 * 
 * Description: Hashtag is a library that help you to interacte with javaScript in easy way
 * gives you oportunities to emphasize you javaScript in easy way just like jQuery library does
 * you are able to use hashtag´s functions easily, hashtag UI, and binding DOM element easily
 */


var hashtag = (function(selector) {

    /** functions  */
    /**hashtag helpers functions */
    function doStyle(prop, val) {
        var isSet = Boolean(val),
            action = CSSStyleDeclaration.prototype.setProperty,
            args = arguments;
        if (isSet) {
            this.each(function(node, i) {
                action.apply(node.style, args);
            });
            return this;
        } else {
            return this.nodes[0].style[prop];
        }
    }

    function convertStringToProps(path, obj) {
        return path.split('.').reduce(function(prev, curr) {
            return prev ? prev[curr] : null;
        }, obj || self)
    }

    function getAllAttributes(element) {
        return Array.prototype.slice.call(element.attributes);
    }
    /**Binding  */
    function hashEngine(hashData) {

        const pattern = ['#{', '}'], // declaration of the pattern
            hash_Element = hashData.element || '[hash-Obj]',
            properties = hashData.data; // set obj to the property variable
        hashData.title !== undefined ? document.querySelector('[hash-title]').textContent = hashData.title : '';

        // check if string is into the pattern 
        function checkPattern(str) {
            //check if the string start with #{
            if (str.startsWith(pattern[0][0])) {
                //check if the string has #{ on the start and ends with }, return true with has and false if not
                return str.indexOf(pattern[0]) > -1 && str.endsWith(pattern[1])
            }
        }

        //convert elemet child of hash-obj attribute to array of child element
        var hashBind = Array.from(document.querySelectorAll('[hash-Obj]'));

        //loop through the parent elements
        hashBind.forEach((ts) => {
            // loop through the child element and get & set textContent
            Array.from(ts.children).forEach((t) => {
                var htmText = t.textContent, // get text of the html element
                    strArray = htmText.split(' '); //transform string into array of string

                //loop through the string array splited
                strArray.forEach(str => {
                    //check if the string is into the pattern
                    if (checkPattern(str)) {
                        //get the property on the the pattern in the DOM
                        var value = str.slice(2, str.lastIndexOf(pattern[1]))
                        if (value.includes('.')) {
                            //convert string to property and value receive the result
                            value = convertStringToProps(value, properties);
                            //replace the pattern to value of the object
                            htmText = htmText.replace(str, value)
                        } else {
                            //check if value exist on same property
                            if (properties.hasOwnProperty(value) && value !== null) {
                                //replace the pattern to value of the object
                                htmText = htmText.replace(str, properties[value])
                            }
                        }
                    }
                });
                //set value from object to inner html binded
                t.textContent = htmText;
            })

        })
    }

    function hashActionsAttr(el) {
        if (getAllAttributes(el).length > 0) {

            let attrs = getAllAttributes(el);
            var result = '';

            attrs.forEach(attr => {

                result = '';
                attr = attr.localName;
                switch (attr) {
                    case 'hash-each':
                        {
                            //console.log(el.child)
                            //for (var i = 0; i < 4; i++) {
                            result = el.children.outerHTML;
                            //}


                            break;
                        }
                }
            });
            el.innerHTML = result;
            //console.log(result)
        }
    }

    return (function(selector) {

        var isSet = Boolean(selector);
        if (isSet) {
            var h = new Function();
            if (typeof(selector) === 'string') {
                h.selector = selector;
                h.nodes = document.querySelectorAll(selector);

                /** Defaults Functions */
                /** each function, iteration element */
                h.each = function(action) {
                    Array.prototype.forEach.call(this.nodes, function(item, i) {
                        action(item, i);
                    })
                    return this;
                }

                /** convert values to string */
                h.toString = function() { return this.selector; }

                h.isEmptyStr = function(str) {
                    return str === '' ? true : false;
                }

                /** Set css properties */
                h.setStyle = function(prop, val) {
                    return doStyle.call(this, prop, val);
                }

                h.setStyles = function(val) {
                    const error = 'the value of the setStyles function must be define as object';
                    var isSet = Boolean(val);
                    if (isSet) {
                        typeof(val) !== 'object' ? console.error(error): this.each(function(node, i) {
                            Object.assign(node.style, val);
                        });
                        return this;
                    } else {
                        console.error(error)
                    }
                    return this;
                }

                h.convertStrToProps = function(path, obj) {
                    return convertStringToProps.call(this, path, obj)
                }

                /**Attributes */
                /**get all the attribute of the any elements */
                h.getAttrs = function() {
                    return Array.from(this.nodes).map(i => {
                        return getAllAttributes.call(this, i)
                    })
                }



            } else if (typeof(selector) === 'object') {
                if (Array.isArray(selector)) {
                    selector.map(item => {
                        hashEngine(item)
                    })
                } else {
                    hashEngine(selector)
                }
            } else {
                console.error('The initial type of the hashtag library must be object or string');
                return;
            }
            return h;
        }
    })
})();





var hash;
(function(e, t) {


    const doAttribute = function(attr) {

    }

    /**@description
     * Clousures
     * 
     **/



    function hashActionsAttr(el, i) {
        let parent = el.parentElement,
            text = '';
        //parent.innerHTML = '';
        switch (i) {
            case 'hash-each':
                {

                    this.data.forEach(data => {
                        let result = render(el.outerHTML, data).replace(`${i}=""`, '')
                        if (!result.includes('key="')) console.warn('The key attribute must be declarated and unique value');
                        text += result;
                    });
                    //pegar o elementos anterios e posterios concatenando com resultado do text
                    text = getPrevSiblingsAsOutHtml(el, '') + text + getNextSiblingsAsOutHtml(el, '');

                    const keys = Array.from(replaceFragment(parent, text).querySelectorAll('[key]')),
                        aux = [];
                    keys.forEach(key => {
                        key = key.getAttribute('key');
                        aux.indexOf(key) > -1 ? console.warn('The key must be unique') : aux.push(key)
                    });
                    break;
                }
            case 'hash-obj':
                {
                    //pegar o elementos anterios e posterios concatenando com resultado do render
                    text = getPrevSiblingsAsOutHtml(el, '') + render(el.outerHTML, this.data).replace(`${i}=""`, '') + getNextSiblingsAsOutHtml(el, '');
                    replaceFragment(parent, text);
                    break;
                }
            case 'hash-attr':
                {
                    var t = document.querySelector(`[${this.attrToBind}]`)
                    console.log(this.attrToBind)
                    console.log(t)
                }
        }
    }

    function getNextSiblingsAsOutHtml(element, outerHTML) {
        let nextEl = element.nextElementSibling;
        if (nextEl) {
            outerHTML += nextEl.outerHTML;
            outerHTML = getNextSiblingsAsOutHtml(nextEl, outerHTML);
        }
        return outerHTML;
    }

    function getPrevSiblingsAsOutHtml(element, outerHTML) {
        let prevEl = element.previousElementSibling;
        if (prevEl) {
            outerHTML += prevEl.outerHTML;
            outerHTML = getPrevSiblingsAsOutHtml(prevEl, outerHTML);
        }
        return outerHTML;
    }

    function getAllAttributes(element) {
        return Array.prototype.slice.call(element.attributes);
    }
    // check if string is into the pattern 
    function checkPattern(str) {
        //check if the string start with #{
        if (str.startsWith(pattern[0][0])) {
            //check if the string has #{ on the start and ends with }, return true with has and false if not
            return str.indexOf(pattern[0]) > -1 && str.endsWith(pattern[1])
        }
    }

    function replaceFragment(element, text) {
        let id = element.getAttribute('id'),
            errorMessage = '';
        try {
            if (id !== null) {
                let old = document.getElementById(id),
                    div = document.createElement("div");
                if (old.localName !== 'fragment') { errorMessage = `The parent tag must be a fragment: not a ${old.localName}`; throw new Error(); return; }

                div.setAttribute('id', id);
                div.innerHTML = text;
                old.parentNode.replaceChild(div, old);
                return document.querySelector('#' + id)
            } else { errorMessage = 'The fragment must have a id attribute'; throw new Error(); return; };
        } catch (error) {
            throw new Error(errorMessage);
        }
    }

    function checkHashAction(i) {
        return this.HASH_ACTIONS_TYPE.indexOf(i) > -1;
    }

    function checkAttr(t) {
        var tt = document.querySelector(`[${t}]`);
        getChildAttrs(tt)
    }

    function getAttrsStartWith(attr) {
        var attrs = Array.from(this.element.attributes);
        return attrs.reduce((t, i) => {
            i.name.indexOf(attr) > -1 ? t.push(i.name.toString().replace('=""', '')) : ''
            return t;
        }, [])
    }

    function getChildAttrs(parent) {
        Array.from(parent.children).forEach(i => {
            console.log(i)
        })
        console.log(document.querySelector('[hash-event-onclick]'))
        document.querySelector('[hash-event-onclick]').addEventListener('click', function() {
            this.methods.add()
            debugger

        })
    }

    function render(template, data) {
        return template.replace(this.pattern, (match, variable) => {
            return variable.split('.').reduce((previous, current) => {
                return previous.hasOwnProperty(current) && current !== null ? previous[current] : ''
            }, data) || ''
        })
    }

    /**
     * Return the constructor instantiation
     */
    hash = function(seletor) {
        return new hash.init(seletor);
    };

    doEngine = function(hashData) {
        this.pattern = /\#\{\s?([\w.]+)\s?\}/g; // declaration of the pattern
        this.hash_selector = hashData.selector || '[hash-parent]';
        this.data = hashData.data; // set obj to the property variable
        this.methods = hashData.functions;
        this.HASH_ACTIONS_TYPE = ['hash-obj', 'hash-each', 'hash-event', 'hash-attr'];
        hashData.title !== undefined ? document.querySelector('[hash-title]').textContent = hashData.title : '';

        //convert elemet child of hash-obj attribute to array of child element
        var hashBind = Array.from(document.querySelector(hash_selector).children);

        hashBind.map(hashB => {
            this.element = hashB;
            this.matchAttrs = getAttrsStartWith.call(this, 'hash-');
            this.matchAttrs.forEach(i => {
                if (i.includes(':')) {
                    this.attrToBind = i.split(':')[1];
                    i = i.split(':')[0];
                }
                checkHashAction.call(this, i) ? hashActionsAttr.call(this, hashB, i) : '';
            })
        })
    }

    /** Statics Methods */

    /**
     * Create the constructor
     * @param {String} selector The selector to use
     */
    hash.init = function(selector) {
        'use strict';

        if (Boolean(selector)) {
            if (selector == 'document')
                this.elselectorems = [document];
            else if (selector === 'window')
                this.selector = [window];
            else
                this.selector = document.querySelectorAll(selector);
        } else
            return;




        /**@description 
         *  
         **/
        var h = new Function();

        /**Instance Methods */


        return h;
    }

    /**Binding  */
    hash.hashEngine = function(target) {
        if (Array.isArray(target)) {
            target.map(iTarget => {
                doEngine(iTarget)
            })
        } else {
            doEngine(target)
        }
    }

})("undefined" != typeof window ? window : this, function(e, t) {
    "use strict";

})