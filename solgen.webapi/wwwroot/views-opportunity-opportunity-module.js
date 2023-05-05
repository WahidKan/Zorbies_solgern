(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-opportunity-opportunity-module"],{

/***/ "./node_modules/jquery/dist/jquery.js":
/*!********************************************!*\
  !*** ./node_modules/jquery/dist/jquery.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.4.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2019-05-01T21:04Z
 */
( function( global, factory ) {

	"use strict";

	if (  true && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		nonce: true,
		noModule: true
	};

	function DOMEval( code, node, doc ) {
		doc = doc || document;

		var i, val,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {

				// Support: Firefox 64+, Edge 18+
				// Some browsers don't support the "nonce" property on scripts.
				// On the other hand, just using `getAttribute` is not enough as
				// the `nonce` attribute is reset to an empty string whenever it
				// becomes browsing-context connected.
				// See https://github.com/whatwg/html/issues/2369
				// See https://html.spec.whatwg.org/#nonce-attributes
				// The `node.getAttribute` check was added for the sake of
				// `jQuery.globalEval` so that it can fake a nonce-containing node
				// via an object.
				val = node[ i ] || node.getAttribute && node.getAttribute( i );
				if ( val ) {
					script.setAttribute( i, val );
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.4.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code, options ) {
		DOMEval( code, { nonce: options && options.nonce } );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.4
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://js.foundation/
 *
 * Date: 2019-04-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	nonnativeSelectorCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	rdescend = new RegExp( whitespace + "|>" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rhtml = /HTML$/i,
	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	inDisabledFieldset = addCombinator(
		function( elem ) {
			return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!nonnativeSelectorCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) &&

				// Support: IE 8 only
				// Exclude object elements
				(nodeType !== 1 || context.nodeName.toLowerCase() !== "object") ) {

				newSelector = selector;
				newContext = context;

				// qSA considers elements outside a scoping root when evaluating child or
				// descendant combinators, which is not what we want.
				// In such cases, we work around the behavior by prefixing every selector in the
				// list with an ID selector referencing the scope context.
				// Thanks to Andrew Dupont for this technique.
				if ( nodeType === 1 && rdescend.test( selector ) ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch ( qsaError ) {
					nonnativeSelectorCache( selector, true );
				} finally {
					if ( nid === expando ) {
						context.removeAttribute( "id" );
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						inDisabledFieldset( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	var namespace = elem.namespaceURI,
		docElem = (elem.ownerDocument || elem).documentElement;

	// Support: IE <=8
	// Assume HTML when documentElement doesn't yet exist, such as inside loading iframes
	// https://bugs.jquery.com/ticket/4833
	return !rhtml.test( namespace || docElem && docElem.nodeName || "HTML" );
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	if ( support.matchesSelector && documentIsHTML &&
		!nonnativeSelectorCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {
			nonnativeSelectorCache( expr, true );
		}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ?
				argument + length :
				argument > length ?
					length :
					argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		if ( typeof elem.contentDocument !== "undefined" ) {
			return elem.contentDocument;
		}

		// Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
		// Treat the template element as a regular one in browsers that
		// don't support it.
		if ( nodeName( elem, "template" ) ) {
			elem = elem.content || elem;
		}

		return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var documentElement = document.documentElement;



	var isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem );
		},
		composed = { composed: true };

	// Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
	// Check attachment across shadow DOM boundaries when possible (gh-3504)
	// Support: iOS 10.0-10.2 only
	// Early iOS 10 versions support `attachShadow` but not `getRootNode`,
	// leading to errors. We need to check for `getRootNode`.
	if ( documentElement.getRootNode ) {
		isAttached = function( elem ) {
			return jQuery.contains( elem.ownerDocument, elem ) ||
				elem.getRootNode( composed ) === elem.ownerDocument;
		};
	}
var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			isAttached( elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = elem.nodeType &&
			( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]*)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, attached, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		attached = isAttached( elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( attached ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 - 11+
// focus() and blur() are asynchronous, except when they are no-op.
// So expect focus to be synchronous when the element is already active,
// and blur to be synchronous when the element is not already active.
// (focus and blur are always synchronous in other supported browsers,
// this just defines when we can count on it).
function expectSync( elem, type ) {
	return ( elem === safeActiveElement() ) === ( type === "focus" );
}

// Support: IE <=9 only
// Accessing document.activeElement can throw unexpectedly
// https://bugs.jquery.com/ticket/13393
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// If the event is namespaced, then each handler is only invoked if it is
				// specially universal or its namespaces are a superset of the event's.
				if ( !event.rnamespace || handleObj.namespace === false ||
					event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		click: {

			// Utilize native event to ensure correct state for checkable inputs
			setup: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Claim the first handler
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					// dataPriv.set( el, "click", ... )
					leverageNative( el, "click", returnTrue );
				}

				// Return false to allow normal processing in the caller
				return false;
			},
			trigger: function( data ) {

				// For mutual compressibility with _default, replace `this` access with a local var.
				// `|| data` is dead code meant only to preserve the variable through minification.
				var el = this || data;

				// Force setup before triggering a click
				if ( rcheckableType.test( el.type ) &&
					el.click && nodeName( el, "input" ) ) {

					leverageNative( el, "click" );
				}

				// Return non-false to allow normal event-path propagation
				return true;
			},

			// For cross-browser consistency, suppress native .click() on links
			// Also prevent it if we're currently inside a leveraged native-event stack
			_default: function( event ) {
				var target = event.target;
				return rcheckableType.test( target.type ) &&
					target.click && nodeName( target, "input" ) &&
					dataPriv.get( target, "click" ) ||
					nodeName( target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

// Ensure the presence of an event listener that handles manually-triggered
// synthetic events by interrupting progress until reinvoked in response to
// *native* events that it fires directly, ensuring that state changes have
// already occurred before other listeners are invoked.
function leverageNative( el, type, expectSync ) {

	// Missing expectSync indicates a trigger call, which must force setup through jQuery.event.add
	if ( !expectSync ) {
		if ( dataPriv.get( el, type ) === undefined ) {
			jQuery.event.add( el, type, returnTrue );
		}
		return;
	}

	// Register the controller as a special universal handler for all event namespaces
	dataPriv.set( el, type, false );
	jQuery.event.add( el, type, {
		namespace: false,
		handler: function( event ) {
			var notAsync, result,
				saved = dataPriv.get( this, type );

			if ( ( event.isTrigger & 1 ) && this[ type ] ) {

				// Interrupt processing of the outer synthetic .trigger()ed event
				// Saved data should be false in such cases, but might be a leftover capture object
				// from an async native handler (gh-4350)
				if ( !saved.length ) {

					// Store arguments for use when handling the inner native event
					// There will always be at least one argument (an event object), so this array
					// will not be confused with a leftover capture object.
					saved = slice.call( arguments );
					dataPriv.set( this, type, saved );

					// Trigger the native event and capture its result
					// Support: IE <=9 - 11+
					// focus() and blur() are asynchronous
					notAsync = expectSync( this, type );
					this[ type ]();
					result = dataPriv.get( this, type );
					if ( saved !== result || notAsync ) {
						dataPriv.set( this, type, false );
					} else {
						result = {};
					}
					if ( saved !== result ) {

						// Cancel the outer synthetic event
						event.stopImmediatePropagation();
						event.preventDefault();
						return result.value;
					}

				// If this is an inner synthetic event for an event with a bubbling surrogate
				// (focus or blur), assume that the surrogate already propagated from triggering the
				// native event and prevent that from happening again here.
				// This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
				// bubbling surrogate propagates *after* the non-bubbling base), but that seems
				// less bad than duplication.
				} else if ( ( jQuery.event.special[ type ] || {} ).delegateType ) {
					event.stopPropagation();
				}

			// If this is a native event triggered above, everything is now in order
			// Fire an inner synthetic event with the original arguments
			} else if ( saved.length ) {

				// ...and capture the result
				dataPriv.set( this, type, {
					value: jQuery.event.trigger(

						// Support: IE <=9 - 11+
						// Extend with the prototype to reset the above stopImmediatePropagation()
						jQuery.extend( saved[ 0 ], jQuery.Event.prototype ),
						saved.slice( 1 ),
						this
					)
				} );

				// Abort handling of the native event
				event.stopImmediatePropagation();
			}
		}
	} );
}

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	code: true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

jQuery.each( { focus: "focusin", blur: "focusout" }, function( type, delegateType ) {
	jQuery.event.special[ type ] = {

		// Utilize native event if possible so blur/focus sequence is correct
		setup: function() {

			// Claim the first handler
			// dataPriv.set( this, "focus", ... )
			// dataPriv.set( this, "blur", ... )
			leverageNative( this, type, expectSync );

			// Return false to allow normal processing in the caller
			return false;
		},
		trigger: function() {

			// Force setup before trigger
			leverageNative( this, type );

			// Return non-false to allow normal event-path propagation
			return true;
		},

		delegateType: delegateType
	};
} );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl && !node.noModule ) {
								jQuery._evalUrl( node.src, {
									nonce: node.nonce || node.getAttribute( "nonce" )
								} );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), node, doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && isAttached( node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = isAttached( elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		// Support: Chrome <=64
		// Don't get tricked when zoom affects offsetWidth (gh-4029)
		div.style.position = "absolute";
		scrollboxSizeVal = roundPixelMeasures( div.offsetWidth / 3 ) === 12;

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !isAttached( elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style,
	vendorProps = {};

// Return a vendor-prefixed property or undefined
function vendorPropName( name ) {

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a potentially-mapped jQuery.cssProps or vendor prefixed property
function finalPropName( name ) {
	var final = jQuery.cssProps[ name ] || vendorProps[ name ];

	if ( final ) {
		return final;
	}
	if ( name in emptyStyle ) {
		return name;
	}
	return vendorProps[ name ] = vendorPropName( name ) || name;
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	};

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5

		// If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
		// Use an explicit zero to avoid NaN (gh-3964)
		) ) || 0;
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),

		// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
		// Fake content-box until we know it's needed to know the true value.
		boxSizingNeeded = !support.boxSizingReliable() || extra,
		isBorderBox = boxSizingNeeded &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox,

		val = curCSS( elem, dimension, styles ),
		offsetProp = "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 );

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}


	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	// Support: IE 9-11 only
	// Also use offsetWidth/offsetHeight for when box sizing is unreliable
	// We use getClientRects() to check for hidden/disconnected.
	// In those cases, the computed value can be trusted to be border-box
	if ( ( !support.boxSizingReliable() && isBorderBox ||
		val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) &&
		elem.getClientRects().length ) {

		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

		// Where available, offsetWidth/offsetHeight approximate border box dimensions.
		// Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
		// retrieved value as a content box dimension.
		valueIsBorderBox = offsetProp in elem;
		if ( valueIsBorderBox ) {
			val = elem[ offsetProp ];
		}
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"gridArea": true,
		"gridColumn": true,
		"gridColumnEnd": true,
		"gridColumnStart": true,
		"gridRow": true,
		"gridRowEnd": true,
		"gridRowStart": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			// The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
			// "px" to a few hardcoded values.
			if ( type === "number" && !isCustomProp ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),

				// Only read styles.position if the test has a chance to fail
				// to avoid forcing a reflow.
				scrollboxSizeBuggy = !support.scrollboxSize() &&
					styles.position === "absolute",

				// To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
				boxSizingNeeded = scrollboxSizeBuggy || extra,
				isBorderBox = boxSizingNeeded &&
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra ?
					boxModelAdjustment(
						elem,
						dimension,
						extra,
						isBorderBox,
						styles
					) :
					0;

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && scrollboxSizeBuggy ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 && (
					jQuery.cssHooks[ tween.prop ] ||
					tween.elem.style[ finalPropName( tween.prop ) ] != null ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() + " " ] =
									( responseHeaders[ match[ 1 ].toLowerCase() + " " ] || [] )
										.concat( match[ 2 ] );
							}
						}
						match = responseHeaders[ key.toLowerCase() + " " ];
					}
					return match == null ? null : match.join( ", " );
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url, options ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,

		// Only evaluate the response if it is successful (gh-4126)
		// dataFilter is not invoked for failure responses, so using it instead
		// of the default converter is kludgy but it works.
		converters: {
			"text script": function() {}
		},
		dataFilter: function( response ) {
			jQuery.globalEval( response, options );
		}
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain or forced-by-attrs requests
	if ( s.crossDomain || s.scriptAttrs ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" )
					.attr( s.scriptAttrs || {} )
					.prop( { charset: s.scriptCharset, src: s.url } )
					.on( "load error", callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					} );

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/addeditopportunity.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/addeditopportunity.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\r\n\r\n<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>{{pageTitle}}</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Dashboard</a></li>\r\n      <li><a routerLink=\"/opportunity\">Manage Opportunity</a></li>\r\n      <li class=\"active\">{{pageTitle}}</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"panel\">\r\n  <div class=\"panel-content \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <form [formGroup]=\"form\" *ngIf=\"form\">\r\n      <ng-container *ngFor=\"let item of formControlList;let i=index\">\r\n        <h3 class=\"form-heading\"> <span>{{ item.group_display_name}}</span></h3>\r\n        <div class=\"row mb-2\">\r\n\r\n\r\n          <ng-container *ngFor=\"let inner of item.InnerData;let j=index\">\r\n\r\n\r\n            <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : (inner.form_field_visibility == 'NO' && inner.edit_form_field_visibility == 'NO'), 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                             inner.layout_type =='four' }\"\r\n                 ngShow=\"inner.dependent_show_type == true\">\r\n              <!---->\r\n              <input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO' &&  inner.edit_form_field_visibility == 'NO'\" />  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n              <label *ngIf=\"inner.form_field_visibility == 'YES' || inner.edit_form_field_visibility == 'YES'\">{{ inner.display_name}}:<span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>\r\n              <!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n              <!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n                <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n              </a>-->\r\n              <div class=\"form-group\">\r\n\r\n\r\n\r\n                <!--text  [placeholder]=\"inner.display_name\"-->\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio' && inner.dt_code!='boolean'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date' && inner.dt_code !='time' && inner.dt_code !='int' && inner.dt_code !='decimal' && inner.dt_code !='bigint' && inner.dt_code !='datetime'\" />\r\n\r\n\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'int'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'int' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'bigint'\" />\r\n\r\n                <small *ngIf=\"inner.dt_code == 'bigint' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n                <input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n                       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n                       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\"\r\n                       *ngIf=\"inner.dt_code == 'decimal'\" />\r\n\r\n\r\n                <small *ngIf=\"inner.dt_code == 'decimal' &&(form.get(inner.form_controlName).touched &&\r\n                       form.get(inner.form_controlName).errors?.pattern)\"\r\n                       class=\"text-danger\">Please enter valid value</small>\r\n\r\n\r\n                <!--Textarea [placeholder]=\"inner.display_name\"-->\r\n                <textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName)?.invalid && (form.get(inner.form_controlName)?.dirty || form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName)?.errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>\r\n\r\n\r\n                <!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'date'\" [formControlName]=\"inner.form_controlName\"\r\n                            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" [style]=\"{ 'position': 'relative'}\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"></p-calendar>\r\n\r\n\r\n\r\n\r\n                <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date \" *ngIf=\"inner.dt_code == 'datetime'\" [formControlName]=\"inner.form_controlName\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                            [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\" [style]=\"{ 'position': 'relative' }\"></p-calendar>\r\n\r\n\r\n\r\n                <!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n  [ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n                <!--end calandar-->\r\n                <!--Checkbox-->\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <!--<div class=\"form-check form-check-inline\" *ngFor=\"let checkedvals of form.get(inner.form_controlName).value\">-->\r\n\r\n                      <div class=\"custom-control custom-checkbox\">\r\n\r\n                        <input id=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\"\r\n                               value=\"5555\" [checked]=\"checkvalue(inner.value,option)\" (change)=\"onCheckboxChange($event,item,inner)\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n                        <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"chk_{{inner.custom_field_id}}_{{option}}_{{i}}\">{{option}}</label>\r\n\r\n                      </div>\r\n\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                  <div class=\"form-check form-check-inline\">\r\n                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                      <label class=\"switch\">\r\n                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\"\r\n                               class=\"dynamic custom-control-input\">\r\n                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                      </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--Radio button-->\r\n                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n                  <div *ngFor=\"let options of inner.listoptions\">\r\n\r\n                    <div class=\"form-check form-check-inline\" *ngFor=\"let option of options.listoptions;let i=index;\">\r\n\r\n                      <div class=\"custom-control custom-radio mx-2  p-0\">\r\n                        <!--<input id=\"rbl_{{inner.custom_field_id}}_{{option}}\" class=\"dynamic custom-control-input\"\r\n                 [formControlName]=\"inner.form_controlName\" type=\"radio\">\r\n          <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"rbl_{{inner.custom_field_id}}_{{option}}\">{{option}}</label>-->\r\n\r\n\r\n                        <input id=\"radio-{{inner.custom_field_id}}_{{option}}\" [formControlName]=\"inner.form_controlName\" [value]=\"option\" type=\"radio\" />\r\n                        <label for=\"radio-{{inner.custom_field_id}}_{{option}}\" class=\"radio-label\">{{option}}</label>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n\r\n                </div>\r\n\r\n                <!--Ng Dropdown-->\r\n                <!--Dropdown\r\n  picklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'invalid': inner.dt_code=='select' }\" *ngIf=\"inner.dt_code=='select' && inner.select_options==''\">\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.id\"\r\n            *ngFor=\"let option of MakeNormalArray(inner.selectlistvalues)\">\r\n      {{//option.value}}\r\n    </option>\r\n  </select>-->\r\n                <!--<ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n             (clear)=\"onClearLang(item.InnerData,j)\"\r\n             (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\"  [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n             *ngIf=\"inner.dt_code=='select' && inner.picklist_options==''\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n  </ng-select>-->\r\n\r\n                <ng-select *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.is_readOnly && inner.dropdown_type==null\" [items]=\"inner.select_options\" [id]=\"inner.form_controlName\"\r\n                           [ngClass]=\"{'disabledddl':inner.is_readOnly}\" [searchable]=\"false\" [clearable]=\"false\"\r\n                           [closeOnSelect]=\"true\" placeholder=\"Select\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           (clear)=\"onClearLang(item.InnerData,j)\"\r\n                           (scrollToEnd)=\"onScrollToEnd(item.InnerData,j)\" [virtualScroll]=\"true\" (keyup)=\"onKey($event,item.InnerData,j)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.field_code!=null && inner.dropdown_type==null && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n                <!--drop down -->\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && ((inner.field_code==null || inner.dropdown_type=='Normal') && inner.dropdown_type!='custom')  && !inner.is_readOnly\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\" (change)=\"onCustomChange($event,inner)\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='' && inner.dropdown_type=='custom' && !inner.is_readOnly\"\r\n                           [formControlName]=\"inner.form_controlName\" bindLabel=\"name\" bindValue=\"value\">\r\n                </ng-select>\r\n\r\n\r\n                <ng-select [items]=\"inner.select_options\" [id]=\"inner.form_controlName\" [closeOnSelect]=\"true\" placeholder=\"Select\"\r\n                           *ngIf=\"inner.dt_code=='select' && inner.picklist_options=='true' && !inner.is_readOnly\" [formControlName]=\"inner.form_controlName\" [multiple]=\"true\" bindLabel=\"name\" bindValue=\"value\">\r\n\r\n                </ng-select>\r\n\r\n                <small *ngIf=\"((form.get(inner.form_controlName)?.invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName)?.touched) && (form.get(inner.form_controlName)?.errors?.required))\"\r\n                       class=\"text-danger\">{{inner.display_name}} is required</small>\r\n                <!--Dropdown\r\n    picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n  -->\r\n                <!--<select [formControlName]=\"inner.form_controlName\" class=\"form-control\" [ngClass]=\"{'form-control' : true }\" *ngIf=\"inner.picklist_options != 'LOOKUP' && inner.dt_code=='select'\" [(ngModel)]=\"inner.form_controlName\"\r\n          (change)='onOptionsSelected($event,inner)'>\r\n    <option value=\"\">Select</option>\r\n    <option [value]=\"option.name\"\r\n            *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n      {{option.name}}\r\n    </option>\r\n\r\n  </select>-->\r\n\r\n\r\n              </div>\r\n\r\n\r\n\r\n\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mb-3\">\r\n        <div class=\"col-sm-12 col-md-12 text-right\">\r\n          <a *ngIf='addOrUpdatePermission' href=\"javascript:void(0);\" class=\"btn btn-success mr-2\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n\r\n    </form>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n</div>\r\n\r\n\r\n<!--<div class=\"panel\">\r\n  <div class=\"panel-content \">-->\r\n<!--<app-dynamicform moduleName=\"user\" submoduleName=\"department\"></app-dynamicform>-->\r\n<!--<form [formGroup]=\"form\" *ngIf=\"form\">\r\n  <ng-container *ngFor=\"let item of formControlList\">\r\n    <h3 class=\"form-heading\">{{ item.group_display_name}}</h3>\r\n    <div class=\"row mx-auto mb-2\" [ngClass]=\"{'disabled':loadSave}\">\r\n\r\n      <ng-container *ngFor=\"let inner of item.InnerData\">\r\n        <div [ngClass]=\"{'col-sm-12 col-md-12 float-left': true, 'd-none' : inner.form_field_visibility == 'NO', 'col-12': inner.layout_type =='single', 'col-md-6': inner.layout_type =='double', 'col-lg-4': inner.layout_type =='triple', 'col-lg-3 col-xl-3':\r\n                         inner.layout_type =='four' }\"\r\n             ngShow=\"inner.dependent_show_type == true\">-->\r\n<!---->\r\n<!--<input type=\"hidden\" *ngIf=\"inner.form_field_visibility == 'NO'\" />-->  <!--v-model=\"item.value\" v-bind:id=\"item.name\"     -->\r\n<!--<label *ngIf=\"inner.form_field_visibility == 'YES'\">{{ inner.display_name}} <span class=\"text-danger\" [ngClass]=\"{'text-danger':inner.is_required== true}\" *ngIf=\"inner.is_required==true\">*</span></label>-->\r\n<!--<a href=\"javascript:void(0);\" v-bind:tabindex=\"-1\" data-toggle=\"popoveruserguide\" v-bind:data-content=\"GetLocalizedValue(item.user_guide)\">-->\r\n<!--<a href=\"javascript:void(0);\" data-toggle=\"popoveruserguide\" data-content=\"inner.user_guide\" [title]=\"inner.\">\r\n  <i class=\"fa fa-question-circle-o text-popover\" style=\"font-size: 14px;\" ></i>\r\n</a>-->\r\n<!--<div class=\"form-group\" *ngIf=\"inner.form_field_visibility == 'YES'\">\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-12 float-left\">-->\r\n<!--text [placeholder]=\"inner.display_name\"-->\r\n<!--<input type=\"text\" class=\"form-control\" [readonly]=\"inner.is_readOnly\"\r\n       [formControlName]=\"inner.form_controlName\" [id]=\"inner.custom_field_id\"\r\n       [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName).invalid && (form.get(inner.form_controlName).dirty || form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName).errors?.maxlength)) }\"\r\n       *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code !='date'  && inner.dt_code !='radio'  && inner.dt_code !='select' && inner.dt_code !='textarea' && inner.dt_code !='checkbox' && inner.dt_code !='date'\" />\r\n<small *ngIf=\"((form.get(inner.form_controlName).invalid) && (form.get(inner.form_controlName).dirty) || (form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required))\"\r\n       class=\"text-danger\">{{inner.display_name}} is required</small>-->\r\n<!--Textarea [placeholder]=\"inner.display_name\"-->\r\n<!--<textarea class=\"form-control\" *ngIf=\"inner.dt_code == 'textarea'\" [ngClass]=\"{'is-invalid': (form.get(inner.form_controlName).invalid && (form.get(inner.form_controlName).dirty || form.get(inner.form_controlName).touched) && (form.get(inner.form_controlName).errors?.required || form.get(inner.form_controlName).errors?.maxlength)) }\" [formControlName]=\"inner.form_controlName\" rows=\"3\" cols=\"4\"></textarea>-->\r\n<!--Ng Calendar [placeholder]=\"inner.display_name\"-->\r\n<!--<p-calendar inputStyleClass=\"form-control start-date\" *ngIf=\"inner.dt_code == 'date'\"\r\n            [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>-->\r\n<!--<p-calendar  inputStyleClass=\"form-control start-date\" formControlName=\"leaseDate\" placeholder=\"Select Date of Lease\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n[ngClass]=\"{'is-invalid': (leaseDetailForm.get('leaseDate').invalid && (leaseDetailForm.get('leaseDate').dirty || leaseDetailForm.get('leaseDate').touched) && (leaseDetailForm.get('leaseDate').errors?.required)) }\"></p-calendar>-->\r\n<!--end calandar-->\r\n<!--Checkbox-->\r\n<!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n  <div class=\"form-check form-check-inline\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n    <div class=\"custom-control custom-checkbox\">\r\n      <input id=\"'chk_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\" [formControlName]=\"inner.form_controlName\" class=\"dynamic custom-control-input\" type=\"checkbox\">\r\n      <label class=\"custom-control-label universal-custom-control-label pl-2 pr-1 dynamic\" for=\"'chk_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\">{{option.name}}</label>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n<!--Radio button-->\r\n<!--<div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='radio'\">\r\n  <div class=\"form-check form-check-inline\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">\r\n    <div class=\"custom-control custom-radio mx-2  p-0\">\r\n      <input id=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\" class=\"dynamic custom-control-input\" type=\"radio\" name=\"item.name\">\r\n      <label class=\"custom-control-label universalradio-custom-control-label pl-2 pr-1 dynamic\" for=\"'rdo_'+ {{inner.custom_field_id}}+ '_' + {{option.value}}\">{{option.name}}</label>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n<!--Ng Dropdown-->\r\n<!--Dropdown\r\npicklist_options = Lookup       dt_code==select    dropdown_type==normal--- so fill dropdown with select_options- coming from db\r\n-->\r\n<!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'is-invalid': inner.dt_code=='select' }\" *ngIf=\" inner.dt_code=='select' \">\r\n  <option value=\"\">Select</option>\r\n  <option v-for=\"option in MakeNormalArray(inner.select_options)\">{{option.name1}}</option>\r\n</select>-->\r\n<!--Dropdown\r\n  picklist_options != Lookup (contain values to fill in dropdown)      dt_code==select  -- so fill dropdown with picklist_options\r\n-->\r\n<!--<select [formControlName]=\"inner.form_controlName\" [ngClass]=\"{'form-control' : true,'is-invalid': inner.picklist_options != 'Lookup' && inner.dt_code=='select' }\" *ngIf=\"inner.picklist_options != 'Lookup' && inner.dt_code=='select'\">\r\n  <option value=\"\">Select</option>\r\n  <option [value]=\"option.value\" [selected]=\"inner.form_controlName\" *ngFor=\"let option of MakeArray(inner.picklist_options,inner.dt_code)\">{{option.name}}</option>\r\n</select>-->\r\n<!--</div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </ng-container>\r\n\r\n        </div>\r\n      </ng-container>\r\n      <div class=\"row mx-auto mb-3\">\r\n        <div class=\"col-sm-12 col-md-12\">\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success mr-1\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-danger\" (click)=\"close()\"><i class=\"fa fa-times\"></i> Cancel</a>\r\n        </div>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </form>\r\n\r\n  </div>\r\n</div>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.html":
/*!************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.html ***!
  \************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #KanbanViewModal=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-lg modal-info \" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\" style=\"z-index:1\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Kanban View</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-lg-12\">\r\n            <label>View As: </label>\r\n          </div>\r\n          <div class=\"col-xl-4 col-lg-6\" *ngIf=\"isSelectedView !='Status'\">\r\n            <div class=\"radio\">\r\n              <input id=\"radio-1\" [(ngModel)]=\"radioButton\" name=\"radio\" type=\"radio\" value=\"Status\" >\r\n              <label for=\"radio-1\" class=\"radio-label\">Status Wise</label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xl-4 col-lg-6\" *ngIf=\"isSelectedView !='Stage'\">\r\n            <div class=\"radio\">\r\n              <input id=\"radio-2\" [(ngModel)]=\"radioButton\" name=\"radio\" type=\"radio\" value=\"Stage\" >\r\n              <label for=\"radio-2\" class=\"radio-label\">Stage Wise</label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xl-4 col-lg-6\" *ngIf=\"isSelectedView !='List'\">\r\n            <div class=\"radio\">\r\n              <input id=\"radio-3\" [(ngModel)]=\"radioButton\" name=\"radio\" type=\"radio\" value=\"List\">\r\n              <label for=\"radio-3\" class=\"radio-label\">List Wise</label>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-xl-12\" *ngIf=\"isWorkFlowHidden\">\r\n            <label>Select Workflow: </label>\r\n            <select class=\"form-control\">\r\n              <option>Select</option>\r\n            </select>\r\n          </div>\r\n\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"submit()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunitylist.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunitylist.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\">\r\n    <strong>MANAGE OPPORTUNITY</strong>\r\n    <p class=\"d-inline-block pl-1 pl-md-3 mb-1\"><i class=\"fa fa-list-alt p-0 pr-1\"></i>{{ViewModel}}</p>\r\n  </h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li>\r\n        <a routerLink=\"/dashboard\">Dashboard</a>\r\n      </li>\r\n      <li class=\"active\">Manage Opportunity</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3 btn-iconres\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-12 col-xl-7 pr-3 pr-lg-0\">\r\n            <div class=\"row searchfield\">\r\n              <div class=\"col-lg-4 float-left mb-lg-0 mb-2\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-lg-8 float-left pl-3 pl-lg-0\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\" tooltip=\"Search\"><span><i class=\"fa fa-search\"></i> </span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\" tooltip=\"Reset\"><span><i class=\"fa fa-refresh\"></i> </span></a>\r\n                <a class=\"btn btn-white mr-1\" href=\"javascript:void(0);\" (click)=\"popUpOpen()\" tooltip=\"Filter\"><span><i class=\"fa fa-filter\"></i> </span></a>\r\n                <div class=\"d-inline-block align-middle pl-3\">\r\n                  <label class=\"d-inline-block\"><b>Search in all records</b></label>\r\n                  <div class=\"form-group d-inline-block align-middle m-0 ml-2\">\r\n                    <label class=\"switch m-0\">\r\n                      <input type=\"checkbox\" id=\"allRecords\" formControlName=\"allRecords\" [checked]=\"myCheckbox\" (click)=\"switchClicked($event)\">\r\n                      <span class=\"slider round\">\r\n                        <span>Yes</span>\r\n                      </span>\r\n                    </label>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-12 col-xl-5\">\r\n            <div class=\"dt-buttons noabso-res\">\r\n              <div class=\"form-group d-inline-block align-top mr-1 mb-0\">\r\n                <ng-select [items]=\"pagedData.data\" placeholder=\"Select View\" bindValue=\"custom_view_id\" bindLabel=\"view_name\" [closeOnSelect]=\"true\" (change)=\"SetManageViewValue($event.custom_view_id,$event.view_name)\" [(ngModel)]=\"vewId\">\r\n                </ng-select>\r\n              </div>\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\" tooltip=\"Manage View\"><span><i class=\"fa fa-list-alt\"></i> </span></a>\r\n              <a *ngIf='isAdd' routerLink=\"/opportunity/addOpportunity\" class=\"btn btn-success form-btns mr-1\" tooltip=\"Add Opportunity\"><i class=\"fa fa-plus\"></i> </a>\r\n              <a *ngIf='isDelete' class=\"btn btn-danger form-btns\" href=\"javascript:void(0);\" (click)=\"deleteAll()\" tooltip=\"Delete\"><span><i class=\"fa fa-trash\"></i> </span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div><!--[rowHeight]=\"'auto'\"  -->\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\" *ngIf=\"isOpportunityView == 'List'\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rowHeight]=\"40\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\"\r\n                       [selectionType]=\"SelectionType.checkbox\"\r\n                       [selectAllRowsOnPage]=\"false\"\r\n                       [selected]=\"selected\"\r\n                       (select)=\"onSelect($event)\">\r\n\r\n          <ngx-datatable-column [width]=\"50\"\r\n                                [sortable]=\"false\"\r\n                                [canAutoResize]=\"false\"\r\n                                [draggable]=\"false\"\r\n                                [resizeable]=\"false\"\r\n                                [headerCheckboxable]=\"true\"\r\n                                [checkboxable]=\"true\">\r\n          </ngx-datatable-column>\r\n\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"col.SORTABLE\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div *ngIf=\"col.COLUMN_NAME == 'OpportunityName'\">\r\n                <a class=\" view-list\" [routerLink]=\"['/opportunity/viewOpportunity',row.Id]\" href=\"javascript:void(0);\" [title]=\"row[col.COLUMN_NAME]\">{{row[col.COLUMN_NAME] }}</a>\r\n              </div>\r\n\r\n              <div *ngIf=\"col.COLUMN_NAME != 'OpportunityName'\">\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                  <i *ngIf=\"row[col.COLUMN_NAME] == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                </div>\r\n                <ng-container *ngIf=\"col.DATA_TYPE=='date' || col.DATA_TYPE=='datetime' \">\r\n\r\n                  <ng-container *ngIf=\"col.DATA_TYPE=='date'\">\r\n                    <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\">\r\n                      {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                    </div>\r\n                    <!--<div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\">\r\n                      {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                    </div>-->\r\n                  </ng-container>\r\n                  <ng-container *ngIf=\"col.DATA_TYPE=='datetime' \">\r\n                    <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\">\r\n                      {{ (row[col.COLUMN_NAME] !== null) ? (row[col.COLUMN_NAME] | DateTimeToLocal) : \"\" }}\r\n                    </div>\r\n                  </ng-container>\r\n                </ng-container>\r\n                <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.COLUMN_NAME!='CreatedAt' && col.COLUMN_NAME!='ModifyAt' && col.FieldType != 'select' && col.DATA_TYPE != 'datetime'\">\r\n                  {{row[col.COLUMN_NAME] }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.COLUMN_NAME=='CreatedAt'\">\r\n                  {{ (row.CreatedAt !== null) ? (row.CreatedAt | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div [title]=\"row[col.COLUMN_NAME] | DateTimeToLocal\" *ngIf=\"col.COLUMN_NAME=='ModifyAt'\">\r\n                  {{ (row.ModifyAt !== null) ? (row.ModifyAt | DateTimeToLocal) : \"\" }}\r\n                </div>\r\n                <div *ngIf=\"col.FieldType == 'select'\">\r\n                  <div [title]=\"row[col.COLUMN_NAME]\" *ngIf=\"col.FieldFrom !=null\">\r\n                    {{row[col.COLUMN_NAME] }}\r\n                  </div>\r\n                  <div *ngIf=\"col.FieldFrom==null\">\r\n                    <div *ngFor=\"let itemColorCode of getListingColorCode(row[col.COLUMN_NAME]);\">\r\n                      <div *ngIf=\"itemColorCode.colorkey==undefined\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                      <div *ngIf=\"itemColorCode.colorkey!=undefined\" class=\"status-box\" [title]=\"itemColorCode.color\" [ngStyle]=\"{background: itemColorCode.colorkey}\">\r\n                        {{itemColorCode.color}}\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <!--<ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n          <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n            <div class=\"text-center\">\r\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' [routerLink]=\"['/opportunity/view',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye mr-2\"></i></a>\r\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleReadFlag' [routerLink]=\"['/opportunity/editOpportunity',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n              <a *ngIf='modulePermission!==null && modulePermission.roleModuleDeleteFlag' title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n            </div>\r\n          </ng-template>\r\n        </ngx-datatable-column>-->\r\n          <ngx-datatable-column [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <span class=\"actions rw_act\">\r\n                <i class=\"fa fa-ellipsis-h action_icon\" [attr.attribute-id]=\"row.Id\" aria-hidden=\"true\"></i>\r\n                <span class=\"action-list-box spn{{row.Id}}\">\r\n                  <span class=\"list-actions fsm-list\" id=\"action-list\" style=\"width:210px;\">\r\n                    <a *ngIf='companyType ==\"companytypeSolarInstall\"' class=\"actions-onclick view-list\" [routerLink]=\"['/opportunity/viewOpportunity',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye mr-2\"></i></a>\r\n                    <a *ngIf='companyType !=\"companytypeSolarInstall\"' class=\"actions-onclick view-list\" [routerLink]=\"['/opportunity/view',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye mr-2\"></i></a>\r\n                    <a *ngIf='isUpdate' class=\"actions-onclick view-list\" [routerLink]=\"['/opportunity/editOpportunity',row.Id]\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                    <a *ngIf='isDelete' class=\"actions-onclick view-list\" title=\"Click to delete.\" (click)=\"Delete(row)\" href=\"javascript:void(0);\"><i class=\"fa fa-trash text-danger\"></i></a>\r\n                    <i class=\"fa fa-times close close-action\" aria-hidden=\"true\"></i>\r\n                  </span>\r\n                </span>\r\n              </span>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"curPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\"  *ngIf='(rowCount  > 0)'>\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                <!--Showing {{(curPage - 1 )* pageSizeValue + 1}}  to {{curPage * pageSizeValue}} out of {{rowCount}}  enteries-->\r\n                {{commonService.PageString(curPage,pageSizeValue,rowCount)}}\r\n\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                               [page]=\"curPage\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!-- Kanban View -->\r\n    <div class=\"card_list_rw\" id=\"accordion\" *ngIf=\"isOpportunityView == 'Stage'\">\r\n      <ul>\r\n        <ng-container *ngFor=\"let item of formOpportunityControlList;\">\r\n          <li>\r\n            <div class=\"card\" id=\"{{item.stage_id}}\">\r\n              <div class=\"card-header\">\r\n                <a href=\"#panelBody{{item.stage_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\">\r\n                  <div class=\"tag\">{{ item.stage_name}}</div>\r\n                  <div><i class=\"fa fa-angle-down\"></i> <span>{{ item.rowcount}} items</span></div>\r\n                </a>\r\n              </div>\r\n              <div id=\"panelBody{{item.stage_name}}\" class=\"panel-collapse collapse show\" [dragEnabled]=\"true\" [dropZones]=\"[item.InnerData.Id]\" dnd-sortable-container [sortableData]=\"item.InnerData\">\r\n                <div class=\"card-body\" style=\"max-height:calc(100vh - 267px); overflow-y: auto;\" infiniteScroll [infiniteScrollDistance]=\"2\" [infiniteScrollThrottle]=\"50\" (scrolled)=\"onScroll()\">\r\n                  <ng-template [ngIf]=\"item.InnerData.length > 0\">\r\n                    <ng-container *ngFor=\"let inner of item.InnerData; let i=index\">\r\n                      <div class=\"border bx_item p-2 mb-2\" id=\"{{inner.Id}}\" dnd-sortable [sortableIndex]=\"i\" (onDropSuccess)=\"onDropSuccess(item.stage_id, inner.Id)\">\r\n                        <h3>{{inner.OpportunityName}}</h3>\r\n                        <p><b>{{inner.OpportunityDescription}}</b></p>\r\n                        <div class=\"other-description\">\r\n                          <div class=\"info\" *ngFor=\"let col of columnheading\">\r\n                            <p [title]=\"col.COLUMN_NAME\" *ngIf=\"col.DATA_TYPE == 'bit'\">\r\n                              <i *ngIf=\"col.COLUMN_NAME == false\" class=\"fa fa-times text-danger icon_tick\"></i>\r\n                              <i *ngIf=\"col.COLUMN_NAME == true\" class=\"fa fa-check text-success icon_tick\"></i>\r\n                            </p>\r\n                            <p [title]=\"col.COLUMN_NAME  | DateTimeToLocal:'Date'\" *ngIf=\"col.DATA_TYPE=='date'\">\r\n                              <i class=\"fa fa-calendar\"></i>\r\n                              <strong>{{col.DISPLAY_NAME}}:</strong> {{ (inner[col.COLUMN_NAME] !== null) ? (inner[col.COLUMN_NAME] | DateTimeToLocal:'Date') : \"\" }}\r\n                            </p>\r\n                            <p [title]=\"col.COLUMN_NAME\" *ngIf=\"col.COLUMN_NAME!='OpportunityName' && col.COLUMN_NAME!='Description' && col.DATA_TYPE!='date' && col.DATA_TYPE!='bit' && col.COLUMN_NAME!='CreatedAt' && col.COLUMN_NAME!='ModifyAt' && col.FieldType != 'select'\">\r\n                              <i class=\"fa fa fa-bullet\"></i> <strong>{{col.DISPLAY_NAME}}:</strong>  {{inner[col.COLUMN_NAME]}}\r\n                            </p>\r\n                            <p [title]=\"col.COLUMN_NAME\" *ngIf=\"col.COLUMN_NAME=='CreatedAt'\">\r\n                              <i class=\"fa fa-calendar\"></i> <strong>{{col.DISPLAY_NAME}}:</strong> {{inner[col.COLUMN_NAME]}}\r\n                            </p>\r\n                            <p [title]=\"col.COLUMN_NAME\" *ngIf=\"col.COLUMN_NAME=='ModifyAt'\">\r\n                              <i class=\"fa fa-calendar\"></i> <strong>{{col.DISPLAY_NAME}}:</strong> {{inner[col.COLUMN_NAME]}}\r\n                            </p>\r\n                          </div>\r\n                        </div>\r\n                        <div class=\"link\">\r\n                          <a  class=\"btn btn-primary\" [routerLink]=\"['/opportunity/view',inner.Id]\" title=\"View Detail\"><i class=\"fa fa-eye\"></i></a>\r\n                          <a *ngIf='isUpdate' class=\"btn btn-success\" [routerLink]=\"['/opportunity/editOpportunity',inner.Id]\" title=\"Edit\"><i class=\"fa fa-edit\"></i></a>\r\n                          <a *ngIf='isDelete' class=\"btn btn-danger\" (click)=\"Delete(inner)\" href=\"javascript:void(0);\" title=\"Click to delete.\"><i class=\"fa fa-trash\"></i></a>\r\n                        </div>\r\n                      </div>\r\n                    </ng-container>\r\n                  </ng-template>\r\n                  <ng-template [ngIf]=\"item.InnerData.length == 0\">\r\n                    <div class=\"border bx_item p-2 mb-2\" id=\"0\" dnd-sortable [sortableIndex]=\"0\" style=\"text-align: center; color:#dc3545;\" [dragEnabled]=\"false\" (onDropSuccess)=\"onDropSuccess(item.stage_id, 0)\">\r\n                      No data to display\r\n                    </div>\r\n                  </ng-template>\r\n                  <div class=\"items\">\r\n                    {{ item.rowcount}} Items  <a href=\"#panelBody{{item.stage_name}}\" data-toggle=\"collapse\" data-parent=\"#accordion\"><i class=\"fa fa-compress\"></i></a>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </li>\r\n        </ng-container>\r\n      </ul>\r\n      <div *ngIf=\"noRecord\" class=\"empty-row ng-star-inserted\" style=\"text-align: center; color: #dc3545;\">No data to display</div>\r\n    </div>\r\n    <!-- / Kanban View -->\r\n\r\n    <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n  </div>\r\n</div>\r\n<!--<div class=\"row\">\r\n  <div class=\"col-lg-12 portlets\">\r\n    <div class=\"panel\">\r\n      <div class=\"panel-header border-bottom pb-3\">\r\n        <div class=\"row mt-2\">\r\n          <div class=\"col-md-6\">\r\n            <div class=\"row searchfield  mr-1 w-100\">\r\n              <div class=\"col-md-4 float-left\">\r\n                <input class=\"form-control input-sm\" type=\"text\" [(ngModel)]='listFilter' placeholder=\"Search By Opportunity Name\" (keyup)='updateFilter($event)'>\r\n              </div>\r\n              <div class=\"col-md-8 float-left\">\r\n                <a class=\"btn btn-success form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"search()\"><span><i class=\"fa fa-search\"></i> Search</span></a>\r\n                <a class=\"btn btn-danger form-btns mr-2\" href=\"javascript:void(0);\" (click)=\"reset()\"><span><i class=\"fa fa-refresh\"></i> Reset</span></a>\r\n                <a class=\"btn btn-white mr-1 \" href=\"javascript:void(0);\" (click)=\"popUpOpen()\"><span><i class=\"fa fa-filter\"></i> Filter</span></a>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <div class=\"col-md-6\">\r\n            <div class=\"dt-buttons\">\r\n              <a class=\"btn btn-primary form-btns mr-1\" href=\"javascript:void(0);\" (click)=\"displayDetailDetail($event)\"><span><i class=\"fa fa-list-alt\"></i> Manage View</span></a>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel-content px-3 pagination2 table-responsive no-padding\">\r\n        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                       [rows]=\"columndata\"\r\n                       [columnMode]=\"'force'\"\r\n                       [headerHeight]=\"40\"\r\n                       [footerHeight]=\"40\"\r\n                       [rowHeight]=\"'auto'\"\r\n                       \r\n                       [externalPaging]=\"true\"\r\n                       [externalSorting]=\"true\"\r\n                       [loadingIndicator]=\"loadSave\"\r\n                       [count]=\"totalRecords\"\r\n                       [offset]=\"currentPage\"\r\n                       [limit]=\"pageSizeValue\"\r\n                       (page)='setPage($event)'\r\n                       (sort)=\"onSort($event)\"\r\n                       [scrollbarH]=\"true\">\r\n\r\n          <ngx-datatable-column *ngFor=\"let col of columnheading\" [name]=\"col.DISPLAY_NAME\" [prop]=\"col.COLUMN_NAME\" [sortable]=\"true\">\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" [maxWidth]=\"200\" headerClass=\"text-center\">\r\n            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n              <div class=\"text-center\">\r\n                <a><i class=\"fa fa-cog text-warning mr-2 disabled\"></i></a>\r\n                <a [routerLink]=\"['/opportunity/view',row.Id]\" title=\"View Detail\"><i class=\"fa fa-eye mr-2\"></i></a>\r\n                <a [routerLink]=\"['/opportunity/editOpportunity',row.Id]\" title=\"Edit\">\r\n                  <i class=\"fa fa-pencil text-success mr-2\"></i>\r\n                </a>\r\n                <a><i class=\"fa fa-trash text-danger disabled\"></i></a>\r\n              </div>\r\n            </ng-template>\r\n          </ngx-datatable-column>\r\n          <ngx-datatable-footer>\r\n            <ng-template ngx-datatable-footer-template\r\n                         let-rowCount=\"rowCount\"\r\n                         let-pageSize=\"pageSize\"\r\n                         let-selectedCount=\"selectedCount\"\r\n                         let-currentPage=\"currentPage\"\r\n                         let-offset=\"offset\"\r\n                         let-isVisible=\"isVisible\">\r\n              <div class=\"page-count\">\r\n                {{rowCount}} total\r\n              </div>\r\n              <div>\r\n                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                    <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                  </span>\r\n                </div>\r\n              </div>\r\n              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                               [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                               [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                               [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                               [page]=\"currentPage+1\"\r\n                               [size]=\"pageSizeValue\"\r\n                               [count]=\"totalRecords\"\r\n                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                               (change)=\"setPage($event)\">\r\n              </datatable-pager>\r\n            </ng-template>\r\n          </ngx-datatable-footer>\r\n        </ngx-datatable>\r\n\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n<app-searchfilteradd (searchFilterCondition)=\"ApplyAdvanceFilter($event)\" #templateFilterView moduleName=\"crm\" subModuleName=\"Opportunity\"></app-searchfilteradd>\r\n<app-manageviewnew #templateManageView (customViewid)=\"GetcustomViewid($event)\" moduleName=\"crm\" subModuleName=\"Opportunity\"></app-manageviewnew>\r\n\r\n<app-kanbanviewpopup #KanbanViewModal (kanbanView)=\"ShowListView($event)\"></app-kanbanviewpopup>\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityview.component.html":
/*!********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityview.component.html ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Opportunity Detail</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Home</a></li>\r\n      <li><a routerLink=\"/opportunity\">Opportunity</a></li>\r\n      <li class=\"active\">Opportunity Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<!--<app-stagemanagement></app-stagemanagement>-->\r\n\r\n<!--<div class=\"card mb-3 mt-1 border-0\" style=\"background:none;\">\r\n  <div class=\"card-body p-0\">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\" *ngFor=\"let  c of stagelist; let i=index\">\r\n        <a *ngIf=\"c.activeTab==1\" class=\"nav-link active\" (click)=\"tabclick(c.stageid)\" data-toggle=\"tab\" href=\"javascript:void(0);\" role=\"tab\" aria-controls=\"sales\" aria-selected=\"false\"><span class=\"circle\">{{c.rowNo1}}</span> {{c.stageName}}</a>\r\n        <a *ngIf=\"c.activeTab!=1\" class=\"nav-link\" (click)=\"tabclick(c.stageid)\" data-toggle=\"tab\" href=\"javascript:void(0);\" role=\"tab\" aria-controls=\"sales\" aria-selected=\"false\"> <span class=\"circle\">{{c.rowNo1}}</span> {{c.stageName}}  </a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"tab-content bg-white p-0\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade show active p-0\" id=\"operation\" role=\"tabpanel\" aria-labelledby=\"contact-tab\">\r\n        <div class=\"card-body timeline\">\r\n          <div class=\"owl-carousel step lead-step owl-loaded owl-drag\">\r\n            <div class=\"owl-stage-outer\">\r\n              <div class=\"owl-stage\" style=\"transform: translate3d(0px, 0px, 0px); transition: all 0s ease 0s; width:100%;\">\r\n                <div class=\"owl-item active\" style=\"width:100%; display: flex; flex-wrap: nowrap;\">\r\n                  <li class=\"step-item\" *ngFor=\"let  c of oplist\">\r\n                    <a href=\"javascript:void(0);\" *ngIf=\"c.StageOperationStatus == 'InProgress'; else elseCase\" (click)=\"updateStage(c.subStageId)\">\r\n                      <span [ngClass]=\"{'step-no step-default':true,'step-default' : c.StageOperationStatus == 'NotStarted',' step-green': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'InProgress'}\">\r\n                        <i *ngIf=\"c.StageOperationStatus =='Completed'\" class=\"fa fa-check\"></i>\r\n                        <i *ngIf=\"c.StageOperationStatus !='Completed'\">{{c.RowNo1}}</i>\r\n                      </span>\r\n                    </a>\r\n                    <ng-template #elseCase>\r\n                      <a>\r\n                        <span [ngClass]=\"{'step-no step-default':true,'step-default' : c.StageOperationStatus == 'NotStarted',' step-green': c.StageOperationStatus =='Completed' ,'step-dark' :c.StageOperationStatus == 'InProgress'}\">\r\n                          <i *ngIf=\"c.StageOperationStatus =='Completed'\" class=\"fa fa-check\"></i>\r\n                          <i *ngIf=\"c.StageOperationStatus !='Completed'\">{{c.RowNo1}}</i>\r\n                        </span>\r\n                      </a>\r\n                    </ng-template>\r\n                    <br />\r\n                    <span class=\"step-name\">{{c.subStageName}}</span>\r\n                    <span class=\"step-date\"> {{c.dateshow}} {{c.diff}}</span>\r\n                  </li>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n            <div class=\"owl-nav disabled\">\r\n              <button type=\"button\" role=\"presentation\" class=\"owl-prev disabled\">\r\n                <span aria-label=\"Previous\">‹</span>\r\n              </button>\r\n              <button type=\"button\" role=\"presentation\" class=\"owl-next disabled\"><span aria-label=\"Next\">›</span></button>\r\n            </div><div class=\"owl-dots disabled\"><button role=\"button\" class=\"owl-dot active\"><span></span></button></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade \" id=\"closed\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-3\">\r\n            <div class=\"p-4\">Coming Soon</div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n\r\n<div class=\"card mb-3 mt-3\">\r\n  <div class=\"card-body\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-8\">\r\n        <div class=\"border h-100\">\r\n          <div class=\"detail-heading cust_infobx px-3 py-2\">\r\n            <ul class=\"d-flex list_spc\">\r\n              <li><i class=\"fa fa-phone\"></i> {{phoneno}} </li>\r\n              <li><i class=\"fa fa-envelope\"></i> {{emailacc}}</li>\r\n              <!--<li><i class=\"fa fa-map-marker\"></i> {{Address}} </li>-->\r\n            </ul>\r\n          </div>\r\n\r\n          <div class=\"px-3 py-3\">\r\n            <div class=\"row\">\r\n\r\n              <div class=\"col-md-12\">\r\n                <div class=\"row\">\r\n                  <div class=\"col-3 mb-3\">Sub Stage Name:</div>\r\n                  <div class=\"col-3 mb-3\"><b>{{substagename}}</b></div>\r\n                  <div class=\"col-3 mb-3\">Created By:</div>\r\n                  <div class=\"col-3 mb-3\"><b>{{createdby}}</b></div>\r\n                  <div class=\"col-3 mb-3\">Created on:</div>\r\n                  <div class=\"col-3 mb-3\"><b>{{createdon  }}</b></div>\r\n                  <div class=\"col-3 mb-3\">Location:</div>\r\n                  <div class=\"col-3 mb-3\"><b>{{Address}}</b></div>\r\n                </div>\r\n              </div>\r\n\r\n              <!--<div class=\"col-md-6 text-center\">\r\n                <div class=\"row\">\r\n\r\n                </div>\r\n              </div>-->\r\n              <div class=\"col-md-12 mt-3 \">\r\n                <!--<a href=\"#\" class=\"btn btn-light-blue mr-2 px-4\" style=\"padding-left: 5px;\"><i class=\"fa fa-external-link\"></i> View Portal</a>\r\n                <a href=\"#\" class=\"btn btn-blue mr-2 px-4\"><i class=\"fa fa-phone\"></i> Call</a>-->\r\n                <a href=\"javascript:void(0);\" (click)=\"showemailpopup()\" class=\"btn btn-warning mr-2 px-4\"><i class=\"fa fa-envelope\"></i> Email</a>\r\n                <a href=\"javascript:void(0);\" class=\"btn btn-info mr-2 px-4\" (click)=\"showrequestdesignpopup()\"><i class=\"fa fa-commenting\"></i> Request Design</a>\r\n                <!--<a href=\"#\" class=\"btn btn-green px-4\"><i class=\"fa fa-comments\"></i> Chat</a>-->\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"col-md-4\">\r\n        <!--<div class=\"mapbx\"><img class=\"img-fluid\" src=\"assets/images/map-img.jpg\" alt=\"map\"></div>-->\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"card mb-3\">\r\n  <div class=\"card-body\">\r\n    <div id=\"accordion\" class=\"panel-group\">\r\n      <!--productList Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody1\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Product</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody1\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" (click)=\"GetProductList()\" data-dismiss=\"modal\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Associate Product</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"AssociatedproductpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                 [offset]=\"AssociatedproductpagedData.pager.currentPage\"\r\n                                 [limit]=\"AssociatedproductpagedData.pager.pageSize\"\r\n                                 (page)='setPageAssociateProduct($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Product Name\" [sortable]=\"false\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Product Family\" sortable=\"false\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Product Description\" sortable=\"false\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n                    <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <!--<a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>-->\r\n                          <a (click)=\"deleteAssociateproduct(row.mid)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeAssociateProduct\" appendTo=\"body\" [(ngModel)]='pageSizeValueAssociateProduct' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssociateProduct($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"AssociatedproductpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueAssociateProduct\"\r\n                                         [count]=\"AssociatedproductpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageAssociateProduct($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--proposalList Pannel-->\r\n      <!--<div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody16\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Proposal</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody16\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" [routerLink]=\"['/proposal-list/addproposal/opportunity/',this.opid]\" class=\"btn-in-panel\" data-dismiss=\"modal\" data-toggle=\"modal\"><i class=\"fa fa-plus\"></i> Add Proposal</a>\r\n\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"AssociatedproposalpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 [rowHeight]=\"'auto'\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"AssociatedproposalpagedData.pager.totalItems\"\r\n                                 [offset]=\"AssociatedproposalpagedData.pager.currentPage\"\r\n                                 [limit]=\"AssociatedproposalpagedData.pager.pageSize\"\r\n                                 (page)='setPageAssociateProposal($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Proposal Number\" [sortable]=\"false\" prop=\"Proposal_number\" [minWidth]=\"150\">\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Proposal Name\" [sortable]=\"false\" prop=\"Proposal_name\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Total System Cost\" [sortable]=\"false\" prop=\"Total_System_Cost\"></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <a (click)=\"editProposal(row.Id,this.opid)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                          <a (click)=\"deleteAssociateProposal(row.Id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeProposal\" appendTo=\"body\" [(ngModel)]='pageSizeValueProposal' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeAssociateProposal($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                         [page]=\"AssociatedproposalpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueProposal\"\r\n                                         [count]=\"AssociatedproposalpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageAssociateProposal($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>-->\r\n\r\n      <!--Email Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody6\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Email</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody6\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" (click)=\"showemailpopup()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Send Email</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"emailpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"emailpagedData.pager.totalItems\"\r\n                                 [offset]=\"emailpagedData.pager.currentPage\"\r\n                                 [limit]=\"emailpagedData.pager.pageSize\"\r\n                                 (page)='setPageNotes($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Sent To\" [sortable]=\"false\" prop=\"sent_to\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Subject\" sortable=\"false\" prop=\"subject\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Description\" sortable=\"false\" prop=\"description\" [minWidth]=\"150\">\r\n\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n\r\n\r\n                        <div title=\"{{row.description}}\" *ngIf='row.description!=null || row.description!==\"\"'>\r\n                          <a href=\"javascript:void(0);\" (click)=\"displayemaildetail(row)\"><i class=\"fa fa-eye pr-2\"></i></a>\r\n                        </div>\r\n                        <div *ngIf='row.description==null || row.description==\"\"'>\r\n                          <span>N/A</span>\r\n                        </div>\r\n                      </ng-template>\r\n\r\n                    </ngx-datatable-column>\r\n\r\n\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeemail\" appendTo=\"body\" [(ngModel)]='pageSizeValueemail' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeEmail($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fas fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fas fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fas fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fas fa-angle-right'\"\r\n                                         [page]=\"emailpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueemail\"\r\n                                         [count]=\"emailpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageNotes($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!--Notes Pannel-->\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody2\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Notes</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody2\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" (click)=\"showNotesPopup()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add Note</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"NotespagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"NotespagedData.pager.totalItems\"\r\n                                 [offset]=\"NotespagedData.pager.currentPage\"\r\n                                 [limit]=\"NotespagedData.pager.pageSize\"\r\n                                 (page)='setPageNote($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <!--<ngx-datatable-column name=\"Name\" [sortable]=\"false\" prop=\"note_name\" [minWidth]=\"150\">\r\n\r\n\r\n                </ngx-datatable-column>-->\r\n\r\n                    <ngx-datatable-column name=\"Desription\" sortable=\"false\" prop=\"note_description\" [minWidth]=\"150\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <!--<a class=\"word_break\" (click)=\"displayemaildetail(row)\" title=\"{{row.note_description}}\">{{row.note_description}}</a>-->\r\n\r\n                        <div title=\"{{row.note_description}}\" *ngIf='row.note_description!=null || row.note_description!==\"\"'>\r\n                          <a href=\"javascript:void(0);\" (click)=\"displaynotedetail(row)\">{{row.note_description | truncate : 50}}</a>\r\n                        </div>\r\n                        <div *ngIf='row.note_description==null || row.note_description==\"\"'>\r\n                          <span>N/A</span>\r\n                        </div>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <!--<a (click)=\"edit(row.Id)\" class=\"btn-edit\"><i title=\"Click to edit.\" class=\"fa fa-pencil text-success pr-2\"></i></a>-->\r\n                          <a (click)=\"DeleteNote(row.note_id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeNotes\" appendTo=\"body\" [(ngModel)]='pageSizeValuenotes' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeNotes($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fas fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fas fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fas fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fas fa-angle-right'\"\r\n                                         [page]=\"NotespagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValuenotes\"\r\n                                         [count]=\"NotespagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageNote($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <!--Contact Pannel-->\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBody3\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Contact</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBody3\" class=\"panel-collapse collapse \" style=\"\">\r\n          <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" (click)=\"AddContact()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add Contact</a>\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"table-responsive\">\r\n                <div class=\"table table-striped\">\r\n                  <ngx-datatable #table class=\"bootstrap\"\r\n                                 [rows]=\"contactpagedData.data\"\r\n                                 [columnMode]=\"'force'\"\r\n                                 [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                                 [headerHeight]=\"40\"\r\n                                 [footerHeight]=\"40\"\r\n                                 \r\n                                 [externalPaging]=\"true\"\r\n                                 [externalSorting]=\"true\"\r\n                                 [loadingIndicator]=\"loadSave\"\r\n                                 [count]=\"contactpagedData.pager.totalItems\"\r\n                                 [offset]=\"contactpagedData.pager.currentPage\"\r\n                                 [limit]=\"contactpagedData.pager.pageSize\"\r\n                                 (page)='setPageContact($event)'\r\n                                 (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                    <ngx-datatable-column name=\"Name\" [sortable]=\"false\" prop=\"Name\" [minWidth]=\"150\">\r\n\r\n\r\n                    </ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Email\" sortable=\"false\" prop=\"Email\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                    <ngx-datatable-column name=\"Mobile\" sortable=\"false\" prop=\"MobilePhone\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                    <ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <label class=\"switch\">\r\n                          <input type=\"checkbox\" disabled [checked]=\"row.IsPrimary\">\r\n                          <span class=\"slider round\"><span>Yes</span></span>\r\n                        </label>\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                      <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                        <div class=\"text-center\">\r\n                          <a *ngIf=\"row.IsPrimary != true\" (click)=\"DeleteContact(row.id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                        </div>\r\n\r\n                      </ng-template>\r\n                    </ngx-datatable-column>\r\n                    <ngx-datatable-footer>\r\n                      <ng-template ngx-datatable-footer-template\r\n                                   let-rowCount=\"rowCount\"\r\n                                   let-pageSize=\"pageSize\"\r\n                                   let-selectedCount=\"selectedCount\"\r\n                                   let-currentPage=\"currentPage\"\r\n                                   let-offset=\"offset\"\r\n                                   let-isVisible=\"isVisible\">\r\n                        <div class=\"page-count\" style=\"max-width:170px;\">\r\n                          Total Records: {{rowCount}}\r\n                        </div>\r\n                        <div>\r\n                          <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                            <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                              <ng-select [searchable]=\"false\" [items]=\"lstPageSizeContact\" appendTo=\"body\" [(ngModel)]='pageSizeValueContact' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeContact($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                         bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                            </span>\r\n                          </div>\r\n                        </div>\r\n                        <datatable-pager [pagerLeftArrowIcon]=\"'fas fa-angle-double-left'\"\r\n                                         [pagerRightArrowIcon]=\"'fas fa-angle-double-right'\"\r\n                                         [pagerPreviousIcon]=\"'fas fa-angle-left'\"\r\n                                         [pagerNextIcon]=\"'fas fa-angle-right'\"\r\n                                         [page]=\"contactpagedData.pager.currentPage+1\"\r\n                                         [size]=\"pageSizeValueContact\"\r\n                                         [count]=\"contactpagedData.pager.totalItems\"\r\n                                         [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                         (change)=\"setPageContact($event)\">\r\n                        </datatable-pager>\r\n                      </ng-template>\r\n                    </ngx-datatable-footer>\r\n                  </ngx-datatable>\r\n                </div>\r\n              </div>\r\n\r\n\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <!--<div class=\"panel \">\r\n    <div class=\"panel-heading\">\r\n      <h4 class=\"panel-title\">\r\n        <a href=\"#panelBodynine\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> File Upload</span></a>\r\n      </h4>\r\n    </div>\r\n    <div id=\"panelBodynine\" class=\"panel-collapse collapse \" style=\"\">\r\n      <div class=\"panel-body\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n\r\n            <div class=\"action\">\r\n              <a href=\"#\" class=\"btn btn-primary\">Select Files</a><a href=\"#\" class=\"btn btn-success\">Upload Files</a>\r\n            </div>\r\n            <div class=\"table-responsive mt-3\">\r\n              <table class=\"table table-hover border mb-0\">\r\n                <thead>\r\n                  <tr>\r\n                    <th>File Name</th>\r\n                    <th>File type</th>\r\n\r\n                  </tr>\r\n\r\n                </thead>\r\n                <tbody>\r\n\r\n                  <tr>\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No Record Found.</span>\r\n                    </td>\r\n                  </tr>\r\n\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>-->\r\n      <!--fileupload pannel-->\r\n      <div class=\"panel\">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodynine12\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> File Upload</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodynine12\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <form [formGroup]=\"UploadimageForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n                  <div class=\"action row\" *ngIf=\"is_converted != true\">\r\n                    <div class=\"col-12  col-md-6 col-lg-6\">\r\n                      <label>Choose File:</label>\r\n                      <div class=\"form-group\">\r\n                        <div class=\"input-group\">\r\n                          <div class=\"input-group-prepend\" *ngIf=\"imageLink!=''\">\r\n                            <!--<img src={{imageLink}} alt=\"img\" class=\"upload_image_thnumb\" data-toggle=\"modal\" data-target=\"#myModal\">-->\r\n\r\n                            <div id=\"myModal\" style=\" background: none !important;\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\r\n                              <div class=\"modal-dialog\" style=\"height:450px!important;width:450px!important; \">\r\n                                <div class=\"\">\r\n                                  <button type=\"button\" class=\"close\" style=\"color: #fff!important; \" data-dismiss=\"modal\">&times;</button>\r\n                                </div>\r\n                                <div class=\"modal-content\">\r\n                                  <div class=\"text-center\">\r\n                                    <img src={{imageLink}} alt=\"img\" style=\"height:450px!important;width:450px!important; \" class=\"img-responsive\">\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                          <div class=\"custom-file w-50 m-fileup\">\r\n                            <input formControlName=\"profilePic\" class=\"custom-file-input\" #file type=\"file\" name='file' #fileInput accept=\"image/x-png,image/gif,image/jpeg\" (change)=\"setFile($event)\" lang=\"es\">\r\n                            <label class=\"custom-file-label\">{{fileName}}</label>\r\n                          </div>\r\n                          <small><i class=\"text-secondary\">Valid image format is image/x-png, image/gif, image/jpeg and limit upto 5MB.</i> </small>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"col-sm-6 col-md-6\">\r\n                      <label>File Type:</label>\r\n                      <div class=\"form-group\">\r\n                        <ng-select #fileuploadddl [items]=\"lstfiletype\" placeholder=\"Select File type\" formControlName=\"filetype\"\r\n                                   bindLabel=\"text\" bindValue=\"value\" [ngClass]=\"{'is-invalid': (filetype.invalid && (filetype.dirty || filetype.touched) && filetype.errors?.required) }\"></ng-select>\r\n                        <small *ngIf=\"filetype.invalid && (filetype.dirty || filetype.touched) && filetype.errors?.required\"\r\n                               style=\"color:red;\">Please select File Type</small>\r\n                      </div>\r\n                    </div>\r\n                    <a href=\"javascript:void(0);\" (click)=\"SaveImage()\" class=\"btn btn-success\">Upload Files</a>\r\n                  </div>\r\n                </form>\r\n                <div class=\"table-responsive mt-3\">\r\n                  <table class=\"table table-hover border mb-0\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>File Name</th>\r\n                        <th>File Type</th>\r\n                        <th>Action</th>\r\n                      </tr>\r\n\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let c of fileuplist\">\r\n                        <td class=\"text-left\">\r\n                          <a class=\"text-dark\" href=\"{{c.FileUrl}}\">\r\n                            <img src=\"{{c.FileUrl}}\" style=\"height:50px;width:50px\" />\r\n\r\n                          </a>\r\n                        </td>\r\n                        <td class=\"text-left\">{{c.MasterValue}}</td>\r\n                        <td>\r\n                          <div class=\"text-left\">\r\n                            <a (click)=\"Deleteimage(c.Id)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                          </div>\r\n                        </td>\r\n\r\n                      </tr>\r\n                      <tr *ngIf=\"fileuplist == ''\">\r\n                        <td colspan=\"3\" align=\"center\">\r\n                          <span class=\"nofound\">No Record Found.</span>\r\n                        </td>\r\n                      </tr>\r\n\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--appointment-->\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n  <div class=\"card-body p-0\">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#upcoming\" role=\"tab\" aria-controls=\"upcoming\" aria-selected=\"true\">Upcoming Appontments</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#past\" role=\"tab\" aria-controls=\"past\" aria-selected=\"false\">Past Appointments</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"tab-content bg-white p-0\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show\" id=\"upcoming\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <table class=\"table table-cont mb-0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Appointments</th>\r\n                  <th>Customer</th>\r\n                  <th>Description</th>\r\n                  <th>Appointment Date</th>\r\n                  <th>Appointment Time</th>\r\n                  <th>Created on</th>\r\n\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let c of appointlistbefore\">\r\n                  <td>{{c.AppointmentName}}</td>\r\n                  <td>{{c.AppointmentWithWhom}}</td>\r\n                  <td>{{c.Description}}</td>\r\n                  <td><span class=\"date\">{{c.FromTimeString}}</span></td>\r\n                  <td>{{c.currenttime}}</td>\r\n                  <td>{{c.createdon}}</td>\r\n\r\n                </tr>\r\n                <tr *ngIf=\"appointlistbefore == ''\">\r\n                  <td colspan=\"5\" align=\"center\">\r\n                    <span class=\"nofound\">No Appointment Found.</span>\r\n                  </td>\r\n                </tr>\r\n\r\n              </tbody>\r\n              <!--<tfoot class=\"border-top\">\r\n                <tr>\r\n                  <td></td>\r\n                  <td class=\"text-right\"><a class=\"btn btn-success\" data-dismiss=\"modal\" href=\"#addnewwid\" data-toggle=\"modal\"><span><i class=\"fa fa-plus mr-1\"></i> Add New</span></a></td>\r\n                </tr>\r\n              </tfoot>-->\r\n\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade\" id=\"past\" role=\"tabpanel\" aria-labelledby=\"profile-tab\">\r\n\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <table class=\"table table-cont mb-0\">\r\n              <thead>\r\n                <tr>\r\n                  <th>Appointments</th>\r\n                  <th>Customer</th>\r\n                  <th>Description</th>\r\n                  <th>Appointment Date</th>\r\n                  <th>Appointment Time</th>\r\n                  <th>Created on</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let c of appointlistafter\">\r\n                  <td>{{c.AppointmentName}}</td>\r\n                  <td>{{c.AppointmentWithWhom}}</td>\r\n                  <td>{{c.Description}}</td>\r\n                  <td><span class=\"date\">{{c.FromTimeString}}</span></td>\r\n                  <td>{{c.currenttime}}</td>\r\n                  <td>{{c.createdon}}</td>\r\n                </tr>\r\n                <tr *ngIf=\"appointlistafter == ''\">\r\n                  <td colspan=\"5\" align=\"center\">\r\n                    <span class=\"nofound\">No Appointments Found.</span>\r\n                  </td>\r\n                </tr>\r\n\r\n              </tbody>\r\n\r\n\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--product Popup-->\r\n<div class=\"modal fade in show\" bsModal #product=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Associate Product</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:350px;\">\r\n\r\n        <div class=\"row\">\r\n          <div class=\"table-responsive\">\r\n            <div class=\"table table-striped\">\r\n              <ngx-datatable #table class=\"bootstrap\"\r\n                             [rows]=\"pagedData.data\"\r\n                             [scrollbarH]=\"true\"\r\n                       [rowHeight]=\"'40'\"\r\n                             [columnMode]=\"'force'\"\r\n                             [headerHeight]=\"40\"\r\n                             [footerHeight]=\"40\"\r\n                             \r\n                             [externalPaging]=\"true\"\r\n                             [externalSorting]=\"true\"\r\n                             [loadingIndicator]=\"loadSave\"\r\n                             [messages]=\"{emptyMessage:'No Record Found.'}\"\r\n                             [count]=\"pagedData.pager.totalItems\"\r\n                             [offset]=\"pagedData.pager.currentPage\"\r\n                             [limit]=\"pagedData.pager.pageSize\"\r\n                             (page)='setPage($event)'\r\n                             (sort)=\"onSort($event)\"\r\n                             [selected]=\"selected\"\r\n                             [selectionType]=\"SelectionType.checkbox\"\r\n                             [selectAllRowsOnPage]=\"false\"\r\n                             [displayCheck]=\"displayCheck\"\r\n                             (activate)=\"onActivate($event)\"\r\n                             (select)=\"onSelect($event)\">\r\n\r\n                <ngx-datatable-column [width]=\"42\"\r\n                                      [sortable]=\"false\"\r\n                                      [canAutoResize]=\"false\"\r\n                                      [draggable]=\"false\"\r\n                                      [resizeable]=\"false\"\r\n                                      [headerCheckboxable]=\"true\"\r\n                                      [checkboxable]=\"true\">\r\n                </ngx-datatable-column>\r\n\r\n\r\n\r\n                <ngx-datatable-column name=\"Product Name\" [sortable]=\"true\" prop=\"ProductName\" [minWidth]=\"150\">\r\n\r\n\r\n                </ngx-datatable-column>\r\n\r\n                <ngx-datatable-column name=\"Product Family\" sortable=\"true\" prop=\"ProductFamily\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                <ngx-datatable-column name=\"Product Description\" sortable=\"true\" prop=\"ProductDescription\"></ngx-datatable-column>\r\n\r\n                <ngx-datatable-footer>\r\n                  <ng-template ngx-datatable-footer-template\r\n                               let-rowCount=\"rowCount\"\r\n                               let-pageSize=\"pageSize\"\r\n                               let-selectedCount=\"selectedCount\"\r\n                               let-currentPage=\"currentPage\"\r\n                               let-offset=\"offset\"\r\n                               let-isVisible=\"isVisible\">\r\n                    <div class=\"page-count\" style=\"max-width:170px;\">\r\n                      Total Records: {{rowCount}}\r\n                    </div>\r\n                    <div>\r\n                      <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                        <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                          <ng-select [searchable]=\"false\" [items]=\"lstPageSize\" appendTo=\"body\" [(ngModel)]='pageSizeValue' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChange($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                     bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                        </span>\r\n                      </div>\r\n                    </div>\r\n                    <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-double-left'\"\r\n                                     [pagerRightArrowIcon]=\"'fa fa-angle-double-right'\"\r\n                                     [pagerPreviousIcon]=\"'fa fa-angle-left'\"\r\n                                     [pagerNextIcon]=\"'fa fa-angle-right'\"\r\n                                     [page]=\"pagedData.pager.currentPage+1\"\r\n                                     [size]=\"pageSizeValue\"\r\n                                     [count]=\"pagedData.pager.totalItems\"\r\n                                     [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                     (change)=\"setPage($event)\">\r\n                    </datatable-pager>\r\n                  </ng-template>\r\n                </ngx-datatable-footer>\r\n              </ngx-datatable>\r\n            </div>\r\n          </div>\r\n\r\n\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"saveProduct()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n</div>\r\n\r\n<!--notes popup-->\r\n\r\n<div class=\"modal fade in show\" bsModal #AddNotes=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add a new Notes</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:238px;\">\r\n        <form [formGroup]=\"addNoteForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Description</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"3\" class=\"form-control\" placeholder=\"Enter Note Description\" formControlName=\"noteDescription\" #machineDescription maxlength=\"1000\" [ngClass]=\"{'is-invalid': (noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && (noteDescription.errors?.required || noteDescription.errors?.maxlength)) }\"></textarea>\r\n\r\n                <small *ngIf=\"noteDescription.invalid && (noteDescription.dirty || noteDescription.touched) && noteDescription.errors?.required\"\r\n                       class=\"text-danger\">Description is required</small>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveNotes()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n\r\n<!--Email popup-->\r\n<div class=\"modal fade in show\" bsModal #email=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-xl modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Email</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:100%\">\r\n        <form [formGroup]=\"EmailForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row\">\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Sent To</label>\r\n\r\n              <ng-select [items]=\"contactlist\" placeholder=\"Select contact\" formControlName=\"sentto\"\r\n                         bindLabel=\"text\" bindValue=\"value\"\r\n                         [ngClass]=\"{'is-invalid': (sentto.invalid && (sentto.dirty || sentto.touched) && sentto.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"sentto.invalid && (sentto.dirty || sentto.touched) && sentto.errors?.required\"\r\n                     style=\"color:red;\">Please select sent to</small>\r\n            </div>\r\n            <div class=\"col-12 col-md-6 col-lg-6\">\r\n              <label>Template</label>\r\n\r\n              <ng-select [items]=\"templatelist\" placeholder=\"Select contact\" formControlName=\"templateid\"\r\n                         bindLabel=\"text\" bindValue=\"value\" (change)=\"gettemplatelist($event)\" [ngClass]=\"{'is-invalid': (templateid.invalid && (templateid.dirty || templateid.touched) && templateid.errors?.required) }\"></ng-select>\r\n              <small *ngIf=\"templateid.invalid && (templateid.dirty || templateid.touched) && templateid.errors?.required\"\r\n                     style=\"color:red;\">Please select template</small>\r\n            </div>\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Subject</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" placeholder=\"Enter Subject\" formControlName=\"subject\" [ngClass]=\"{'is-invalid': (subject.invalid && (subject.dirty || subject.touched) && (subject.errors?.required || subject.errors?.maxlength)) }\">\r\n                <small *ngIf=\"subject.invalid && (subject.dirty || subject.touched) && subject.errors?.required\"\r\n                       class=\"text-danger\">subject is required</small>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Template:<span style=\"color:red\">*</span></label>\r\n              <div class=\"form-group\">\r\n                <ckeditor #myckeditor name=\"myckeditor\"\r\n                          formControlName=\"emailDescription\"\r\n                          required\r\n                          [config]=\"ckeConfig\"\r\n                          debounce=\"500\"\r\n                          (paste)=\"onPaste($event)\"\r\n                          (change)=\"onChangetemp($event)\">\r\n                </ckeditor>\r\n                <small *ngIf=\"emailDescription.invalid && (emailDescription.dirty || emailDescription.touched) && emailDescription.errors?.required\"\r\n                       style=\"color:red;\">Template  is required</small>\r\n              </div>\r\n            </div>\r\n            <!--<div class=\"col-12 col-md-12 col-lg-12\">\r\n              <label>Description</label>\r\n              <div class=\"form-group\">\r\n                <textarea rows=\"3\" class=\"form-control\" placeholder=\"Enter Description\" formControlName=\"emailDescription\" #machineDescription maxlength=\"200\"></textarea>\r\n              </div>\r\n            </div>-->\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveEmail()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-save text-white\"></i> Send</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--emai;l description Popup-->\r\n<div class=\"modal my-popups-dboard fade show\" bsModal #emaildetail=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Email Description</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeemaildesc()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:238px;\">\r\n\r\n        <div class=\"col-md-12\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"table-responsive mt-2 cus-notification\">\r\n              <p [innerHTML]=\"emaildesc\"></p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeemaildesc()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--note description Popup-->\r\n<div class=\"modal my-popups-dboard fade show\" bsModal #notedetail=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Note Description</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closenotedesc()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:238px;\">\r\n\r\n        <div class=\"col-md-12\">\r\n          <div class=\"row\">\r\n\r\n            <div class=\"table-responsive mt-2 cus-notification\">\r\n              <p [innerHTML]=\"notedesc\"></p>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closenotedesc()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <!--<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>-->\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--Request Design Popup-->\r\n\r\n<div class=\"modal fade show\" bsModal #requestdesign=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Request Design</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closerequestdesign()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:100%; overflow:visible;\">\r\n        <form [formGroup]=\"addRequestDesignForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n        \r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Date:<span class=\"text-danger\">*</span></label>\r\n\r\n                  <div class=\"form-group datepickerinpop \">\r\n                    \r\n                    \r\n                    <p-calendar inputStyleClass=\"form-control start-date\" [minDate]=\"minimumDate\" formControlName=\"requestDate\" placeholder=\"Select Date\" [showIcon]=\"true\" [showTime]=\"false\"  icon=\"fa fa-calendar\"showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                [ngClass]=\"{'is-invalid': (requestDate.invalid && (requestDate.dirty || requestDate.touched) && requestDate.errors?.required) }\"></p-calendar>\r\n\r\n\r\n\r\n                    <small *ngIf=\"requestDate.invalid && (requestDate.dirty || requestDate.touched) && requestDate.errors?.required\"\r\n                           style=\"color:red;\">Please select Date</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>From:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"fromTime\" placeholder=\"Select From Time\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly\" [showIcon]=\"true\" [ngClass]=\"{'is-invalid': (fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required) }\" icon=\"fa fa-clock-o\" (onSelect)=\"changeToValue($event)\" [minDate]=\"minFromTime\" [maxDate]=\"maxToTime\"></p-calendar>\r\n                    <small *ngIf=\"fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required\"\r\n                           style=\"color:red;\">Please select From Time</small>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <label>Adder Notes:</label>\r\n                  <div class=\"form-group\">\r\n                    <textarea rows=\"3\" class=\"form-control\" formControlName=\"adderNotes\" maxlength=\"100000\" style=\"min-height:120px;\"></textarea>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <label>Design Notes:</label>\r\n                  <div class=\"form-group\">\r\n                    <textarea rows=\"3\" class=\"form-control\" formControlName=\"designNotes\" maxlength=\"100000\" style=\"min-height:120px;\"></textarea>\r\n                    \r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveRequestDesign()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closerequestdesign()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n<!--old Data-->\r\n<!--<div class=\"card mb-3\">\r\n  <div class=\"card-body\">\r\n    <div id=\"accordion\" class=\"panel-group\">\r\n      <div class=\"panel\">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyOne\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"> <span>Proposal Design Information</span><span class=\"text-danger\">*</span><span class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyOne\" class=\"panel-collapse collapse\" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Loan Product</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Loan_Product}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Mounting Location</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Mounting_Location}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Shop has Electrical Sub Panel</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Shop_has_Electrical_Sub_Panel}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Main Panel Upgrade</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{mainpannelupgrade}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Insulation Upgrade</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Insulation_Upgrade}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Roof Type</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Roof_Type}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Roof Material</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Roof_Material}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">LED Lightbulb Upgrade</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{LED_Lightbulb_Upgrade}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Re-Roof Needed</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Re_Roof_Needed}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Smart Thermostat Installation</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Smart_Thermostat_Installation}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Max R Upgrade</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Max_R_Upgrade}} </b></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel\">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyTwo\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"> <span>Additional Information</span> <span class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyTwo\" class=\"panel-collapse collapse\" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Opportunity Name</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{OpportunityName}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Close Date</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{closeddate}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Description</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b> {{Description}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Synced Quote</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b> {{syncquate}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Primary Campaign Source</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{primarycampsourc}} </b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Lead Source</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b> {{leadsource}}</b></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel\">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyThree\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Verifications</span> <span class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyThree\" class=\"panel-collapse collapse\" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Request Proposal Design</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Request_Proposal_Design}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">ROI Analysis Completed</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{ROI_Analysis_Completed}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Discovery Completed</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Discovery_Completed}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Probability (%)</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Probability}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Budget Confirmed</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Budget_Confirmed}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Loss Reason</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Loss_Reason}} </b></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyFour\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span>Qualifying Questions</span> <span class=\"edit\"><i class=\"fa fa-pencil\"></i></span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyFour\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Credit Threshold Met</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Credit_Threshold_Met}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Aware of Solar Tax Liabilities</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Aware_of_Solar_Tax_Liabilities}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Aware of Solar Tax Credits (ITC)</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Aware_of_Solar_Tax_Credits_ITC}}</b></div>\r\n              </div>\r\n              <div class=\"col-md-6 d-flex\">\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\">Homeowner</div>\r\n                <div class=\"col-6 mb-2 pb-2 border-bottom float-left\"><b>{{Homeowner}}</b></div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyFive\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Work Orders</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyFive\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover\">\r\n                <thead>\r\n                  <tr>\r\n\r\n                    <th class=\"text-left\">Work Order Number</th>\r\n                    <th class=\"text-left\">Subject</th>\r\n                    <th class=\"text-left\">Account</th>\r\n                    <th class=\"text-left\">Priority</th>\r\n                    <th class=\"text-left\">Status</th>\r\n\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let  c of worklist\">\r\n\r\n                    <td class=\"d-blue-num text-left\">{{c.WorkOrderNumber}}</td>\r\n                    <td class=\"text-left\">{{c.Subject}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.Name}}</td>\r\n                    <td class=\"text-left\">{{c.Priority}}</td>\r\n                    <td class=\"text-left\">{{c.Status}}</td>\r\n\r\n                  </tr>\r\n                  <tr *ngIf=\"worklist == ''\">\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No work order Found.</span>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodysix\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Products</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodysix\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover\">\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"text-left\">Product</th>\r\n                    <th class=\"text-left\">Quantity</th>\r\n                    <th class=\"text-left\">Sales Price</th>\r\n                    <th class=\"text-left\">Total Price</th>\r\n                    <th class=\"text-left\">List Price</th>\r\n                    <th class=\"text-left\">Product Code</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let  c of productlist\">\r\n                    <td class=\"text-left\">{{c.PName}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.Quantity}}</td>\r\n                    <td class=\"text-left\">{{c.SalePrice}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.Subtotal}}</td>\r\n                    <td class=\"text-left\">{{c.ListPrice}}</td>\r\n                    <td class=\"text-left\">{{c.ProductCode}}</td>\r\n                  </tr>\r\n                  <tr *ngIf=\"productlist == ''\">\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No Product Found.</span>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyseven\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Proposals</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyseven\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover\">\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"text-left\">Proposal Number</th>\r\n                    <th class=\"text-left\">Proposal Name</th>\r\n                    <th class=\"text-left\">Stage</th>\r\n                    <th class=\"text-left\">Total Price</th>\r\n                    <th class=\"text-left\">Primary</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let c of proposallist\">\r\n                    <td class=\"text-left\">{{c.Id}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.ProposalName}}</td>\r\n                    <td class=\"text-left\">{{c.Stage}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.Total_Price_Override_Calc}}</td>\r\n                    <td class=\"text-left\">\r\n                      {{c.Primary_Contact}}\r\n                    </td>\r\n                  </tr>\r\n                  <tr *ngIf=\"proposallist == ''\">\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No Proposal Found.</span>\r\n                    </td>\r\n                  </tr>\r\n\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodycontract\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span>Contracts</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodycontract\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover\">\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"text-left\">Contract Number</th>\r\n                    <th class=\"text-left\">Account Name</th>\r\n                    <th class=\"text-left\">Status</th>\r\n\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let c of contractlist\">\r\n                    <td class=\"text-left\">{{c.ContractId}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.Name}}</td>\r\n                    <td class=\"text-left\">{{c.Status}}</td>\r\n\r\n                  </tr>\r\n                  <tr *ngIf=\"contractlist == ''\">\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No Contract Found.</span>\r\n                    </td>\r\n                  </tr>\r\n\r\n\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodyeght\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> Tasks</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodyeght\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"table-responsive\">\r\n              <table class=\"table table-hover\">\r\n                <thead>\r\n                  <tr>\r\n                    <th class=\"text-left\">Tasks</th>\r\n                    <th class=\"text-left\">Status</th>\r\n                  </tr>\r\n                </thead>\r\n                <tbody>\r\n                  <tr *ngFor=\"let c of tasklist\">\r\n                    <td class=\"text-left\">{{c.Task}}</td>\r\n                    <td class=\"d-blue-num text-left\">{{c.TaskStatus}}</td>\r\n                  </tr>\r\n                  <tr *ngIf=\"tasklist == ''\">\r\n                    <td colspan=\"3\" align=\"center\">\r\n                      <span class=\"nofound\">No Task Found.</span>\r\n                    </td>\r\n                  </tr>\r\n                </tbody>\r\n              </table>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"panel \">\r\n        <div class=\"panel-heading\">\r\n          <h4 class=\"panel-title\">\r\n            <a href=\"#panelBodynine\" class=\"accordion-toggle collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"false\"><span> File Upload</span></a>\r\n          </h4>\r\n        </div>\r\n        <div id=\"panelBodynine\" class=\"panel-collapse collapse \" style=\"\">\r\n          <div class=\"panel-body\">\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12\">\r\n                <label>Click the \"Select Files\" Button to select one or more files to upload</label>\r\n                <div class=\"action\">\r\n                  <a href=\"#\" class=\"btn btn-primary\">Select Files</a><a href=\"#\" class=\"btn btn-success\">Upload Files</a>\r\n                </div>\r\n                <div class=\"table-responsive mt-3\">\r\n                  <table class=\"table table-hover border mb-0\">\r\n                    <thead>\r\n                      <tr>\r\n                        <th>File Name</th>\r\n                        <th>File type</th>\r\n\r\n                      </tr>\r\n\r\n                    </thead>\r\n                    <tbody>\r\n                      <tr *ngFor=\"let c of fileuplist\">\r\n                        <td class=\"text-left\">\r\n                          <a class=\"text-dark\" href=\"{{c.FileUrl}}\">\r\n                            <img src=\"{{c.FileUrl}}\" style=\"height:50px;width:50px\" />\r\n\r\n                          </a>\r\n                        </td>\r\n                        <td class=\"text-left\">{{c.Description}}</td>\r\n\r\n                      </tr>\r\n                      <tr *ngIf=\"fileuplist == ''\">\r\n                        <td colspan=\"3\" align=\"center\">\r\n                          <span class=\"nofound\">No Record Found.</span>\r\n                        </td>\r\n                      </tr>\r\n\r\n                    </tbody>\r\n                  </table>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n<div class=\"card mb-3 mt-3 mb-4\">\r\n  <div class=\"card-body \">\r\n    <ul class=\"nav nav-tabs nav-cust\" id=\"myTab\" role=\"tablist\">\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link active show\" data-toggle=\"tab\" href=\"#upcoming\" role=\"tab\" aria-controls=\"upcoming\" aria-selected=\"true\">Upcoming Appontments</a>\r\n      </li>\r\n      <li class=\"nav-item\">\r\n        <a class=\"nav-link\" data-toggle=\"tab\" href=\"#past\" role=\"tab\" aria-controls=\"past\" aria-selected=\"false\">Past Appointments</a>\r\n      </li>\r\n    </ul>\r\n    <div class=\"tab-content bg-white p-0\" id=\"myTabContent\">\r\n      <div class=\"tab-pane fade active show\" id=\"upcoming\" role=\"tabpanel\" aria-labelledby=\"home-tab\">\r\n        <div class=\"row\">\r\n          <div class=\"col-md-12\">\r\n            <table class=\"table table-cont mb-0\">\r\n              <thead>\r\n                <tr>\r\n                  <th style=\"width:80%\">Appointments</th>\r\n                  <th>Date</th>\r\n                </tr>\r\n              </thead>\r\n              <tbody>\r\n                <tr *ngFor=\"let c of appointlistbefore\">\r\n                  <td>{{c.AppointmentName}}</td>\r\n                  <td><span class=\"date\">{{c.FromTimeString}}</span></td>\r\n                </tr>\r\n                <tr *ngIf=\"appointlistbefore == ''\">\r\n                  <td colspan=\"3\" align=\"center\">\r\n                    <span class=\"nofound\">No Appointment Found.</span>\r\n                  </td>\r\n                </tr>\r\n\r\n              </tbody>\r\n              <tfoot class=\"border-top\">\r\n                <tr>\r\n                  <td></td>\r\n                  <td class=\"text-right\"><a class=\"btn btn-success\" data-dismiss=\"modal\" href=\"#addnewwid\" data-toggle=\"modal\"><span><i class=\"fa fa-plus mr-1\"></i> Add New</span></a></td>\r\n                </tr>\r\n              </tfoot>\r\n\r\n            </table>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"tab-pane fade\" id=\"past\" role=\"tabpanel\" aria-labelledby=\"profile-tab\"><div class=\"p-4\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <table class=\"table table-cont mb-0\">\r\n        <thead>\r\n          <tr>\r\n            <th style=\"width:80%\">Appointments</th>\r\n            <th>Date</th>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr *ngFor=\"let c of appointlistafter\">\r\n            <td>{{c.AppointmentName}}</td>\r\n            <td><span class=\"date\">{{c.FromTimeString}}</span></td>\r\n          </tr>\r\n          <tr *ngIf=\"appointlistafter == ''\">\r\n            <td colspan=\"3\" align=\"center\">\r\n              <span class=\"nofound\">No Appointment Found.</span>\r\n            </td>\r\n          </tr>\r\n\r\n        </tbody>\r\n\r\n\r\n      </table>\r\n    </div>\r\n  </div>\r\n</div></div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n\r\n\r\n<div class=\"modal my-popups-dboard fade show\" id=\"addnewwid\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add a new appointment</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"close()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"overflow:auto; margin-bottom:10px; height:238px;\">\r\n        <form [formGroup]=\"addForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Appointment Type User:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select #clearDrop [items]=\"lstappointment\"\r\n                               placeholder=\"Select Appointment Type\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"appointmenttypeId\"\r\n                               [closeOnSelect]=\"true\">\r\n                    </ng-select>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Appoitment with whom:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"lstCustomer\" [loading]=\"loadSave\" placeholder=\"Select Lender\" formControlName=\"customerId\"\r\n                               bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Date:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\" formControlName=\"appointmentDueDate\" placeholder=\"Select Date\" [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-12 col-md-6 col-lg-3\">\r\n                  <label>From:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"fromTime\" placeholder=\"Select From Time\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-6 col-lg-3\">\r\n                  <label>To:<span class=\"text-danger\"></span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"toTime\" placeholder=\"Select To Time\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly1\"></p-calendar>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-primary form-btns\" (click)=\"Save()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"close()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityviewNew.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityviewNew.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"header float-left w-100 mb-2\">\r\n  <h2 class=\"float-left pr-2\"><strong>Opportunity Detail</strong></h2>\r\n  <div class=\"breadcrumb-wrapper\">\r\n    <ol class=\"breadcrumb\">\r\n      <li><a routerLink=\"/dashboard\">Home</a></li>\r\n      <li><a routerLink=\"/opportunity\">Opportunity</a></li>\r\n      <li class=\"active\">Opportunity Detail</li>\r\n    </ol>\r\n  </div>\r\n\r\n</div>\r\n<div class=\"clearfix\"></div>\r\n<div class=\"clearfix\"></div>\r\n\r\n<div class=\"card mb-4 border\">\r\n  <span class=\"text-capitalize p-3 font-weight-bold border-bottom heading-above-subhead\">\r\n    <i class=\"fa fa-cogs text-dark float-left p-1 mr-2\" style=\"font-size: 27px;\"></i>\r\n    <span class=\"float-left w-85-res\"><span>Opportunity</span> {{OpportunityName}}</span>\r\n    <span class=\"cntnt-right-btn multibtns mr15 btn-iconres\">\r\n\r\n      <div class=\"d-inline-block mr-2 align-top\" style=\"max-width:190px;\">\r\n        <select class=\"form-control\" [(ngModel)]=\"selectedAction\" (change)=\"ddlOpportunity($event.target.value)\">\r\n          <option value=\"0\">Action</option>\r\n          <option value=\"1\">Make an Appointment</option>\r\n          <option value=\"2\">Send automatic Contract</option>\r\n          <option value=\"3\">Request Design</option>\r\n          <option value=\"4\"> Request ReDesign</option>\r\n        </select>\r\n      </div>\r\n      <a [routerLink]=\"['/opportunity/editOpportunity/',opid]\" class=\"btn btn-success text-white mr-2 mb-0 mb-md-2\"><i class=\"fa fa-pencil mr-1\"></i> Edit</a>\r\n      <!--<a href=\"javascript:void(0);\" (click)=\"makeAppointment()\" class=\"btn btn-info form-btns mr-2 mb-0 mb-md-2\"><i class=\"fa fa-calendar\"></i> Make an Appointment</a>\r\n      <a (click)=\"sendAutomaticContract()\" class=\"btn btn-orange text-white  mr-2 mb-0 mb-md-2\"><i class=\"fa fa-cog mr-1\"></i> Send Automatic Contract</a>\r\n      <a (click)=\"showrequestdesignpopup()\" class=\"btn fc-button-primary text-white mr-2 mb-0 mb-md-2\"><i class=\"fa fa-cog mr-1\"></i> Request Design</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-primary text-white mr-2 mb-0 mb-md-2\" (click)=\"showRerequestdesignpopup()\"><i class=\"fa fa-cogs mr-1\"></i> Request ReDesign</a>-->\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-info text-white mr-2 mb-0 mb-md-2\" data-dismiss=\"modal\" (click)=\"openSendToLoanHomi(opid)\" data-toggle=\"modal\"><i class=\"fa fa-paper-plane mr-1\"></i>Send To LoanHomi</a>\r\n      <a href=\"javascript:void(0);\" class=\"btn btn-dark text-white mb-0 mb-md-2\" (click)=\"OnBackToListClick()\"><i class=\"fa fa-arrow-left mr-1\"></i> Back</a>\r\n\r\n    </span>\r\n  </span>\r\n  <div class=\"col-12 float-left d-md-flex p-0 py-resp py-2 py-sm-0\">\r\n    <ng-container *ngFor=\"let item of customCompnentValuesTop\">\r\n      <div class=\"col pb-3\" *ngIf=\"item.field_route ==null\">\r\n        <span class=\"py-1 d-block\"><strong>{{ item.display_name}}:</strong></span>\r\n        <span class=\"p-0 d-block\">{{ item.value}}</span>\r\n      </div>\r\n      <div class=\"col\" *ngIf=\"item.field_route !==null\">\r\n        <span class=\"py-1 d-block\"><strong>{{ item.display_name}}:</strong></span>\r\n        <span class=\"p-0 d-block\"><a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\">{{ item.value}}</a></span>\r\n      </div>\r\n\r\n      <!--\r\n           <div class=\"col pb-3\" *ngIf=\"item.ColumnName!='Primary_Proposal'\">\r\n        <span class=\"py-1 d-block\"><strong>{{ item.display_name}}:</strong></span>\r\n        <span class=\"p-0 d-block\">{{ item.value}}</span>\r\n      </div>\r\n            <div class=\"col\" *ngIf=\"item.ColumnName=='Primary_Proposal'\">\r\n        <span class=\"py-2 d-block\"><strong>{{ item.display_name}}:</strong> <a href=\"javascript:void(0);\" [routerLink]=\"[item.field_route,item.ref_value]\"> {{ item.value}}</a></span>\r\n      </div>-->\r\n    </ng-container>\r\n  </div>\r\n</div>\r\n\r\n<app-stagemanagement #stageManagement [submoduleName]=\"submoduleName\" [moduleName]=\"moduleName\" (newItemEvent)=\"addItem($event)\"></app-stagemanagement>\r\n<app-makeappointment #makeappointment (Onsaved)=\"childEvent()\"></app-makeappointment>\r\n\r\n<!--<div class=\"card mb-3 mb-4 border\">\r\n  <img src=\"../../../assets/images/chat.jpg\" style=\"width: auto; max-width: 1304px;\" />\r\n</div>-->\r\n\r\n<div class=\"card mb-3 mt-3 mb-4 border-0\" style=\"background:none\">\r\n\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader\"></app-loader>\r\n\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-12\">\r\n      <div class=\"panel-content w-100 bg-white p-2 px-3 scroll-in-content\">\r\n        <div class=\"row\">\r\n\r\n          <div class=\"col-sm-12 col-lg-8\">\r\n            <h3 class=\"form-heading mt-0\"><span>Details</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <form [formGroup]=\"form\" *ngIf=\"form\">\r\n                  <ng-container *ngFor=\"let item of formControlList\">\r\n                    <div class=\"panel active\">\r\n                      <div class=\"panel-heading\">\r\n                        <h4 class=\"panel-title\">\r\n                          <a href=\"#{{item.group_display_name}}\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                            <span> {{item.group_name}}</span>\r\n                          </a>\r\n                        </h4>\r\n                      </div>\r\n                      <div id=\"{{item.group_display_name}}\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                        <div class=\"panel-body row px-0 mt-0\">\r\n                          <div class=\"col-sm-12 col-md-6 col-lg-4\" *ngFor=\"let inner of item.InnerData;\">\r\n                            <div class=\"input-group border-bottom\">\r\n                              <div class=\"col-sm-12 col-md-6 px-0\">\r\n                                <span class=\"py-2 d-block\"><strong>{{ inner.display_name}}:</strong></span>\r\n                              </div>\r\n                              <div class=\"col-sm-12 col-md-6\">\r\n                                <span *ngIf='inner.dt_code==\"datetime\" || inner.dt_code==\"date\" ' class=\"py-2 d-block\">\r\n                                  <ng-container *ngIf='inner.dt_code==\"datetime\"'>{{ inner.value | DateTimeToLocal}}</ng-container>\r\n                                  <ng-container *ngIf='inner.dt_code==\"date\"'>{{ inner.value | DateTimeToLocal:'Date'}}</ng-container>\r\n                                </span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route==null && inner.dt_code!='datetime' && inner.dt_code!='date'\" class=\"py-2 d-block\">{{ inner.value}}</span>\r\n                                <span *ngIf=\"inner.value!=null && inner.dt_code!='checkbox' && inner.dt_code!='boolean' && inner.field_route!=null\" class=\"py-2 d-block\">\r\n                                  <a href=\"javascript:void(0);\" [routerLink]=\"[inner.field_route,inner.ref_value]\">{{ inner.value}}</a>\r\n                                </span>\r\n\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='boolean'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch  mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                                <!--============================== For CheckBox ===========================-->\r\n                                <div class=\"form-control pl-0 border-0 bg-transparent\" *ngIf=\"inner.dt_code=='checkbox'\">\r\n                                  <div class=\"form-check form-check-inline\">\r\n                                    <div class=\"custom-control custom-checkbox pl-0\">\r\n                                      <label class=\"switch mb-0\">\r\n                                        <input type=\"checkbox\" id=\"chk_{{inner.custom_field_id}}\" [formControlName]=\"inner.form_controlName\" disabled>\r\n                                        <span class=\"slider round\" id=\"{{inner.custom_field_id}}\"><span>Yes</span></span>\r\n                                      </label>\r\n                                    </div>\r\n                                  </div>\r\n                                </div>\r\n                              </div>\r\n                            </div>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                  </ng-container>\r\n                </form>\r\n              </div>\r\n          </div>\r\n          <div class=\"col-sm-12 col-lg-4 relatedtab\">\r\n            <h3 class=\"form-heading mt-0\"><span>Related</span></h3>\r\n              <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n                <!--==========================Utility & Proposal Design Information Account Detail ===========================================================-->\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#account\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Utility & Proposal Design Information</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"account\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstAccounts.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstAccounts.pager.totalItems\"\r\n                                       [offset]=\"lstAccounts.pager.currentPage\"\r\n                                       [limit]=\"lstAccounts.pager.pageSize\"\r\n                                       (page)='setAccountPageNo($event)'\r\n                                       (sort)=\"onAccountSort($event)\">\r\n                          <ngx-datatable-column name=\"Account\" prop=\"Name\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Utility Company\" prop=\"Utility_Company\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Utility Account Number\" prop=\"Utility_Account_Number\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Utility Meter Number\" prop=\"Utility_Meter_Number\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Estimated Annual Kwh Usage\" prop=\"Estimated_Annual_Kwh_Usage\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Last Utility Bill URL\" prop=\"Last_Utility_Bill_URL\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Home Sq. Ft.\" prop=\"Home_Sq_Ft\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Tax Rate\" prop=\"Tax_Rate\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"FTC Not Eligible\" prop=\"FTC_Not_Eligible\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" disabled [checked]=\"row.FTC_Not_Eligible\">\r\n                                <span class=\"slider round\"><span>Yes</span></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Billing Address\" prop=\"BillingAddress\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Full Utility Bill\" prop=\"Full_Utility_Bill\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" disabled [checked]=\"row.Full_Utility_Bill\">\r\n                                <span class=\"slider round\"><span>Yes</span></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"No Utility Account or Meter Number\" prop=\"No_Utility_Account_or_Meter_Number\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <!--*ngIf='row.No_Utility_Account_or_Meter_Number'-->\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" disabled [checked]=\"row.No_Utility_Account_or_Meter_Number\">\r\n                                <span class=\"slider round\"><span>Yes</span></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Action\" [sortable]=\"false\" headerClass=\"text-center\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a href=\"javascript:void(0);\" (click)=\"Edit_Utility_Account(row)\" title=\"Edit\"><i class=\"fa fa-pencil text-success pr-2\"></i></a>\r\n                                <!--<a href=\"javascript:void(0);\" (click)=\"deleteAssignedResource(row,'AssignedResource')\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>-->\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstAccounts.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstAccounts.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <!--<div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                  {{commonService.PageString(lstAccounts.pager.currentPage,lstAccounts.pager.pageSize,rowCount)}}\r\n                              </div>-->\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstAccounts.pager.currentPage\"\r\n                                               [size]=\"lstAccounts.pager.pageSize\"\r\n                                               [count]=\"lstAccounts.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstAccounts.pager.pageSize) > 1)\"\r\n                                               (change)=\"setAccountPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#Contact\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Contact ({{contactCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"Contact\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <a href=\"javascript:void(0);\" class=\"btn-in-panel\" data-dismiss=\"modal\" (click)=\"AddContact()\" data-toggle=\"modal\"><i class=\"fa fa-plus mr-2\"></i> Add</a>\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap\"\r\n                                       [rows]=\"contactpagedData.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"contactpagedData.pager.totalItems\"\r\n                                       [offset]=\"contactpagedData.pager.currentPage\"\r\n                                       [limit]=\"contactpagedData.pager.pageSize\"\r\n                                       (page)='setPageContact($event)'\r\n                                       (sort)=\"onSort($event)\">\r\n\r\n\r\n\r\n                          <ngx-datatable-column name=\"Name\" [sortable]=\"true\" prop=\"Name\" [minWidth]=\"150\">\r\n\r\n\r\n                          </ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Email\" sortable=\"false\" prop=\"Email\" [minWidth]=\"150\"></ngx-datatable-column>\r\n\r\n                          <ngx-datatable-column name=\"Mobile\" sortable=\"false\" prop=\"MobilePhone\" [minWidth]=\"150\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" disabled [checked]=\"row.IsPrimary\">\r\n                                <span class=\"slider round\"><span>Yes</span></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column [maxWidth]=\"200\" headerClass=\"text-center\" name=\"Action\" [sortable]=\"false\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <div class=\"text-center\">\r\n                                <a *ngIf=\"row.IsPrimary != true\" (click)=\"DeleteContact(row.id,row.Name)\" class=\"btn-delete\"><i title=\"Click to delete.\" class=\"fa fa-trash text-danger\"></i></a>\r\n                              </div>\r\n\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(contactpagedData.pager.currentPage+1 - 1 )* pageSizeValueContact + 1}}  to {{contactpagedData.pager.currentPage+1 * pageSizeValueContact}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(contactpagedData.pager.currentPage,contactpagedData.pager.pageSize,rowCount)}}\r\n                              </div>\r\n                              <!--<div>\r\n                                <div style=\"color:black; margin-right:10px;\" class=\"page-size-record\">\r\n                                  <span style=\"text-align:right; width:80px;vertical-align: middle;\">\r\n                                    <ng-select [searchable]=\"false\" [items]=\"lstPageSizeContact\" appendTo=\"body\" [(ngModel)]='pageSizeValueContact' dropzone=\"fixed\" [clearable]=\"false\" (change)=\"onChangeContact($event)\" draggable=\"false\" [closeOnSelect]=\"true\"\r\n                                               bindLabel=\"text\" bindValue=\"text\"></ng-select>\r\n                                  </span>\r\n                                </div>\r\n                              </div>-->\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"contactpagedData.pager.currentPage+1\"\r\n                                               [size]=\"pageSizeValueContact\"\r\n                                               [count]=\"contactpagedData.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / pageSize) > 1)\"\r\n                                               (change)=\"setPageContact($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--=====================================================================================================================================-->\r\n                <!--==================================================== Product ===========================================================-->\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#Product\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Products ({{productCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"Product\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstProducts.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstProducts.pager.totalItems\"\r\n                                       [offset]=\"lstProducts.pager.currentPage\"\r\n                                       [limit]=\"lstProducts.pager.pageSize\"\r\n                                       (page)='setProductsPageNo($event)'\r\n                                       (sort)=\"onProductsSort($event)\">\r\n\r\n                          <ngx-datatable-column name=\"Product Name \" prop=\"ProductName\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Product Family\" prop=\"ProductFamily\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Product Code\" prop=\"ProductCode\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstProducts.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstProducts.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n                                ss\r\n                                <!--Showing {{(lstProducts.pager.currentPage - 1 )* lstProducts.pager.pageSize + 1}}  to {{lstProducts.pager.currentPage * lstProducts.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstProducts.pager.currentPage,lstProducts.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstProducts.pager.currentPage\"\r\n                                               [size]=\"lstProducts.pager.pageSize\"\r\n                                               [count]=\"lstProducts.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstProducts.pager.pageSize) > 1)\"\r\n                                               (change)=\"setProductsPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--==============================================================================================================================-->\r\n                <!--======================================================Work Orders=============================================================-->\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#workOrders\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Work Orders ({{workOrderCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"workOrders\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstWorkOrders.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstWorkOrders.pager.totalItems\"\r\n                                       [offset]=\"lstWorkOrders.pager.currentPage\"\r\n                                       [limit]=\"lstWorkOrders.pager.pageSize\"\r\n                                       (page)='setWorkorderPageNo($event)'\r\n                                       (sort)=\"onWorkOrdersSort($event)\">\r\n\r\n                          <!--<ngx-datatable-column name=\"Work Order Number\" prop=\"WorkOrderNumber\" [sortable]=\"true\"></ngx-datatable-column>-->\r\n                          <ngx-datatable-column name=\"Work Order Number\" prop=\"WorkOrderNumber\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <a class=\"view-list\" [routerLink]=\"['/workorder/view',row.Id]\" href=\"javascript:void(0);\" [title]=\"row.WorkOrderNumber\">{{row.WorkOrderNumber}}</a>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Subject\" prop=\"Subject\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Sub Status\" prop=\"SubStatus\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Work Type\" prop=\"WorkType\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Created Date\" prop=\"CreatedDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span *ngIf=\"!row.CreatedDate\" [title]=\"row.CreatedDate\">-</span>\r\n                              <span *ngIf=\"row.CreatedDate\" [title]=\"row.CreatedDate\">{{row.CreatedDate | DateTimeToLocal }}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"End Date\" prop=\"EndDate\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span *ngIf=\"!row.EndDate\" [title]=\"row.EndDate\">-</span>\r\n                              <span *ngIf=\"row.EndDate\" [title]=\"row.EndDate\">{{row.EndDate | DateTimeToLocal }}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"FollowUp DateTime\" prop=\"FollowUpDateTime\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <span *ngIf=\"!row.FollowUpDateTime\" [title]=\"row.FollowUpDateTime\">-</span>\r\n                              <span *ngIf=\"row.FollowUpDateTime\" [title]=\"row.FollowUpDateTime\">{{row.FollowUpDateTime | DateTimeToLocal }}</span>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"FollowUp Note\" prop=\"FollowUpNote\" [sortable]=\"true\"></ngx-datatable-column>\r\n\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstWorkOrders.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstWorkOrders.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(lstWorkOrders.pager.currentPage - 1 )* lstWorkOrders.pager.pageSize + 1}}  to {{lstWorkOrders.pager.currentPage * lstWorkOrders.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstWorkOrders.pager.currentPage,lstWorkOrders.pager.pageSize,rowCount)}}\r\n\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstWorkOrders.pager.currentPage\"\r\n                                               [size]=\"lstWorkOrders.pager.pageSize\"\r\n                                               [count]=\"lstWorkOrders.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstWorkOrders.pager.pageSize) > 1)\"\r\n                                               (change)=\"setWorkorderPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--==============================================================================================================================-->\r\n                <!--==================================================== Contracts ===========================================================-->\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#contract\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Contract ({{ContractCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"contract\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstContract.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstContract.pager.totalItems\"\r\n                                       [offset]=\"lstContract.pager.currentPage\"\r\n                                       [limit]=\"lstContract.pager.pageSize\"\r\n                                       (page)='setContractPageNo($event)'\r\n                                       (sort)=\"onContractSort($event)\">\r\n                          <ngx-datatable-column name=\"Contract Number\" prop=\"ContractNumber\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <a [routerLink]=\"['/contract/view',row.Id]\">{{row.ContractNumber}}</a>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Name\" prop=\"Name\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Status\" prop=\"Status\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstContract.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstContract.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(lstContract.pager.currentPage - 1 )* lstContract.pager.pageSize + 1}}  to {{lstContract.pager.currentPage * lstContract.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstContract.pager.currentPage,lstContract.pager.pageSize,rowCount)}}\r\n                              </div>\r\n\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstContract.pager.currentPage\"\r\n                                               [size]=\"lstContract.pager.pageSize\"\r\n                                               [count]=\"lstContract.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstContract.pager.pageSize) > 1)\"\r\n                                               (change)=\"setContractPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--==============================================================================================================================-->\r\n                <!--==================================================== Proposals ===========================================================-->\r\n                <div class=\"panel active\">\r\n                  <div class=\"panel-heading\">\r\n                    <h4 class=\"panel-title\">\r\n                      <a href=\"#proposal\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                        <span>Proposals ({{proposalCount}})</span>\r\n                      </a>\r\n                    </h4>\r\n                  </div>\r\n                  <div id=\"proposal\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                    <div class=\"panel-body p-2 mt-0\">\r\n                      <div class=\"table-responsive ngxtbl\">\r\n                        <ngx-datatable #table class=\"bootstrap table table-hover table-dynamic\"\r\n                                       [rows]=\"lstProposals.data\"\r\n                                       [columnMode]=\"'force'\"\r\n                                       [scrollbarH]=\"true\"\r\n                                       [rowHeight]=\"'40'\"\r\n                                       [headerHeight]=\"40\"\r\n                                       [footerHeight]=\"40\"\r\n                                       [externalPaging]=\"true\"\r\n                                       [externalSorting]=\"true\"\r\n                                       [loadingIndicator]=\"loadSave\"\r\n                                       [count]=\"lstProposals.pager.totalItems\"\r\n                                       [offset]=\"lstProposals.pager.currentPage\"\r\n                                       [limit]=\"lstProposals.pager.pageSize\"\r\n                                       (page)='setProposalPageNo($event)'\r\n                                       (sort)=\"onProposalSort($event)\">\r\n                          <ngx-datatable-column name=\"Proposal Number\" prop=\"ProposalNumber\" [sortable]=\"true\"> </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Proposal Name\" prop=\"Name\" [sortable]=\"true\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <a [routerLink]=\"['/proposal-list/viewproposal',row.Id]\">{{row.Name}}</a>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Total System Cost\" prop=\"TotalSystemCost\" [sortable]=\"true\"></ngx-datatable-column>\r\n                          <ngx-datatable-column name=\"Primary\" sortable=\"true\" prop=\"IsPrimary\">\r\n                            <ng-template let-row=\"row\" ngx-datatable-cell-template>\r\n                              <label class=\"switch\">\r\n                                <input type=\"checkbox\" disabled [checked]=\"row.IsPrimary\">\r\n                                <span class=\"slider round\"><span>Yes</span></span>\r\n                              </label>\r\n                            </ng-template>\r\n                          </ngx-datatable-column>                      <ngx-datatable-footer>\r\n                            <ng-template ngx-datatable-footer-template\r\n                                         let-rowCount=\"rowCount\"\r\n                                         let-pageSize=\"lstProposals.pager.pageSize\"\r\n                                         let-selectedCount=\"selectedCount\"\r\n                                         let-currentPage=\"lstProposals.pager.currentPage\"\r\n                                         let-offset=\"offset\"\r\n                                         let-isVisible=\"isVisible\">\r\n                              <div class=\"page-count\" *ngIf='(rowCount  > 0)'>\r\n\r\n                                <!--Showing {{(lstProposals.pager.currentPage - 1 )* lstProposals.pager.pageSize + 1}}  to {{lstProposals.pager.currentPage * lstProposals.pager.pageSize}} out of {{rowCount}}  enteries-->\r\n                                {{commonService.PageString(lstProposals.pager.currentPage,lstProposals.pager.pageSize,rowCount)}}\r\n                              </div>\r\n                              <datatable-pager [pagerLeftArrowIcon]=\"'fa fa-angle-left'\"\r\n                                               [pagerRightArrowIcon]=\"'fa fa-angle-right'\"\r\n                                               [pagerPreviousIcon]=\"'fa fa-angle-double-left'\"\r\n                                               [pagerNextIcon]=\"'fa fa-angle-double-right'\"\r\n                                               [page]=\"lstProposals.pager.currentPage\"\r\n                                               [size]=\"lstProposals.pager.pageSize\"\r\n                                               [count]=\"lstProposals.pager.totalItems\"\r\n                                               [hidden]=\"!((rowCount / lstProposals.pager.pageSize) > 1)\"\r\n                                               (change)=\"setProposalPageNo($event)\">\r\n                              </datatable-pager>\r\n                            </ng-template>\r\n                          </ngx-datatable-footer>\r\n                        </ngx-datatable>\r\n                      </div>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <!--==============================================================================================================================-->\r\n                <!--fileupload start-->\r\n                <app-files title=\"Files\" moduleName=\"{{moduleName}}\" submoduleName=\"{{submoduleName}}\" primaryKey=\"{{Id}}\"></app-files>\r\n\r\n                <!--end fileupload-->\r\n\r\n              </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<div class=\"modal fade show\" bsModal #requestdesign=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{requesttitle}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closerequestdesign()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\" margin-bottom:10px; height:100%; overflow:visible;\">\r\n        <form [formGroup]=\"addRequestDesignForm\" autocomplete=\"off\">\r\n          <div class=\"row\">\r\n            <div class=\"col-md-12\">\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Scheduled Close Date/Time:<span class=\"text-danger\">*</span></label>\r\n\r\n\r\n                  <div class=\"form-group datepickerinpop \">\r\n\r\n\r\n                    <p-calendar formControlName=\"requestDate\" placeholder=\"Select Date\" class=\"calendarwidth\" [showIcon]=\"true\" [hourFormat]=\"(timeFormat==24)?'24':'12'\"\r\n                                [showTime]=\"true\" inputId=\"timeonly\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"2000:2030\" [style]=\"{ 'position': 'relative' }\"\r\n                                [ngClass]=\"{'is-invalid': (requestDate.invalid && (requestDate.dirty || requestDate.touched) && requestDate.errors?.required) }\"></p-calendar>\r\n                    <small *ngIf=\"requestDate.invalid && (requestDate.dirty || requestDate.touched) && requestDate.errors?.required\"\r\n                           style=\"color:red;\">Please select Scheduled Close Date/Time</small>\r\n                  </div>\r\n                </div>\r\n\r\n                <!--<div class=\"col-12 col-md-6 col-lg-6\">\r\n                  <label>Time:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <p-calendar class=\"calendarwidth\" inputStyleClass=\"form-control start-date\"\r\n                                formControlName=\"fromTime\" placeholder=\"Select From Time\"hideOnDateTimeSelect=\"true\" [readonlyInput]=\"true\"\r\n                                [timeOnly]=\"true\" inputId=\"timeonly\" [showIcon]=\"true\" [ngClass]=\"{'is-invalid': (fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required) }\" icon=\"fa fa-clock-o\" (onSelect)=\"changeToValue($event)\" [minDate]=\"minFromTime\" [maxDate]=\"maxToTime\" ></p-calendar>\r\n                    <small *ngIf=\"fromTime.invalid && (fromTime.dirty || fromTime.touched) && fromTime.errors?.required\"\r\n                           style=\"color:red;\">Please select From Time</small>\r\n\r\n                  </div>\r\n                </div>-->\r\n\r\n                <div class=\"col-12 col-md-12 col-lg-12 d-none\" *ngIf=\"!isredesign\">\r\n                  <label>Adder Notes:</label>\r\n                  <div class=\"form-group\">\r\n                    <textarea rows=\"3\" class=\"form-control\" formControlName=\"adderNotes\" maxlength=\"100000\" style=\"min-height:120px;\"></textarea>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-12 col-md-12 col-lg-12\">\r\n                  <label *ngIf=\"isredesign\">Design Notes:<span class=\"text-danger\">*</span></label>\r\n                  <label *ngIf=\"!isredesign\">Design Notes:</label>\r\n                  <div class=\"form-group\">\r\n                    <textarea rows=\"3\" class=\"form-control\" formControlName=\"designNotes\" maxlength=\"100000\" style=\"min-height:120px;\" [ngClass]=\"{'is-invalid': (designNotes.invalid && (designNotes.dirty || designNotes.touched) && designNotes.errors?.required)}\"></textarea>\r\n                    <small *ngIf=\"designNotes.invalid && (designNotes.dirty || designNotes.touched) && designNotes.errors?.required\"\r\n                           class=\"text-danger\">Please enter Design Notes</small>\r\n\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-4\" *ngIf=\"isredesign\">\r\n                  <label>Proposal Redesign Reason:<span class=\"text-danger\">*</span></label>\r\n                  <div class=\"form-group\">\r\n                    <ng-select [items]=\"requestredesignList\" placeholder=\"Select Proposal Redesign Reason\" bindValue=\"value\" bindLabel=\"text\" formControlName=\"redisgnReason\"\r\n                               [ngClass]=\"{'is-invalid': (redisgnReason.invalid && (redisgnReason.dirty || redisgnReason.touched) && redisgnReason.errors?.required)}\"></ng-select>\r\n                    <small *ngIf=\"redisgnReason.invalid && (redisgnReason.dirty || redisgnReason.touched) && redisgnReason.errors?.required\"\r\n                           class=\"text-danger\">Please select Proposal Redesign Reason</small>\r\n\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveRequestDesign()\"><i class=\"fa fa-save text-white\"></i> Submit</button>\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closerequestdesign()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n\r\n<!--=================================================== Edit  Utility & Proposal Design Information Popup ==================================================================-->\r\n<div class=\"modal fade in show\" bsModal #edit_Utility_Proposal_Design_InformationPopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">{{title}}</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeUtility_Proposal_Design_InformationPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; height:500px;\">\r\n        <form [formGroup]=\"edit_Utility_Proposal_Design_InformationForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n          <div class=\"row mb-2\">\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Utility Company:</label>\r\n              <div class=\"form-group\">\r\n\r\n                <ng-select [items]=\"utilityCompanyList\" placeholder=\"Select Utility Company\"\r\n                           (clear)=\"onClearLangUtilityCompany(utilityCompanyList)\"\r\n                           (keyup)=\"onKeyUtilityCompany($event,utilityCompanyList)\"\r\n                           (scrollToEnd)=\"onScrollToEndUtilityCompany(utilityCompanyList)\" [virtualScroll]=\"true\"\r\n                           formControlName=\"Utility_Company\"\r\n                           bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n\r\n                <!--<input type=\"text\" class=\"form-control\" formControlName=\"Utility_Company\" maxlength=\"50\" />-->\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Utility Account Number:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Utility_Account_Number\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Utility Meter Number:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Utility_Meter_Number\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Estimated annual KWH Usage:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Annual_kwh_Usage\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Last Utility Bill URL:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Last_Utility_bill_URL\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Home Sq. Ft.:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Home_Sqft\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Sales Tax Rate:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Sales_Tax_Rate\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>FTC Not Eligible:</label>\r\n              <div class=\"form-group\">\r\n                <!--<input type=\"text\" class=\"form-control\" formControlName=\"No_Utility_Account_or_Meter_Number\" maxlength=\"50\" />-->\r\n\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" class=\"form-control\" formControlName=\"FTC_Not_Eligible\">\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Billing City:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Billing_City\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Billing Street:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Billing_Street\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Billing State:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"ddlStateList\" placeholder=\"Select Billing State\"\r\n                           formControlName=\"Billing_State\"\r\n                           bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Billing Country:</label>\r\n              <div class=\"form-group\">\r\n                <ng-select [items]=\"ddlCountryList\" placeholder=\"Select Billing Country\"\r\n                           formControlName=\"Billing_Country\"\r\n                           bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Billing Postal Code:</label>\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" formControlName=\"Billing_Postal_Code\" maxlength=\"50\" />\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>Full Utility Bill:</label>\r\n              <div class=\"form-group\">\r\n                <!--<input type=\"text\" class=\"form-control\" formControlName=\"No_Utility_Account_or_Meter_Number\" maxlength=\"50\" />-->\r\n\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" class=\"form-control\" formControlName=\"Full_Utility_Bill\">\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n            <div class=\"col-md-12 col-lg-6\">\r\n              <label>No Utility Account or Meter Number:</label>\r\n              <div class=\"form-group\">\r\n                <!--<input type=\"text\" class=\"form-control\" formControlName=\"No_Utility_Account_or_Meter_Number\" maxlength=\"50\" />-->\r\n\r\n                <label class=\"switch\">\r\n                  <input type=\"checkbox\" class=\"form-control\" formControlName=\"No_Utility_Account_or_Meter_Number\">\r\n                  <span class=\"slider round\"><span>Yes</span></span>\r\n                </label>\r\n              </div>\r\n            </div>\r\n\r\n          </div>\r\n        </form>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n        <button type=\"submit\" class=\"btn btn-success form-btns\" (click)=\"SaveUtility_Proposal_Design_Information()\"><i class=\"fa fa-save text-white\"></i> Save</button>\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeUtility_Proposal_Design_InformationPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n  <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n</div>\r\n<!--==============================================================================================================================-->\r\n<!--=================================================== Contact add ==================================================================-->\r\n<div bsModal #addContact=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Add Contact</h4>\r\n\r\n        <button type=\"button\" class=\"close\" (click)=\"closeContact()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\" style=\"margin-bottom:10px; max-height:600px;\">\r\n        <app-addcontact #addcontact12 [opprAccountId]=\"opprAccountId\" [ownerId]=\"ownerId\" [oppid]=opid [solgenpower]=\"solgenpower\" (contactemit)=\"contactmsg(true)\"></app-addcontact>\r\n      </div>\r\n      <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n    </div>\r\n  </div>\r\n</div>\r\n<!--==============================================================================================================================-->\r\n<!--======================================================sendToLoanHomi Popup ===========================================================================================-->\r\n<app-sendtoloanhomimodelpopup #openSendToLoanHomiPopup (refreshEvent)=\"refreshPage($event)\"></app-sendtoloanhomimodelpopup>\r\n<!--===========================================================================================================================================================================-->\r\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.html":
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.html ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div bsModal #openSendToLoanHomiPopup=\"bs-modal\" [config]=\"{backdrop: 'static'}\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\r\n  <div class=\"modal-dialog modal-xl\" [ngClass]=\"{'disabled':loadSave}\">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">SEND TO LOANHOMI</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closePopup()\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <!--{{addSendTLoanHomiForm.value | json }}-->\r\n      <form [formGroup]=\"addSendTLoanHomiForm\" autocomplete=\"off\" *ngIf=\"showAddSendTLoanHomiForm\">\r\n        <div class=\"modal-body mapping-select p-0\" style=\"margin-bottom:10px; max-height:800px;overflow-y:auto;\">\r\n          <div class=\"panel-content\">\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#SystemInfo\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>System Info:</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n                <div id=\"SystemInfo\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Loan Product:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"loanProduct\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Term:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"term\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Country:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\" style=\"pointer-events:none\">\r\n                            <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"country\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>State:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8 form-control border-0 p-0 bg-white\" style=\"pointer-events:none\">\r\n                            <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"state\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"></ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>City:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"city\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Street:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"street\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Postal Code:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"postalCode\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>System Size KW:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"systemSizeKW\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Total System Cost:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control border-0 p-0 bg-white\" formControlName=\"totalSystemCost\" maxlength=\"50\" style=\"pointer-events:none\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Downpayment Amount:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"downpaymentAmount\" (keypress)=\"numberOnly($event)\" maxlength=\"50\">\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Loan Amount:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\"><input type=\"text\" class=\"form-control\" formControlName=\"loanAmount\" maxlength=\"50\" disabled></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>Own the Property:</label></div>\r\n                          <div class=\"col-md-12 col-lg-8\">\r\n                            <ng-select [items]=\"lstowntheProperty\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"ownthePropertyID\" [(ngModel)]=\"defaultOwnTheProperty\"\r\n                                       bindLabel=\"text\" bindValue=\"value\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-4\"><label>No. of Mortgages:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-8\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"noOfMortgages\" maxlength=\"2\" (keypress)=\"keyPressNo($event)\" \r\n                                   [ngClass]=\"{'is-invalid': (noOfMortgages.invalid && (noOfMortgages.dirty || noOfMortgages.touched) && (noOfMortgages.errors?.required || noOfMortgages.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"noOfMortgages.invalid && (noOfMortgages.dirty || noOfMortgages.touched) && noOfMortgages.errors?.required\"\r\n                                   class=\"text-danger\">No.of Mortgages is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--================================================== Applicant Detail:   =====================================================================-->\r\n            <div id=\"accordion\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#ApplicantDetail\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Applicant Detail:</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n                <div id=\"ApplicantDetail\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>First Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"firstName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (firstName.invalid && (firstName.dirty || firstName.touched) && (firstName.errors?.required || firstName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"firstName.invalid && (firstName.dirty || firstName.touched) && firstName.errors?.required\"\r\n                                   class=\"text-danger\">First Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Last Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"lastName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (lastName.invalid && (lastName.dirty || lastName.touched) && (lastName.errors?.required || lastName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"lastName.invalid && (lastName.dirty || lastName.touched) && lastName.errors?.required\"\r\n                                   class=\"text-danger\">Last Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Phone:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <!--<input type=\"text\" class=\"form-control\" formControlName=\"phone\" maxlength=\"50\" (keypress)=\"keyPressNo($event)\"\r\n          [ngClass]=\"{'is-invalid': (phone.invalid && (phone.dirty || phone.touched) && (phone.errors?.required || phone.errors?.maxlength)) }\">-->\r\n                            <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"phone\" placeholder=\"(___) ___-____\"\r\n                                         [ngClass]=\"{'is-invalid': (phone.invalid && phone.errors?.maxlength) }\"></p-inputMask>\r\n                            <small *ngIf=\"phone.errors?.maxlength\"\r\n                                   class=\"text-danger\">Invalid Phone No.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Mobile:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"mobile\" placeholder=\"(___) ___-____\"\r\n                                         [ngClass]=\"{'is-invalid': (mobile.invalid && mobile.errors?.maxlength) }\"></p-inputMask>\r\n                            <small *ngIf=\"mobile.errors?.maxlength\"\r\n                                   class=\"text-danger\">Invalid Mobile No.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Email:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"email\" maxlength=\"100\" (focusout)=\"onFocusOutEvent($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (email.invalid && (email.dirty || email.touched) && (email.errors?.required || email.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"email.invalid && (email.dirty || email.touched) && email.errors?.required\"\r\n                                   class=\"text-danger\">Email is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>SSN:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"ssn\" maxlength=\"9\"\r\n                                   [ngClass]=\"{'is-invalid': (ssn.invalid && (ssn.dirty || ssn.touched) && (ssn.errors?.required || ssn.errors?.maxlength)) }\">\r\n\r\n                            <small *ngIf=\"ssn.invalid && (ssn.dirty || ssn.touched) && ssn.errors?.required\"\r\n                                   class=\"text-danger\">SSN is required</small>\r\n                            <small *ngIf=\"ssn.errors?.maxlength\"\r\n                                   class=\"text-danger\">SSN no must be less than 11 characters.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>DOB:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <div class=\"form-group datepickerinpop\">\r\n\r\n                              <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"dateofBirth\" [maxDate]=\"minDate\"\r\n                                          dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\" \r\n                                          [ngClass]=\"{'is-invalid': (dateofBirth?.invalid && (dateofBirth.dirty || dateofBirth.touched) && dateofBirth.errors?.required) }\"></p-calendar>\r\n\r\n                              <small *ngIf=\"dateofBirth?.invalid && (dateofBirth.dirty || dateofBirth.touched) && dateofBirth.errors?.required\"\r\n                                     style=\"color:red;\">DOB is required</small>\r\n\r\n                              <small *ngIf=\"dateofBirth.errors?.lessthan18\"\r\n                                     style=\"color:red;\">Age should be greater than 18</small>\r\n\r\n                            </div>\r\n                         \r\n\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtCurrentResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (yearsAtCurrentResidence.invalid && (yearsAtCurrentResidence.dirty || yearsAtCurrentResidence.touched) &&\r\n                                   (yearsAtCurrentResidence.errors?.required || yearsAtCurrentResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"yearsAtCurrentResidence.invalid && (yearsAtCurrentResidence.dirty || yearsAtCurrentResidence.touched) && yearsAtCurrentResidence.errors?.required\"\r\n                                   class=\"text-danger\">Years at Current Residence is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"monthsatCurrentResidence\"\r\n                                   [ngClass]=\"{'is-invalid': (monthsatCurrentResidence.invalid && (monthsatCurrentResidence.dirty || monthsatCurrentResidence.touched) && (monthsatCurrentResidence.errors?.required || monthsatCurrentResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"monthsatCurrentResidence.invalid && (monthsatCurrentResidence.dirty || monthsatCurrentResidence.touched) && monthsatCurrentResidence.errors?.required\"\r\n                                   class=\"text-danger\">Months at Current Residence is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtPreviousResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (yearsAtPreviousResidence.invalid && (yearsAtPreviousResidence.dirty || yearsAtPreviousResidence.touched) && (yearsAtPreviousResidence.errors?.required || yearsAtPreviousResidence.errors?.maxlength)) }\">\r\n\r\n                            <small *ngIf=\"yearsAtPreviousResidence.invalid && (yearsAtPreviousResidence.dirty || yearsAtPreviousResidence.touched) && yearsAtPreviousResidence.errors?.required\"\r\n                                   class=\"text-danger\">Years at Previous Residence is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"monthsatPreviousResidence\"\r\n                                   [ngClass]=\"{'is-invalid': (monthsatPreviousResidence.invalid && (monthsatPreviousResidence.dirty || monthsatPreviousResidence.touched) && (monthsatPreviousResidence.errors?.required || monthsatPreviousResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"monthsatPreviousResidence.invalid && (monthsatPreviousResidence.dirty || monthsatPreviousResidence.touched) && monthsatPreviousResidence.errors?.required\"\r\n                                   class=\"text-danger\">Months at Previous Residence is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Country:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"PRcountry\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (PRcountry.invalid && (PRcountry.dirty || PRcountry.touched) && (PRcountry.errors?.required || PRcountry.errors?.maxlength)) }\">\r\n\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"PRcountry.invalid && (PRcountry.dirty || PRcountry.touched) && PRcountry.errors?.required\"\r\n                                   class=\"text-danger\">Country is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous State:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"PRstate\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (PRstate.invalid && (PRstate.dirty || PRstate.touched) && (PRstate.errors?.required || PRstate.errors?.maxlength)) }\">\r\n\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"PRstate.invalid && (PRstate.dirty || PRstate.touched) && PRstate.errors?.required\"\r\n                                   class=\"text-danger\">State is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous City:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"PRCity\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (PRCity.invalid && (PRCity.dirty || PRCity.touched) && (PRCity.errors?.required || PRCity.errors?.maxlength)) }\" >\r\n\r\n                            <small *ngIf=\"PRCity.invalid && (PRCity.dirty || PRCity.touched) && PRCity.errors?.required\"\r\n                                   class=\"text-danger\">City is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Street:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"PRStreet\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (PRStreet.invalid && (PRStreet.dirty || PRStreet.touched) && (PRStreet.errors?.required || PRStreet.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"PRStreet.invalid && (PRStreet.dirty || PRStreet.touched) && PRStreet.errors?.required\"\r\n                                   class=\"text-danger\">Street is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Postal Code:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"PRPostalCode\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (PRPostalCode.invalid && (PRPostalCode.dirty || PRPostalCode.touched) && (PRPostalCode.errors?.required || PRPostalCode.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"PRPostalCode.invalid && (PRPostalCode.dirty || PRPostalCode.touched) && PRPostalCode.errors?.required\"\r\n                                   class=\"text-danger\">Postal Code is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Housing Status:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnPR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstprevHousingStatus\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"PHousingStatus\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (PHousingStatus.invalid && (PHousingStatus.dirty || PHousingStatus.touched) && (PHousingStatus.errors?.required || PHousingStatus.errors?.maxlength)) }\">\r\n                            </ng-select>\r\n                            <small *ngIf=\"PHousingStatus.invalid && (PHousingStatus.dirty || PHousingStatus.touched) && PHousingStatus.errors?.required\"\r\n                                   class=\"text-danger\">Housing Status is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Employment Type:</label><span class=\"text-danger\">*</span></div>\r\n                          <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"employementType\" maxlength=\"50\" style=\"pointer-events:none\"></div>-->\r\n\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstemployementType\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"employementTypeID\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (employementTypeID.invalid && (employementTypeID.dirty || employementTypeID.touched) && (employementTypeID.errors?.required || employementTypeID.errors?.maxlength)) }\">\r\n                            </ng-select>\r\n                            <small *ngIf=\"employementTypeID.invalid && (employementTypeID.dirty || employementTypeID.touched) && employementTypeID.errors?.required\"\r\n                                   class=\"text-danger\">Employment Type is required</small>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"employerName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (employerName.invalid && (employerName.dirty || employerName.touched) && (employerName.errors?.required || employerName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"employerName.invalid && (employerName.dirty || employerName.touched) && employerName.errors?.required\"\r\n                                   class=\"text-danger\">Employer Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"occupation\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (occupation.invalid && (occupation.dirty || occupation.touched) && (occupation.errors?.required || occupation.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"occupation.invalid && (occupation.dirty || occupation.touched) && occupation.errors?.required\"\r\n                                   class=\"text-danger\">Occupation is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (yearsAtCurrentEmployement.invalid && (yearsAtCurrentEmployement.dirty || yearsAtCurrentEmployement.touched) && (yearsAtCurrentEmployement.errors?.required || yearsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"yearsAtCurrentEmployement.invalid && (yearsAtCurrentEmployement.dirty || yearsAtCurrentEmployement.touched) && yearsAtCurrentEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Years at Current Employment is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"monthsAtCurrentEmployement\" maxlength=\"50\" (keypress)=\"keyPressNo($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (monthsAtCurrentEmployement.invalid && (monthsAtCurrentEmployement.dirty || monthsAtCurrentEmployement.touched) && (monthsAtCurrentEmployement.errors?.required || monthsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"monthsAtCurrentEmployement.invalid && (monthsAtCurrentEmployement.dirty || monthsAtCurrentEmployement.touched) && monthsAtCurrentEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Months at Current Employment is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <!--*ngIf=\"ShowPreviousEmployerDetails\"-->\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"previousEmployerName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (previousEmployerName.invalid && (previousEmployerName.dirty || previousEmployerName.touched) && (previousEmployerName.errors?.required || previousEmployerName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"previousEmployerName.invalid && (previousEmployerName.dirty || previousEmployerName.touched) && previousEmployerName.errors?.required\"\r\n                                   class=\"text-danger\">Previous Employer Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"previousOccupation\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (previousOccupation.invalid && (previousOccupation.dirty || previousOccupation.touched) && (previousOccupation.errors?.required || previousOccupation.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"previousOccupation.invalid && (previousOccupation.dirty || previousOccupation.touched) && previousOccupation.errors?.required\"\r\n                                   class=\"text-danger\">Previous Occupation Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"yearsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (yearsAtPreviousEmployement.invalid && (yearsAtPreviousEmployement.dirty || yearsAtPreviousEmployement.touched) && (yearsAtPreviousEmployement.errors?.required || yearsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"yearsAtPreviousEmployement.invalid && (yearsAtPreviousEmployement.dirty || yearsAtPreviousEmployement.touched) && yearsAtPreviousEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Years at Previous Employment is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"monthsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (monthsAtPreviousEmployement.invalid && (monthsAtPreviousEmployement.dirty || monthsAtPreviousEmployement.touched) && (monthsAtPreviousEmployement.errors?.required || monthsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"monthsAtPreviousEmployement.invalid && (monthsAtPreviousEmployement.dirty || monthsAtPreviousEmployement.touched) && monthsAtPreviousEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Months at Previous Employment is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Income Frequency:<span class=\"text-danger\">*</span></label></div>\r\n                          <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"incomeFrequency\" maxlength=\"50\"></div>-->\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"lstIncomeFrequencyID\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (lstIncomeFrequencyID.invalid && (lstIncomeFrequencyID.dirty || lstIncomeFrequencyID.touched) && (lstIncomeFrequencyID.errors?.required || lstIncomeFrequencyID.errors?.maxlength)) }\">\r\n                            </ng-select>\r\n                            <small *ngIf=\"lstIncomeFrequencyID.invalid && (lstIncomeFrequencyID.dirty || lstIncomeFrequencyID.touched) && lstIncomeFrequencyID.errors?.required\"\r\n                                   class=\"text-danger\">Income Frequency is required</small>\r\n                          </div>\r\n\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <!--*ngIf=\"ShowIncomeFrequency\"-->\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Income:<span class=\"text-danger\" *ngIf=\"showValidationIconOn_income\">*</span></label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"number\" class=\"form-control\" formControlName=\"income\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (income.invalid && (income.dirty || income.touched) && (income.errors?.required || income.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"income.invalid && (income.dirty || income.touched) && income.errors?.required\"\r\n                                   class=\"text-danger\">Income is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Other Income Frequency:</label></div>\r\n\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"otherIncomeFrequencyID\"\r\n                                       bindLabel=\"text\" bindValue=\"value\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <!--*ngIf=\"ShowotherIncomeFrequency\"-->\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Other Income:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"number\" class=\"form-control\" formControlName=\"otherIncome\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>\tOther Income Source:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"otherIncomeSource\" maxlength=\"50\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Gross Income:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"grossIncome\" maxlength=\"50\" disabled></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!--================================================== Co-Applicant Detail: ==============================================================-->\r\n\r\n            <div id=\"accordion\" *ngIf=\"IsCoApplicantRequired.value\" [ngClass]=\"{'disabled':loadSave}\">\r\n              <div class=\"panel active\">\r\n                <div class=\"panel-heading\">\r\n                  <h4 class=\"panel-title\">\r\n                    <a href=\"#Co-ApplicantDetail\" class=\"accordion-toggle\" data-toggle=\"collapse\" data-parent=\"#accordion\" aria-expanded=\"true\">\r\n                      <span>Co-Applicant Detail:</span>\r\n                    </a>\r\n                  </h4>\r\n                </div>\r\n\r\n                <div id=\"Co-ApplicantDetail\" class=\"panel-collapse collapse active show\" style=\"\">\r\n                  <div class=\"panel-body\">\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>First Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_firstName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_firstName.invalid && (coApp_firstName.dirty || coApp_firstName.touched) && (coApp_firstName.errors?.required || coApp_firstName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_firstName.invalid && (coApp_firstName.dirty || coApp_firstName.touched) && coApp_firstName.errors?.required\"\r\n                                   class=\"text-danger\">First Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Last Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_lastName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_lastName.invalid && (coApp_lastName.dirty || coApp_lastName.touched) && (coApp_lastName.errors?.required || coApp_lastName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_lastName.invalid && (coApp_lastName.dirty || coApp_lastName.touched) && coApp_lastName.errors?.required\"\r\n                                   class=\"text-danger\">Last Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Phone:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"coApp_phone\" placeholder=\"(___) ___-____\"></p-inputMask>\r\n                            <!--[ngClass]=\"{'is-invalid': (coApp_phone.invalid && coApp_phone.errors?.maxlength) }\"-->\r\n                            <!--<small *ngIf=\"coApp_phone.errors?.maxlength\"\r\n                 class=\"text-danger\">Invalid Phone No.</small>-->\r\n\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Mobile:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <p-inputMask styleClass=\"form-control\" mask=\"(999) 999-9999\" formControlName=\"coApp_mobile\" placeholder=\"(___) ___-____\"></p-inputMask>\r\n                            <!--[ngClass]=\"{'is-invalid': (coApp_mobile.invalid && coApp_mobile.errors?.maxlength) }\"-->\r\n                            <!--<small *ngIf=\"coApp_mobile.errors?.maxlength\"\r\n                 class=\"text-danger\">Invalid Mobile No.</small>-->\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Email:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_email\" maxlength=\"100\" (focusout)=\"onFocusOutEvent($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_email.invalid && (coApp_email.dirty || coApp_email.touched) && (coApp_email.errors?.required || coApp_email.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_email.invalid && (coApp_email.dirty || coApp_email.touched) && coApp_email.errors?.required\"\r\n                                   class=\"text-danger\">Email is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>SSN:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_ssn\" maxlength=\"9\"\r\n                            [ngClass]=\"{'is-invalid': (coApp_ssn.invalid && (coApp_ssn.dirty || coApp_ssn.touched) && (coApp_ssn.errors?.required || coApp_ssn.errors?.maxlength)) }\" />\r\n                            <small *ngIf=\"coApp_ssn.invalid && (coApp_ssn.dirty || coApp_ssn.touched) && coApp_ssn.errors?.required\"\r\n                               class=\"text-danger\">SSN is required</small>\r\n                                 <small *ngIf=\"coApp_ssn.errors?.maxlength\"\r\n                                      class=\"text-danger\">SSN no must be less than 16 characters.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>DOB:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <div class=\"form-group datepickerinpop\">\r\n\r\n                              <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" hideOnDateTimeSelect=\"true\" inputStyleClass=\"form-control start-date \" formControlName=\"coApp_dateofBirth\" [maxDate]=\"minDate\"\r\n                                          dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                                          [ngClass]=\"{'is-invalid': (coApp_dateofBirth?.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required) }\"></p-calendar>\r\n\r\n                              <small *ngIf=\"coApp_dateofBirth?.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required\"\r\n                                     style=\"color:red;\">DOB is required</small>\r\n\r\n                              <small *ngIf=\"coApp_dateofBirth.errors?.lessthan18\"\r\n                                     style=\"color:red;\">Age should be greater than 18</small>\r\n                            </div>\r\n                            \r\n                              </div>\r\n\r\n                              <!--<div class=\"form-group datepickerinpop\">\r\n      <p-calendar [showIcon]=\"true\" class=\"calendarwidth\" inputStyleClass=\"form-control start-date\" formControlName=\"coApp_dateofBirth\"\r\n                  [showTime]=\"false\" dateFormat=\"mm/dd/yy\" showButtonBar=\"true\" [monthNavigator]=\"true\" [yearNavigator]=\"true\" yearRange=\"1919:2030\"\r\n                  [ngClass]=\"{'is-invalid': (coApp_dateofBirth.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && (coApp_dateofBirth.errors?.required || coApp_dateofBirth.errors?.maxlength)) }\">\r\n        <small *ngIf=\"coApp_dateofBirth.invalid && (coApp_dateofBirth.dirty || coApp_dateofBirth.touched) && coApp_dateofBirth.errors?.required\"\r\n               class=\"text-danger\">DOB is required</small>\r\n      </p-calendar>\r\n    </div>-->\r\n                            </div>\r\n                          </div>\r\n                      </div>\r\n               \r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"custom-control custom-checkbox mb-2\" style=\"font-size: 16px;\">\r\n                          <input type=\"checkbox\" class=\"custom-control-input\" formControlName=\"sameAsapplicant\" id=\"sameAsapplicantID\">\r\n                          <label class=\"custom-control-label\" for=\"sameAsapplicantID\">Address same as applicant.</label>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Country:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select country\" formControlName=\"coApp_country\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (coApp_country.invalid && (coApp_country.dirty || coApp_country.touched) && (coApp_country.errors?.required || coApp_country.errors?.maxlength)) }\">\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"coApp_country.invalid && (coApp_country.dirty || coApp_country.touched) && coApp_country.errors?.required\"\r\n                                   class=\"text-danger\">Country is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>State:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"coAppstate\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (coAppstate.invalid && (coAppstate.dirty || coAppstate.touched) && (coAppstate.errors?.required || coAppstate.errors?.maxlength)) }\">\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"coAppstate.invalid && (coAppstate.dirty || coAppstate.touched) && coAppstate.errors?.required\"\r\n                                   class=\"text-danger\">State is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>City:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_city\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_city.invalid && (coApp_city.dirty || coApp_city.touched) && (coApp_city.errors?.required || coApp_city.errors?.maxlength)) }\">\r\n\r\n                            <small *ngIf=\"coApp_city.invalid && (coApp_city.dirty || coApp_city.touched) && coApp_city.errors?.required\"\r\n                                   class=\"text-danger\">City is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Street:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_street\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_street.invalid && (coApp_street.dirty || coApp_street.touched) && (coApp_street.errors?.required || coApp_street.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_street.invalid && (coApp_street.dirty || coApp_street.touched) && coApp_street.errors?.required\"\r\n                                   class=\"text-danger\">Street is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Postal Code:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_postalCode\" maxlength=\"50\"\r\n                            [ngClass]=\"{'is-invalid': (coApp_postalCode.invalid && (coApp_postalCode.dirty || coApp_postalCode.touched) && (coApp_postalCode.errors?.required || coApp_postalCode.errors?.maxlength)) }\" />\r\n                            <small *ngIf=\"coApp_postalCode.invalid && (coApp_postalCode.dirty || coApp_postalCode.touched) && coApp_postalCode.errors?.required\"\r\n                                   class=\"text-danger\">Postal Code is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtCurrentResidence\" maxlength=\"3\" (keypress)=\"keyPressNo($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_yearsAtCurrentResidence.invalid && (coApp_yearsAtCurrentResidence.dirty || coApp_yearsAtCurrentResidence.touched) && (coApp_yearsAtCurrentResidence.errors?.required || coApp_yearsAtCurrentResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_yearsAtCurrentResidence.invalid && (coApp_yearsAtCurrentResidence.dirty || coApp_yearsAtCurrentResidence.touched) && coApp_yearsAtCurrentResidence.errors?.required\"\r\n                                   class=\"text-danger\">Years at Current Residence is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Current Residence:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtCurrentResidence\" maxlength=\"2\" (keypress)=\"keyPressNo($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_monthsAtCurrentResidence.invalid && (coApp_monthsAtCurrentResidence.dirty || coApp_monthsAtCurrentResidence.touched) && (coApp_monthsAtCurrentResidence.errors?.required || coApp_monthsAtCurrentResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_monthsAtCurrentResidence.invalid && (coApp_monthsAtCurrentResidence.dirty || coApp_monthsAtCurrentResidence.touched) && coApp_monthsAtCurrentResidence.errors?.required\"\r\n                                   class=\"text-danger\">Months at Current Residence is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtPreviousResidence\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_yearsAtPreviousResidence.invalid && (coApp_yearsAtPreviousResidence.dirty || coApp_yearsAtPreviousResidence.touched) && (coApp_yearsAtPreviousResidence.errors?.required || coApp_yearsAtPreviousResidence.errors?.maxlength)) }\">\r\n\r\n                            <small *ngIf=\"coApp_yearsAtPreviousResidence.invalid && (coApp_yearsAtPreviousResidence.dirty || coApp_yearsAtPreviousResidence.touched) && coApp_yearsAtPreviousResidence.errors?.required\"\r\n                                   class=\"text-danger\">Years at Previous Residence is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Residence:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" (keypress)=\"keyPressNo($event)\" formControlName=\"coApp_monthsatPreviousResidence\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_monthsatPreviousResidence.invalid && (coApp_monthsatPreviousResidence.dirty || coApp_monthsatPreviousResidence.touched) && (coApp_monthsatPreviousResidence.errors?.required || coApp_monthsatPreviousResidence.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_monthsatPreviousResidence.invalid && (coApp_monthsatPreviousResidence.dirty || coApp_monthsatPreviousResidence.touched) && coApp_monthsatPreviousResidence.errors?.required\"\r\n                                   class=\"text-danger\">Months at Previous Residence is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Country:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"countryLists\" [loading]=\"loadSave\" placeholder=\"Select Country\" formControlName=\"coApp_PRcountry\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (coApp_PRcountry.invalid && (coApp_PRcountry.dirty || coApp_PRcountry.touched) && (coApp_PRcountry.errors?.required || coApp_PRcountry.errors?.maxlength)) }\">\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"coApp_PRcountry.invalid && (coApp_PRcountry.dirty || coApp_PRcountry.touched) && coApp_PRcountry.errors?.required\"\r\n                                   class=\"text-danger\">Country is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous State:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"states\" [loading]=\"loadSave\" placeholder=\"Select State\" formControlName=\"coApp_PRstate\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (coApp_PRstate.invalid && (coApp_PRstate.dirty || coApp_PRstate.touched) && (coApp_PRstate.errors?.required || coApp_PRstate.errors?.maxlength)) }\">\r\n\r\n\r\n                            </ng-select>\r\n                            <small *ngIf=\"coApp_PRstate.invalid && (coApp_PRstate.dirty || coApp_PRstate.touched) && coApp_PRstate.errors?.required\"\r\n                                   class=\"text-danger\">State is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous City:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRCity\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_PRCity.invalid && (coApp_PRCity.dirty || coApp_PRCity.touched) && (coApp_PRCity.errors?.required || coApp_PRCity.errors?.maxlength)) }\">\r\n\r\n                            <small *ngIf=\"coApp_PRCity.invalid && (coApp_PRCity.dirty || coApp_PRCity.touched) && coApp_PRCity.errors?.required\"\r\n                                   class=\"text-danger\">City is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Street:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRStreet\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_PRStreet.invalid && (coApp_PRStreet.dirty || coApp_PRStreet.touched) && (coApp_PRStreet.errors?.required || coApp_PRStreet.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_PRStreet.invalid && (coApp_PRStreet.dirty || coApp_PRStreet.touched) && coApp_PRStreet.errors?.required\"\r\n                                   class=\"text-danger\">Street is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Postal Code:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_PRPostalCode\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_PRPostalCode.invalid && (coApp_PRPostalCode.dirty || coApp_PRPostalCode.touched) && (coApp_PRPostalCode.errors?.required || coApp_PRPostalCode.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_PRPostalCode.invalid && (coApp_PRPostalCode.dirty || coApp_PRPostalCode.touched) && coApp_PRPostalCode.errors?.required\"\r\n                                   class=\"text-danger\">Postal Code is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Housing Status:</label><span class=\"text-danger\" *ngIf=\"showValidationIconOnCo_PR\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstprevHousingStatus\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"CoPHousingStatus\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (CoPHousingStatus.invalid && (CoPHousingStatus.dirty || CoPHousingStatus.touched) && (CoPHousingStatus.errors?.required || CoPHousingStatus.errors?.maxlength)) }\">\r\n                            </ng-select>\r\n                            <small *ngIf=\"CoPHousingStatus.invalid && (CoPHousingStatus.dirty || CoPHousingStatus.touched) && CoPHousingStatus.errors?.required\"\r\n                                   class=\"text-danger\">Housing Status is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n\r\n                    </div>\r\n\r\n\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Employment Type:</label><span class=\"text-danger\">*</span></div>\r\n                          <!--<div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"employementType\" maxlength=\"50\"></div>-->\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstemployementType\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_employementTypeID\"\r\n                                       bindLabel=\"text\" bindValue=\"value\"\r\n                                       [ngClass]=\"{'is-invalid': (coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && (coApp_employementTypeID.errors?.required || coApp_employementTypeID.errors?.maxlength)) }\">\r\n                            </ng-select>\r\n                            <small *ngIf=\"coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && coApp_employementTypeID.errors?.required\"\r\n                                   class=\"text-danger\">Employment Type is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_employerName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_employerName.invalid && (coApp_employerName.dirty || coApp_employerName.touched) && (coApp_employerName.errors?.required || coApp_employerName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_employementTypeID.invalid && (coApp_employementTypeID.dirty || coApp_employementTypeID.touched) && coApp_employementTypeID.errors?.required\"\r\n                                   class=\"text-danger\">Employer Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_occupation\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_occupation.invalid && (coApp_occupation.dirty || coApp_occupation.touched) && (coApp_occupation.errors?.required || coApp_occupation.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_occupation.invalid && (coApp_occupation.dirty || coApp_occupation.touched) && coApp_occupation.errors?.required\"\r\n                                   class=\"text-danger\">Occupation is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_yearsAtCurrentEmployement.invalid && (coApp_yearsAtCurrentEmployement.dirty || coApp_yearsAtCurrentEmployement.touched) && (coApp_yearsAtCurrentEmployement.errors?.required || coApp_yearsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_yearsAtCurrentEmployement.invalid && (coApp_yearsAtCurrentEmployement.dirty || coApp_yearsAtCurrentEmployement.touched) && coApp_yearsAtCurrentEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Years at Current Employment is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Current Employment:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtCurrentEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_monthsAtCurrentEmployement.invalid && (coApp_monthsAtCurrentEmployement.dirty || coApp_monthsAtCurrentEmployement.touched) && (coApp_monthsAtCurrentEmployement.errors?.required || coApp_monthsAtCurrentEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_monthsAtCurrentEmployement.invalid && (coApp_monthsAtCurrentEmployement.dirty || coApp_monthsAtCurrentEmployement.touched) && coApp_monthsAtCurrentEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Months at Current Employment is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Employer Name:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_previousEmployerName\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_previousEmployerName.invalid && (coApp_previousEmployerName.dirty || coApp_previousEmployerName.touched) && (coApp_previousEmployerName.errors?.required || coApp_previousEmployerName.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_previousEmployerName.invalid && (coApp_previousEmployerName.dirty || coApp_previousEmployerName.touched) && coApp_previousEmployerName.errors?.required\"\r\n                                   class=\"text-danger\">Previous Employer Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Previous Occupation:</label><span class=\"text-danger\">*</span></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_previousOccupation\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_previousOccupation.invalid && (coApp_previousOccupation.dirty || coApp_previousOccupation.touched) && (coApp_previousOccupation.errors?.required || coApp_previousOccupation.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_previousOccupation.invalid && (coApp_previousOccupation.dirty || coApp_previousOccupation.touched) && coApp_previousOccupation.errors?.required\"\r\n                                   class=\"text-danger\">Previous Occupation Name is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Years at Previous Employment:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" formControlName=\"coApp_yearsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"3\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_yearsAtPreviousEmployement.invalid && (coApp_yearsAtPreviousEmployement.dirty || coApp_yearsAtPreviousEmployement.touched) && (coApp_yearsAtPreviousEmployement.errors?.required || coApp_yearsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_yearsAtPreviousEmployement.invalid && (coApp_yearsAtPreviousEmployement.dirty || coApp_yearsAtPreviousEmployement.touched) && coApp_yearsAtPreviousEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Years at Previous Employment is required</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Months at Previous Employment:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Enter value between 1 to 11\" formControlName=\"coApp_monthsAtPreviousEmployement\" (keypress)=\"keyPressNo($event)\" maxlength=\"50\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_monthsAtPreviousEmployement.invalid && (coApp_monthsAtPreviousEmployement.dirty || coApp_monthsAtPreviousEmployement.touched) && (coApp_monthsAtPreviousEmployement.errors?.required || coApp_monthsAtPreviousEmployement.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_monthsAtPreviousEmployement.invalid && (coApp_monthsAtPreviousEmployement.dirty || coApp_monthsAtPreviousEmployement.touched) && coApp_monthsAtPreviousEmployement.errors?.required\"\r\n                                   class=\"text-danger\">Months at Previous Employment is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Income Frequency:<span class=\"text-danger\">*</span></label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_incomeFrequency\"\r\n                                       bindLabel=\"text\" bindValue=\"value\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <!--*ngIf=\"show_CoApp_IncomeFrequency\"-->\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Income:<span class=\"text-danger\" *ngIf=\"showValidationIconOn_coApp_income\">*</span></label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <input type=\"number\" class=\"form-control\" formControlName=\"coApp_income\" maxlength=\"50\" (keypress)=\"numberOnly($event)\"\r\n                                   [ngClass]=\"{'is-invalid': (coApp_income.invalid && (coApp_income.dirty || coApp_income.touched) && (coApp_income.errors?.required || coApp_income.errors?.maxlength)) }\">\r\n                            <small *ngIf=\"coApp_income.invalid && (coApp_income.dirty || coApp_income.touched) && coApp_income.errors?.required\"\r\n                                   class=\"text-danger\">Income is required.</small>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Other Income Frequency:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\">\r\n                            <ng-select [items]=\"lstIncomeFrequency\" [loading]=\"loadSave\" placeholder=\"Select\" formControlName=\"coApp_otherIncomeFrequency\"\r\n                                       bindLabel=\"text\" bindValue=\"value\">\r\n                            </ng-select>\r\n                          </div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <!--*ngIf=\"show_CoApp_otherIncomeFrequency\"-->\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Other Income:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"number\" class=\"form-control\" formControlName=\"coApp_otherIncome\" (keypress)=\"numberOnly($event)\" maxlength=\"50\"></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>\tOther Income Source:</label></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"coApp_otherIncomeSource\" maxlength=\"50\"></div>\r\n                        </div>\r\n                      </div>\r\n                      <div class=\"col-md-12 col-lg-6\">\r\n                        <div class=\"row mb-2\">\r\n                          <div class=\"col-md-12 col-lg-12\"><label>Gross Income:<span class=\"text-danger\">*</span></label></div>\r\n                          <div class=\"col-md-12 col-lg-12\"><input type=\"text\" class=\"form-control\" formControlName=\"coApp_grossIncome\" maxlength=\"50\" disabled></div>\r\n                        </div>\r\n                      </div>\r\n                    </div>\r\n\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <!--======================================================================================================================================-->\r\n            <!--================================================== Check Box ===========================================================-->\r\n            <div class=\"custom-control custom-checkbox\">\r\n              <input type=\"checkbox\" class=\"custom-control-input\" formControlName=\"IsCoApplicantRequired\" id=\"forco-applicant\">\r\n              <label class=\"custom-control-label\" for=\"forco-applicant\">Is Co-Applicant required.</label>\r\n            </div>\r\n\r\n            <div class=\"custom-control custom-checkbox\">\r\n              <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkBoxId1\" formControlName=\"isAutoPaymentcheckBox\">\r\n              <label class=\"custom-control-label\" for=\"checkBoxId1\">By checking this box, you are agreeing to the auto payment process.</label>\r\n            </div>\r\n\r\n            <div class=\"custom-control custom-checkbox\">\r\n              <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkId2\" formControlName=\"isTermCheckBox\" (change)=\"termCheck(isChecked?'A':'B')\" [(ngModel)]=\"isChecked\"\r\n                     [ngClass]=\"{'is-invalid': (isTermCheckBox.invalid && (isTermCheckBox.dirty || isTermCheckBox.touched) && (isTermCheckBox.errors?.required || isTermCheckBox.errors?.maxlength)) }\">\r\n               <label class=\"custom-control-label\" for=\"checkId2\"> <span class=\"text-danger\">*</span>By checking this box, you are agreeing to accept terms and conditions.</label>\r\n              \r\n            </div>\r\n\r\n            <div class=\"custom-control custom-checkbox\">\r\n              <input type=\"checkbox\" class=\"custom-control-input\" id=\"checkId3\" formControlName=\"isBorrowers\" (change)=\"borrowersCheck(isBorrowersCheck?'A':'B')\" [(ngModel)]=\"isBorrowersCheck\"\r\n                     [ngClass]=\"{'is-invalid': (isBorrowers.invalid && (isBorrowers.dirty || isBorrowers.touched) && (isBorrowers.errors?.required || isBorrowers.errors?.maxlength)) }\">\r\n               <label class=\"custom-control-label\" for=\"checkId3\"><span class=\"text-danger\">*</span>By checking this box, all borrowers individually authorize Loanhomi to generate a Soft Credit Report and each borrower\r\n                individually provides consent and agrees to each of the following statements above. This will not affect your credit score\r\n                in any way until you accept the pre-qualified loan offer and we fund your loan. If two borrowers have provided information above,\r\n                both understand and give express intent to apply jointly.\r\n              </label>\r\n            </div>\r\n            <!--===========================================================================================================================-->\r\n          </div>\r\n          <div class=\"modal-footer\">\r\n            <a href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n            <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n          </div>\r\n          <app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n        </div>\r\n      </form>\r\n\r\n      <!--//=================showPreview Page===============-->\r\n      <!--{{sendToLoanHomiPreviewDetail | json}}-->\r\n      <div *ngIf=\"showPreviewSendTLoanHomiForm\" class=\"modal-body p-0\" style=\"margin-bottom:10px; max-height:800px;overflow-y:auto;\">\r\n        <div class=\"panel\" style=\"border:0px !important\">\r\n          <div class=\"panel-content\">\r\n            <h3 class=\"form-heading mt-0\">\r\n              <span>System Info:</span>\r\n            </h3>\r\n\r\n            <div class=\"row\">\r\n\r\n              <div class=\"col-sm-12 col-md-6 \">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\">\r\n                    <span class=\"py-2 d-block\"><strong>Loan Product:</strong></span>\r\n                  </div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\"> {{sendToLoanHomiPreviewDetail.loanProduct}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Term:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Term}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.country}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingState}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingCity}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingStreet}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.BillingPostalCode}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>System Size KW:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.System_Size_kW}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Total System Cost:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Total_System_Cost}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Downpayment Amount:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Downpayment_Amount}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Loan Amount:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Loan_Amount}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>No. of Mortgages:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.NoofMortgages}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Own the Property:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Owntheproperty}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <h3 class=\"form-heading mt-3\">\r\n              <span>Applicant Detail:</span>\r\n            </h3>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>First Name:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.FirstName}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Last Name:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.LastName}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Phone:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Phone}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Mobile:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MobilePhone}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Email:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Email}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>SSN:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.SSN}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>DOB:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.DOB}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Residence:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.YearsACA}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Residence:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MonthsACA}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Residence:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PYearACR}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Residence:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PMonthACR}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRcountry}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRstate}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRCity}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRStreet}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PRPostalCode}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Housing Status:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PHousingStatus}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employment Type:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.EmployerType}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employer Name:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Employer}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Occupation:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\">\r\n                    <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Occupation}}</span>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Employment:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.YearsACE}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Employment:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.MonthsACE}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--===============================================Previous employeor details===========================================-->\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Employer Name:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PEmployerName}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Occupation:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.POccupation}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Employment:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PYearsACE}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Employment:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.PMonthsACE}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <!--=================================================================================================-->\r\n\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income Frequency:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.IncomeFreq}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.Income}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Frequency:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.OIncomeFreq}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.OIncomeMonthly}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div class=\"row\">\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Source:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.OIncomeSource}}</span></div>\r\n                </div>\r\n              </div>\r\n              <div class=\"col-md-12 col-lg-6\">\r\n                <div class=\"input-group border-bottom mb-2\">\r\n                  <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Gross Income:</strong></span></div>\r\n                  <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.GrossIncome}}</span></div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <div *ngIf=\"IsCoApplicantRequired.value\">\r\n\r\n              <h3 class=\"form-heading mt-3\">\r\n                <span>Co-Applicant Detail:</span>\r\n              </h3>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>First Name:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coFirstname}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Last Name:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coLastname}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Phone:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPhone}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Mobile:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMobilePhone}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Email:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmail}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>SSN:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coSSN}}</span></div>\r\n                  </div>\r\n                </div>\r\n\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>DOB:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coDOB}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coApp_country}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingState}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingCity}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingStreet}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMailingPostalCode}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <!--<div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Employment:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coYearsACE}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>-->\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Residence:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coYearsACA}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Residence:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMonthsACA}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Residence:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPYearACR}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Residence:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPMonthACR}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Country:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRcountry}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>State:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRstate}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>City:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRCity}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Street:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRStreet}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Postal Code:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPRPostalCode}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Housing Status:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.CoPHousingStatus}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employment Type:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmployerType}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Employer Name:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coEmployer}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Occupation:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coOccupation}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Current Employment:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coYearsACE}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Current Employment:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\">\r\n                      <span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coMonthsACE}}</span>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--===============================================Co-Applicant Previous employeor details===========================================-->\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Employer Name:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPEmployerName}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Previous Occupation:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPOccupation}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Years at Previous Employment:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPYearsACE}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Months at Previous Employment:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coPMonthsACE}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <!--=================================================================================================-->\r\n\r\n              <div class=\"row\">\r\n\r\n\r\n              </div>\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income Frequency:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coIncomeFreq}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Income:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.CoIncome}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n              <div class=\"row\">\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Frequency:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.CoOIncomeFreq}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coOIncome}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div class=\"row\">\r\n\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Other Income Source:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coOIncomeSource}}</span></div>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col-md-12 col-lg-6\">\r\n                  <div class=\"input-group border-bottom mb-2\">\r\n                    <div class=\"col-sm-12 col-md-6 px-0\"><span class=\"py-2 d-block\"><strong>Gross Income:</strong></span></div>\r\n                    <div class=\"col-sm-12 col-md-6\"><span class=\"py-2 d-block\">{{sendToLoanHomiPreviewDetail.coGrossIncome}}</span></div>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"modal-footer\">\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-dark form-btns\" (click)=\"onBack()\"><i class=\"fa fa-arrow-left\"></i> Back</a>\r\n          <a href=\"javascript:void(0);\" class=\"btn btn-success form-btns\" (click)=\"onPrevSubmit()\"><i class=\"fa fa-save\"></i> Submit</a>\r\n          <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Cancel</button>\r\n        </div>\r\n      </div>\r\n      <!--===========================================-->\r\n    </div>\r\n\r\n  </div>\r\n</div>\r\n<!--=================================================== ResponsePopup ==================================================================-->\r\n<div class=\"modal fade in show\" bsModal #ResponsePopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Congratulations!</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeResponsePopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"col-md-12 col-lg-12 p-0\">\r\n          <!--<div class=\"w-100 text-center pb-2\"><img src=\"https://app.loanhomi.com/src/assets/Uploads/UserProfilePick/companyLogo_637382572055515780.png\" alt=\"Solgenone\" class=\"img-fluid\" style=\"max-width:180px\"/></div>-->\r\n          <div class=\"alert alert-success\" role=\"alert\">\r\n            <i class=\"fa fa-check mr-2\"></i> <strong>Success:</strong> Loan Application Successfully added.\r\n          </div>\r\n          <div class=\"w-100\">\r\n            <p><strong>Dear {{rUserName}}</strong></p>\r\n            <p> Thanks you for applying. Your application number is <strong>{{rDataLoanAppId}}</strong> for future reference.</p>\r\n            <p> Your credit score category is <strong>{{creditScoreCategory}}</strong></p>\r\n            <p> Congratulations! You have been approved. Please look for an email from your installer with your solar financing options. Installers, to Initiate eSignatures or edit the application, login at LoanHomi.</p>\r\n\r\n            <div *ngIf=\"mandatoryDocuments!=null\">\r\n              <p><strong>Mandatory Documents:</strong></p>\r\n              <ol class=\"pl-2\">\r\n                <li *ngFor=\"let item of mandatoryDocuments;\">{{item.MasterValue}}</li>\r\n              </ol>\r\n            </div>\r\n\r\n            <p class=\"mt-4\">Is verification of income required for this loan? <strong>{{IncomeVerificationValue}}</strong></p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeResponsePopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!--<form [formGroup]=\"addAssignedResourcesForm\" [ngClass]=\"{'disabled':loadSave}\">\r\n</form>-->\r\n<!--====================================================================================================================================-->\r\n<!--=================================================== WaringPopup ==================================================================-->\r\n\r\n<div class=\"modal fade in show\" bsModal #WaringPopup=\"bs-modal\" tabindex=\"-1\" role=\"dialog\" style=\"display: none; padding-right: 10px;\">\r\n  <div class=\"modal-dialog modal-lg modal-info \">\r\n    <div class=\"modal-content\">\r\n      <div class=\"modal-header\">\r\n        <h4 class=\"modal-title\">Warning!</h4>\r\n        <button type=\"button\" class=\"close\" (click)=\"closeWaringPopup()\" data-dismiss=\"modal\" aria-label=\"Close\">\r\n          <span aria-hidden=\"true\">&times;</span>\r\n        </button>\r\n      </div>\r\n      <div class=\"modal-body\">\r\n        <div class=\"col-md-12 col-lg-12 p-0\">\r\n          <!--<div class=\"w-100 text-center pb-2\"><img src=\"https://app.loanhomi.com/src/assets/Uploads/UserProfilePick/companyLogo_637382572055515780.png\" alt=\"Solgenone\" class=\"img-fluid\" style=\"max-width:180px\"/></div>-->\r\n          <div class=\"w-100\">\r\n            <p><strong>Dear {{rUserName}}</strong></p>\r\n            <p> Thanks you for applying. Your application number is <strong>{{rDataLoanAppId}}</strong> for future reference.</p>\r\n            <p> Unfortunately at this time we can not find any solar loan options that match your application profile. Please check with your installer to find additional financing sources.</p>\r\n            <p> Installers, if you feel this decision was caused by an error during the application process, please log into LoanHomi.</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"modal-footer\">\r\n\r\n        <button type=\"submit\" class=\"btn btn-danger form-btns\" (click)=\"closeWaringPopup()\" data-dismiss=\"modal\" aria-label=\"Close\"><i class=\"fa fa-times text-white\"></i> Close</button>\r\n      </div>\r\n\r\n    </div>\r\n  </div>\r\n\r\n</div>\r\n\r\n<!--====================================================================================================================================-->\r\n<app-loader [size]=60 [color]=\"'white'\" *ngIf=\"loadSave\" class=\"loader-popup\"></app-loader>\r\n");

/***/ }),

/***/ "./src/app/views/opportunity/addeditopportunity.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/views/opportunity/addeditopportunity.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wcG9ydHVuaXR5L2FkZGVkaXRvcHBvcnR1bml0eS5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/opportunity/addeditopportunity.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/opportunity/addeditopportunity.component.ts ***!
  \*******************************************************************/
/*! exports provided: AddeditopportunityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddeditopportunityComponent", function() { return AddeditopportunityComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../internalaccounts/accountservice.service */ "./src/app/views/internalaccounts/accountservice.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};









var AddeditopportunityComponent = /** @class */ (function () {
    function AddeditopportunityComponent(fb, opportunityService, router, toaster, route, commonService, location) {
        var _this = this;
        this.fb = fb;
        this.opportunityService = opportunityService;
        this.router = router;
        this.toaster = toaster;
        this.route = route;
        this.commonService = commonService;
        this.location = location;
        this.config = [];
        this.moduleName = 'crm';
        this.submoduleName = 'opportunity';
        this.loadSave = false;
        this.id = '';
        this.isLead = false;
        this.showChild = false;
        this.formControlList = [];
        this.errors = [];
        this.JsonData = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["OpportunityJsonData"]();
        this.displayType = 'ADD';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.cleanValues = [];
        this.checkboxdata1 = [];
        this.removeValue = function (list, value, separator) {
            separator = separator || ",";
            var values = list.split(separator);
            for (var i = 0; i < values.length; i++) {
                if (values[i] == value) {
                    values.splice(i, 1);
                    return values.join(separator);
                }
            }
            return list;
        };
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.companyId = userdetail.companyId;
            _this.userId = userdetail.id;
            _this.userName = userdetail.firstName + ' ' + userdetail.lastName;
        });
        var moduleCode = this.route.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'OPPORTUNITYADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'OPPORTUNITYUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        this.timeFormat = this.commonService.getTimeFormat();
    }
    AddeditopportunityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            _this.loadSave = true;
            var id = params.get('id');
            if (id) {
                _this.id = id;
                _this.isLead = true;
                _this.pageTitle = 'Edit Opportunity';
                _this.displayType = 'EDIT';
                _this.addOrUpdatePermission = _this.isUpdate;
            }
            else {
                _this.displayType = 'ADD';
                _this.pageTitle = 'Add Opportunity';
                _this.addOrUpdatePermission = _this.isAdd;
            }
        });
        this.opportunityService.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.id, this.displayType).subscribe(function (result) {
            if (result) {
                _this.customCompnentValues = _this.opportunityService.customFieldsList.data;
                var fieldArray = [];
                _this.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this.checkboxdata1.push(checkdata);
                    }
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: _this.customCompnentValues.filter(function (x) { return x.group_id == t.group_id; })
                        };
                        _this.formControlList.push(obj);
                    }
                });
                var group_1 = {};
                var convertdatetime_1 = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_8__["DateTimeToLocalForAddEditPipe"]();
                console.log('this.customCompnentValues', _this.customCompnentValues);
                _this.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    //else if (cnt.dt_code == 'datetime') {
                    //  val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value,null)); // to convert to local time
                    //}
                    //else if (cnt.dt_code == 'date') {
                    //  val = (cnt.value == '' ? null : convertdatetime.transform(cnt.value, 'Date')); // to convert to local time
                    //}
                    else if (cnt.dt_code == 'datetime') {
                        val = (cnt.value == '' ? null : convertdatetime_1.transform(cnt.value, null)); // to convert to local time
                    }
                    else if (cnt.dt_code == 'date') {
                        val = (cnt.value == '' ? null : convertdatetime_1.transform(cnt.value, 'Date')); // to convert to local time
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this.checkboxdata1.forEach(function (item) {
                                _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    if (_this.displayType == 'ADD' && cnt.name == 'OwnerId' && cnt.dt_code == 'select' && cnt.select_options != null) {
                        cnt.select_options.forEach(function (itemList) {
                            if (itemList.name == _this.userName) {
                                val = itemList.value;
                                cnt.is_readOnly = true;
                            }
                        });
                    }
                    if (_this.displayType == 'EDIT' && (cnt.name == 'OwnerId' || cnt.name == 'Setter') && cnt.dt_code == 'select' && cnt.select_options != null && val != null) {
                        val = val.toLowerCase(); // due to user is in upper case
                    }
                    if (_this.displayType == 'ADD' && cnt.dropdown_type == 'custom' && cnt.parent_id > 1) {
                        cnt.select_options = null;
                    }
                    if (_this.displayType == 'EDIT' && cnt.dropdown_type == 'custom' && cnt.parent_id > 1 && (val != '' || val != null)) { // added by aakash goyal , before comment need to discuss used case
                        cnt.select_options = null;
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].nullValidator
                    ]);
                });
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](group_1);
                _this.loadSave = false;
            }
        });
    };
    AddeditopportunityComponent.prototype.convertUTCDateToLocalDate = function (date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    };
    AddeditopportunityComponent.prototype.checkvalue = function (formvalues, selval) {
        var returnValue = false;
        if (formvalues != null) {
            formvalues.split(',').find(function (item) {
                if (item == selval) {
                    returnValue = true;
                }
            });
        }
        return returnValue;
    };
    AddeditopportunityComponent.prototype.test = function (e) {
        // console.log('sssss', e);
        e.stopPropagation();
        e.preventDefault();
    };
    AddeditopportunityComponent.prototype.OnCheck = function () {
        // console.log(this.form);
    };
    AddeditopportunityComponent.prototype.onSubmit = function () {
        var _this = this;
        this.loadSave = true;
        this.checkboxdata1.forEach(function (item) {
            // console.log(item.controlname);
            if (item.controlvalues != "" && item.controlvalues != undefined) {
                var selvalues = ""; // this.form.get(item.controlname).value;
                if (selvalues == "" || selvalues == null) {
                    _this.form.get(item.controlname).setValue(item.controlvalues);
                }
                else {
                    _this.form.get(item.controlname).setValue(selvalues + "," + item.controlvalues);
                }
            }
        });
        console.log("EditVal", this.form.value);
        if (this.form.valid) {
            this.loadSave = true;
            this.JsonData.opportunityId = this.id;
            this.JsonData.moduleCode = this.moduleName;
            this.JsonData.subModuleCode = this.submoduleName;
            // this.JsonData.companyId = this.companyId;
            // this.JsonData.userId = this.userId;
            var _formData = this.form.value;
            for (var index in _formData) {
                var data = _formData[index];
                if (data) {
                    if (Date.prototype.isPrototypeOf(data)) {
                        _formData[index] = this.commonService.getUserSelectedZoneToUTC(data);
                    }
                }
            }
            console.log("EditVal After", this.form.value);
            this.JsonData.FormJsonData = JSON.stringify(this.form.value);
            this.opportunityService.addEditForm(this.JsonData).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //this.JsonData.callSalesForceApi(result.optionalExtraParamers);---------------------------------call sales force api
                    //// console.log("result.OptionalExtraParamers", result.optionalExtraParamers);
                    //this.toaster.success(result.responseMessage);
                    setTimeout(function () {
                        _this.toaster.success(result.responseMessage);
                        _this.loadSave = false;
                        //this.router.navigateByUrl("/opportunity");
                        _this.location.back();
                    }, 1000);
                }
                else {
                    _this.toaster.error(result.responseMessage);
                    _this.loadSave = false;
                }
            }, function (error) {
                _this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.form);
            this.loadSave = false;
        }
    };
    AddeditopportunityComponent.prototype.displayInsuranceDetail = function (reposnse) {
        var formGroup = {};
        for (var _i = 0, _a = Object.keys(this.customCompnentValues); _i < _a.length; _i++) {
            var prop = _a[_i];
            formGroup[prop] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.customCompnentValues[prop].value);
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
    };
    AddeditopportunityComponent.prototype.close = function () {
        //this.router.navigateByUrl("/opportunity");
        this.location.back();
    };
    AddeditopportunityComponent.prototype.clearCustomChange = function (inner) {
        var _this = this;
        this.cleanValues.length = 0;
        this.customCompnentValues.forEach(function (item) {
            if (inner.custom_field_id == item.parent_id) {
                item.select_options = null;
                _this.form.get(item.form_controlName).setValue(null);
                _this.cleanValues.push(item);
            }
        });
        if (this.cleanValues.length > 0) {
            this.cleanValues.forEach(function (clear) {
                _this.customCompnentValues.forEach(function (item) {
                    if (clear.custom_field_id == item.parent_id) {
                        item.select_options = null;
                        _this.form.get(item.form_controlName).setValue(null);
                    }
                });
            });
        }
    };
    AddeditopportunityComponent.prototype.onCustomChange = function (e, inner) {
        var _this = this;
        this.clearCustomChange(inner);
        this.opportunityService.GetCascadingData(e.value, this.moduleName, this.submoduleName, this.companyId).subscribe(function (result) {
            if (result) {
                _this.cascadingCompnentValues = _this.opportunityService.cascadingFieldsList.data;
                _this.cascadingCompnentValues.forEach(function (cascading) {
                    _this.customCompnentValues.forEach(function (cnt) {
                        if (cnt.form_controlName == cascading.form_controlName) {
                            cnt.select_options = cascading.m;
                        }
                    });
                });
            }
        });
    };
    AddeditopportunityComponent.prototype.fillLeadForm = function (id) {
        var _this = this;
        this.addOrUpdatePermission = this.isUpdate;
        this.opportunityService.GetOpportunityDetails(id, this.moduleName, this.submoduleName).subscribe(function (result) {
            // // console.log("result1212", this.leadService.leadEditPage.data[0]);
            var edit;
            edit = _this.opportunityService.editPage.data[0];
            //let empty = null;
            var formGroup = {};
            if (result) {
                Object.keys(edit).forEach(function (t) {
                    var cntname = t;
                    var cntValue = edit[t] == '' ? null : edit[t];
                    // console.log("cntname", cntname)
                    if (cntValue !== null && cntValue.indexOf("[") !== -1 && cntValue.indexOf("]") !== -1) {
                        cntValue = JSON.parse(cntValue);
                    }
                    if (cntValue !== null && (cntValue == 'true' || cntValue == 'false')) {
                        cntValue = (cntValue == 'true');
                        // console.log("cntValuecntValue", cntValue);
                    }
                    _this.checkboxdata1.forEach(function (item) { if (cntname == item.controlname) {
                        item.controlvalues = cntValue;
                    } }); //for checkboxes on form
                    formGroup[cntname] = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](cntValue);
                });
                // this.form.value.reset();
                _this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"](formGroup);
                //for checkboxes on form
                try {
                    _this.checkboxdata1.forEach(function (item) {
                        _this.form.get(item.controlname).setValue(item.controlvalues.split(','));
                    });
                    //this.checkboxdata1.forEach((item) => { // console.log(item.controlname, item.controlvalues); if (cntname == item.controlname) { item.controlvalues = cntValue; formGroup[cntname] = (cntValue.split(',')); } });
                }
                catch (err) { }
                // console.log("formGroup", this.form.value);
                _this.loadSave = false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    AddeditopportunityComponent.prototype.MakeArray = function (value, type) {
        var array = [];
        var arr = String(value).split(',');
        if (type == "radio" || type == "checkbox") {
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i].split("|").length > 1) {
                        var person = { name: arr[i].split("|")[0], value: arr[i].split("|")[1] };
                        array.push(person);
                    }
                    else {
                        var person = { name: arr[i], value: arr[i] };
                        array.push(person);
                    }
                }
            }
        }
        else {
            if (arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var person = { name: arr[i], value: arr[i] };
                    array.push(person);
                }
            }
        }
        return array;
    };
    AddeditopportunityComponent.prototype.MakeNormalArray = function (value) {
        if (value) {
            try {
                return JSON.parse(value);
            }
            catch (ex) {
                return value;
            }
        }
        else {
            value = [];
        }
    };
    AddeditopportunityComponent.prototype.MakeSelectArray = function (objItem) {
        var array = [];
        var arr = String(objItem.select_options).split(',');
        if (arr.length > 0 && objItem.picklist_options == 'Lookup' && objItem.form_field_visibility == "YES" && objItem.dt_code == "select") {
            var person = { name: arr[0], value: arr[1] };
            array.push(person);
            //objItem.select_options = array;
        }
        return array;
    };
    AddeditopportunityComponent.prototype.onCheckboxChange = function (e, groupdisp, controldisp) {
        // console.log('new', e);
        //const index2: number = this.formControlList.indexOf(groupdisp);
        //const index1: number = controldisp.display_order;
        var checkboxdatanew = new _internalaccounts_accountservice_service__WEBPACK_IMPORTED_MODULE_6__["CheckboxData"]();
        checkboxdatanew.controlname = controldisp.ColumnName;
        if (e.target.checked) {
            var strvalues = "";
            if (this.checkboxdata1.length > 0) {
                strvalues = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; }).controlvalues;
            }
            if (strvalues == "") {
                checkboxdatanew.controlvalues = e.target.labels[0].innerHTML;
                this.checkboxdata1.push(checkboxdatanew);
            }
            else {
                var updateItem = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; });
                var index = this.checkboxdata1.indexOf(updateItem);
                this.checkboxdata1[index].controlvalues = strvalues + "," + e.target.labels[0].innerHTML;
            }
            //  if (this.formControlList[index2].InnerData[index1].value == "") {
            //    this.formControlList[index2].InnerData[index1].value = e.target.labels[0].innerHTML;
        }
        else {
            var strs = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; }).controlvalues.split(",");
            var updatedval = strs.splice(strs.indexOf(e.target.labels[0].innerHTML), 1);
            //checkboxdatanew.controlvalues = updatedval.toString();
            var updateItem = this.checkboxdata1.find(function (item) { return item.controlname == controldisp.ColumnName; });
            var index = this.checkboxdata1.indexOf(updateItem);
            this.checkboxdata1[index].controlvalues = strs.toString();
            //this.checkboxdata1.push(checkboxdatanew);
            //    this.formControlList[index2].InnerData[index1].value = this.formControlList[index2].InnerData[index1].value + "," + e.target.labels[0].innerHTML;
        }
        //}
        //else {
        //  this.formControlList[index2].InnerData[index1].value=this.removeValue(this.formControlList[index2].InnerData[index1].value, e.target.labels[0].innerHTML, ',');
        //}
        // console.log('sss', e);
        var dd = this.formControlList;
    };
    AddeditopportunityComponent.prototype.onScrollToEnd = function (dataList, j) {
        this.fetchMore(dataList, j);
    };
    AddeditopportunityComponent.prototype.fetchMore = function (dataList, j) {
        var _this = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList[j].select_options.length;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            dataList[j].select_options = dataList[j].select_options.concat(_this.scrollDataList);
        });
    };
    AddeditopportunityComponent.prototype.onKey = function (e, dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = e.target.value;
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditopportunityComponent.prototype.onClearLang = function (dataList, j) {
        var _this = this;
        this.len = 0;
        this.custom_field_id = dataList[j].custom_field_id;
        this.field_code = dataList[j].field_code;
        this.searchText = '';
        this.commonService.GetCustomFieldsDropDownList(this.len, this.custom_field_id, this.field_code, this.searchText).subscribe(function (res) {
            _this.scrollDataList = _this.commonService.customFieldsListData;
            console.log('scrollDataList:', _this.scrollDataList);
            dataList[j].select_options = _this.scrollDataList;
        });
    };
    AddeditopportunityComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] },
        { type: _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["OpportunityListService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"] }
    ]; };
    AddeditopportunityComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-addeditopportunity',
            template: __importDefault(__webpack_require__(/*! raw-loader!./addeditopportunity.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/addeditopportunity.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./addeditopportunity.component.scss */ "./src/app/views/opportunity/addeditopportunity.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"], _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["OpportunityListService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_2__["ToastrService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"], _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["Location"]])
    ], AddeditopportunityComponent);
    return AddeditopportunityComponent;
}());



/***/ }),

/***/ "./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.scss ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wcG9ydHVuaXR5L2thbmJhbnZpZXdwb3B1cC9rYW5iYW52aWV3cG9wdXAuY29tcG9uZW50LnNjc3MifQ== */");

/***/ }),

/***/ "./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.ts ***!
  \********************************************************************************/
/*! exports provided: KanbanviewpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KanbanviewpopupComponent", function() { return KanbanviewpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};


var KanbanviewpopupComponent = /** @class */ (function () {
    function KanbanviewpopupComponent() {
        this.kanbanView = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.isWorkFlowHidden = false;
        this.loadSave = false;
    }
    KanbanviewpopupComponent.prototype.ngOnInit = function () {
    };
    KanbanviewpopupComponent.prototype.show = function (opportunityView) {
        this.isSelectedView = opportunityView;
        this.KanbanViewPopup.show();
    };
    KanbanviewpopupComponent.prototype.close = function () {
        this.KanbanViewPopup.hide();
    };
    KanbanviewpopupComponent.prototype.submit = function () {
        this.kanbanView.emit(this.radioButton);
        this.KanbanViewPopup.hide();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('KanbanViewModal', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], KanbanviewpopupComponent.prototype, "KanbanViewPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], KanbanviewpopupComponent.prototype, "kanbanView", void 0);
    KanbanviewpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-kanbanviewpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./kanbanviewpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./kanbanviewpopup.component.scss */ "./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.scss")).default]
        }),
        __metadata("design:paramtypes", [])
    ], KanbanviewpopupComponent);
    return KanbanviewpopupComponent;
}());



/***/ }),

/***/ "./src/app/views/opportunity/opportunity-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/views/opportunity/opportunity-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: OpportunityListRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunityListRoutingModule", function() { return OpportunityListRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _opportunitylist_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opportunitylist.component */ "./src/app/views/opportunity/opportunitylist.component.ts");
/* harmony import */ var _addeditopportunity_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addeditopportunity.component */ "./src/app/views/opportunity/addeditopportunity.component.ts");
/* harmony import */ var _opportunityview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./opportunityview.component */ "./src/app/views/opportunity/opportunityview.component.ts");
/* harmony import */ var _opportunityviewNew_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./opportunityviewNew.component */ "./src/app/views/opportunity/opportunityviewNew.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






var routes = [
    { path: '', component: _opportunitylist_component__WEBPACK_IMPORTED_MODULE_2__["OpportunityListComponent"] },
    { path: 'addOpportunity', component: _addeditopportunity_component__WEBPACK_IMPORTED_MODULE_3__["AddeditopportunityComponent"] },
    { path: 'editOpportunity/:id', component: _addeditopportunity_component__WEBPACK_IMPORTED_MODULE_3__["AddeditopportunityComponent"] },
    { path: 'view/:id', component: _opportunityview_component__WEBPACK_IMPORTED_MODULE_4__["OpportunityviewComponent"] },
    { path: ':id', component: _opportunitylist_component__WEBPACK_IMPORTED_MODULE_2__["OpportunityListComponent"] },
    { path: 'viewOpportunity/:id', component: _opportunityviewNew_component__WEBPACK_IMPORTED_MODULE_5__["OpportunityViewNewComponent"] },
];
var OpportunityListRoutingModule = /** @class */ (function () {
    function OpportunityListRoutingModule() {
    }
    OpportunityListRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], OpportunityListRoutingModule);
    return OpportunityListRoutingModule;
}());



/***/ }),

/***/ "./src/app/views/opportunity/opportunity.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/views/opportunity/opportunity.module.ts ***!
  \*********************************************************/
/*! exports provided: OpportunityListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunityListModule", function() { return OpportunityListModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/views/shared/shared.module.ts");
/* harmony import */ var _opportunitylist_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./opportunitylist.component */ "./src/app/views/opportunity/opportunitylist.component.ts");
/* harmony import */ var _opportunity_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./opportunity-routing.module */ "./src/app/views/opportunity/opportunity-routing.module.ts");
/* harmony import */ var _opportunityview_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./opportunityview.component */ "./src/app/views/opportunity/opportunityview.component.ts");
/* harmony import */ var _addeditopportunity_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./addeditopportunity.component */ "./src/app/views/opportunity/addeditopportunity.component.ts");
/* harmony import */ var ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ng2-ckeditor */ "./node_modules/ng2-ckeditor/fesm5/ng2-ckeditor.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _kanbanviewpopup_kanbanviewpopup_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./kanbanviewpopup/kanbanviewpopup.component */ "./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.ts");
/* harmony import */ var _opportunityviewNew_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./opportunityviewNew.component */ "./src/app/views/opportunity/opportunityviewNew.component.ts");
/* harmony import */ var _calendar_calendarlist_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../calendar/calendarlist.module */ "./src/app/views/calendar/calendarlist.module.ts");
/* harmony import */ var _sendtoloanhomimodelpopup_sendtoloanhomimodelpopup_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component */ "./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.ts");
/* harmony import */ var _shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../shared/stagemanagement/stagemanagement.component */ "./src/app/views/shared/stagemanagement/stagemanagement.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};






//import { BankRoutingModule } from './bank-routing.module';
//import { ListbankComponent } from './listbank.component';
//import { AddeditbankComponent } from './addeditbank.component';

//import { CarouselModule } from 'ngx-owl-carousel-o';












var OpportunityListModule = /** @class */ (function () {
    function OpportunityListModule() {
    }
    OpportunityListModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            providers: [_shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_16__["StagemanagementComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["DecimalPipe"]],
            declarations: [_opportunitylist_component__WEBPACK_IMPORTED_MODULE_6__["OpportunityListComponent"], _opportunityview_component__WEBPACK_IMPORTED_MODULE_8__["OpportunityviewComponent"], _addeditopportunity_component__WEBPACK_IMPORTED_MODULE_9__["AddeditopportunityComponent"], _kanbanviewpopup_kanbanviewpopup_component__WEBPACK_IMPORTED_MODULE_12__["KanbanviewpopupComponent"], _opportunityviewNew_component__WEBPACK_IMPORTED_MODULE_13__["OpportunityViewNewComponent"], _sendtoloanhomimodelpopup_sendtoloanhomimodelpopup_component__WEBPACK_IMPORTED_MODULE_15__["SendtoloanhomimodelpopupComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _opportunity_routing_module__WEBPACK_IMPORTED_MODULE_7__["OpportunityListRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"], _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_3__["NgSelectModule"], _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_4__["NgxDatatableModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"], ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_11__["ModalModule"], ng2_ckeditor__WEBPACK_IMPORTED_MODULE_10__["CKEditorModule"], _calendar_calendarlist_module__WEBPACK_IMPORTED_MODULE_14__["CalendarListModule"]
            ]
        })
    ], OpportunityListModule);
    return OpportunityListModule;
}());



/***/ }),

/***/ "./src/app/views/opportunity/opportunitylist.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/opportunity/opportunitylist.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wcG9ydHVuaXR5L29wcG9ydHVuaXR5bGlzdC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/opportunity/opportunitylist.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/opportunity/opportunitylist.component.ts ***!
  \****************************************************************/
/*! exports provided: OpportunityListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunityListComponent", function() { return OpportunityListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/searchfilter/searchfilteradd.component */ "./src/app/views/shared/searchfilter/searchfilteradd.component.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _kanbanviewpopup_kanbanviewpopup_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./kanbanviewpopup/kanbanviewpopup.component */ "./src/app/views/opportunity/kanbanviewpopup/kanbanviewpopup.component.ts");
/* harmony import */ var _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/manageviewnew/manageviewnew.component */ "./src/app/views/shared/manageviewnew/manageviewnew.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};











var OpportunityListComponent = /** @class */ (function () {
    function OpportunityListComponent(opportunitylistService, dialogService, commonService, router, activeRoute, toaster) {
        var _this = this;
        this.opportunitylistService = opportunitylistService;
        this.dialogService = dialogService;
        this.commonService = commonService;
        this.router = router;
        this.activeRoute = activeRoute;
        this.toaster = toaster;
        this.moduleName = 'crm';
        this.submoduleName = 'Opportunity';
        this.tableName = 'tblOpportunity';
        this.custom_view_id = '';
        this.searchUserType = '';
        this.vewId = '';
        //modulePermission: ModuleList;
        this.loadSave = false;
        this.sortDir = 'desc';
        this.sortColumn = 'id';
        this.ViewModel = '';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.listFilter = '';
        this.searchTxt = '';
        this.listFiltertext = '';
        this.searchFilter = '';
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["SelectionType"];
        this.selected = [];
        this.formOpportunityControlList = [];
        this.isOpportunityView = 'List';
        this.isOpportunityOldView = 'Kanban View';
        this.isGroupBy = 'Stage';
        this.modulePermission = [];
        this.isAdd = false;
        this.isUpdate = false;
        this.isDelete = false;
        this.myCheckbox = false;
        var moduleCode = this.activeRoute.snapshot.data.moduleCode;
        this.modulePermission = this.commonService.getPermissiondata(moduleCode);
        var add = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'OPPORTUNITYADD'; });
        if (add == undefined) {
            add = "null";
        }
        else {
            this.isAdd = true;
        }
        var update = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'OPPORTUNITYUPDATE'; });
        if (update == undefined) {
            update = "null";
        }
        else {
            this.isUpdate = true;
        }
        var deletedata = this.modulePermission.find(function (m) { return m.privilegecode.toUpperCase() == 'OPPORTUNITYDELETE'; });
        if (deletedata == undefined) {
            deletedata = "null";
        }
        else {
            this.isDelete = true;
        }
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
            _this.companyId = userdetail.companyId;
            _this.companyType = userdetail.companyType;
        });
        this.commonService.getMasterItemsList("usertype").subscribe(function (result) {
            _this.lstUserType = _this.commonService.masters;
        });
    }
    OpportunityListComponent.prototype.onScroll = function () {
        this.pageSizeValue = this.pageSizeValue + 15;
        if (this.totalRecords != this.jsonData.data.length) {
            this.refresh();
        }
    };
    OpportunityListComponent.prototype.ngOnInit = function () {
        var fromDate1 = this.commonService.getQueryStringValue("fromDate");
        var toDate1 = this.commonService.getQueryStringValue("toDate");
        if (fromDate1 != null && fromDate1 != undefined && fromDate1 != "") {
            var a = parseInt(fromDate1);
            this.datefrom = this.commonService.formatUnixToDate(a);
        }
        if (toDate1 != null && toDate1 != undefined && toDate1 != "") {
            var b = parseInt(toDate1);
            this.dateto = this.commonService.formatUnixToDate(b);
        }
        this.widgetType = this.commonService.getQueryStringValue("widgetType");
        this.recordFilter = this.commonService.getQueryStringValue("recordFilter");
        this.teamID = this.commonService.getQueryStringValue("teamID");
        this.teamMemberID = this.commonService.getQueryStringValue("teamMemberID");
        this.statusid = this.commonService.getQueryStringValue("stage");
        this.listFiltertext = null;
        if (this.statusid != null) {
            this.listFiltertext = "SubStageName = '" + this.statusid + "'";
        }
        if (this.datefrom != null && this.datefrom != undefined && this.datefrom != "") {
            if (this.datefrom.length > 0) {
                if (this.listFiltertext != null) {
                    this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
                }
                else {
                    this.listFiltertext = " CAST(CreatedAt AS DATE) >=  CAST('" + this.datefrom + "' AS DATE)  ";
                }
            }
        }
        if (this.dateto != null && this.dateto != undefined && this.dateto != "") {
            if (this.dateto.length > 0) {
                if (this.listFiltertext != null) {
                    this.listFiltertext = this.listFiltertext + " and CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
                }
                else {
                    this.listFiltertext = " CAST(CreatedAt AS DATE) <=  CAST('" + this.dateto + "' AS DATE)  ";
                }
            }
        }
        if (this.teamID == "null")
            this.teamID = null;
        if (this.teamMemberID == "null")
            this.teamMemberID = null;
        if (this.listFiltertext == "null")
            this.listFiltertext = null;
        //this.activeRoute.paramMap.subscribe(
        //  params => {
        //    const id = params.get('id');
        //    this.substageid = id.toString();
        //    if (id != null) {
        //      // console.log('asds', id);
        //      this.custom_view_id = '';
        //      this.pageSizeValue = 10;
        //      this.currentPage = 1;
        //      this.listFiltertext = "SubStageName = '" + this.substageid + "'";
        //      this.getPageSizes();
        //      this.refresh();
        //    }
        //  }
        //);
        this.custom_view_id = '';
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.getPageSizes();
        this.LoadViewData();
        this.refresh();
    };
    OpportunityListComponent.prototype.getListingColorCode = function (fieldValue) {
        // debugger
        this.lstListingColorCode = '';
        if (fieldValue != null) {
            this.lstListingColorCode = fieldValue.split('::');
            if (this.lstListingColorCode.length > 0) {
                this.lstListingColorCode = [{ color: this.lstListingColorCode[0], colorkey: this.lstListingColorCode[1] }];
            }
        }
        console.log('this.lstListingColorCode', this.lstListingColorCode);
        return this.lstListingColorCode;
        //console.log('this.lstListingColorCode', this.lstListingColorCode)
    };
    OpportunityListComponent.prototype.GetcustomViewid = function (event) {
        var _this = this;
        if (event == 'undefined' || typeof event == 'undefined') {
            this.LoadViewData();
        }
        this.pagedData.data.forEach(function (cnt) {
            if (cnt.custom_view_id == event) {
                _this.ViewModel = cnt.view_name;
            }
        });
        this.vewId = event;
        this.custom_view_id = event;
        this.refresh();
    };
    OpportunityListComponent.prototype.ApplyAdvanceFilter = function (event) {
        this.currentPage = 1;
        this.listFiltertext = '';
        this.listFiltertext = event;
        this.refresh();
    };
    //onDropSuccess(stageId, opportunityId) {
    //  this.opportunitylistService.UpdateOpportunityStage(stageId, opportunityId).subscribe((result: any) => {
    //    this.refresh();
    //  }, error => {
    //  });
    //}
    OpportunityListComponent.prototype.refresh = function () {
        var _this = this;
        this.selected = [];
        this.deleteId = null;
        this.loadSave = true;
        this.opportunitylistService.GetOpportunityList(this.listFiltertext, this.sortColumn, this.currentPage, this.pageSizeValue, this.sortDir, this.loginuserid, this.moduleName, this.submoduleName, this.companyId, this.custom_view_id, this.widgetType, this.recordFilter, this.teamID, this.teamMemberID, this.isOpportunityView, this.isGroupBy, this.myCheckbox)
            .subscribe(function (response) {
            //debugger;
            _this.jsonData = response;
            console.log("this.jsonData", _this.jsonData);
            _this.columndata = _this.jsonData.data;
            _this.columnheading = _this.jsonData.schema;
            _this.formOpportunityList = _this.jsonData.stages;
            if (response.data.length > 0) {
                if (_this.isOpportunityView == 'Stage') {
                    _this.formOpportunityControlList = [];
                    if (response.stages.length > 0) {
                        var stageId = _this.jsonData.stages[0].stage_id;
                        var stageName = _this.jsonData.stages[0].stage_name;
                        jquery__WEBPACK_IMPORTED_MODULE_8__["each"](_this.formOpportunityList, jquery__WEBPACK_IMPORTED_MODULE_8__["proxy"](function (index, item) {
                            stageId = item.stage_id;
                            stageName = item.stage_name;
                            var returnedData = jquery__WEBPACK_IMPORTED_MODULE_8__["grep"](this.jsonData.data, function (element, index) {
                                return element.StageNameID == stageId;
                            });
                            var obj = {
                                stage_id: stageId == null ? 0 : stageId,
                                stage_name: stageName == null ? "No Stage" : stageName,
                                InnerData: returnedData.length == 0 ? [] : returnedData,
                                rowcount: returnedData.length == 0 ? 0 : returnedData.length,
                                Id: returnedData.length == 0 ? null : typeof returnedData[0].Id == "undefined" ? 0 : returnedData[0].Id
                            };
                            this.formOpportunityControlList.push(obj);
                        }, _this));
                        if (_this.formOpportunityControlList.length > 0) {
                            _this.noRecord != true;
                        }
                        else {
                            _this.noRecord = true;
                        }
                    }
                }
                _this.totalRecords = _this.columndata[0].total_records;
                //this.listFilter = '';
            }
            else {
                _this.totalRecords = 0;
            }
            _this.offset = _this.currentPage;
        }, function (error) {
            _this.loadSave = false;
        }, function () { _this.loadSave = false; });
    };
    OpportunityListComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
        });
    };
    OpportunityListComponent.prototype.setPage = function ($event) {
        this.loadSave = true;
        this.currentPage = $event.page;
        this.refresh();
    };
    OpportunityListComponent.prototype.onSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = sort.prop;
        this.currentPage = 1;
        this.refresh();
    };
    OpportunityListComponent.prototype.onChange = function ($event) {
        this.currentPage = 1;
        this.refresh();
    };
    OpportunityListComponent.prototype.displayDetailDetail = function (TemplateName) {
        this.ManageViewModal.show(TemplateName);
    };
    Object.defineProperty(OpportunityListComponent.prototype, "curPage", {
        get: function () {
            return this.offset;
        },
        enumerable: true,
        configurable: true
    });
    OpportunityListComponent.prototype.popUpOpen = function () {
        //this.is_filter = '';
        //this.is_filter = this.listFiltertext.length;
        //this.FilterViewModal.show(this.companyId, this.is_filter);
        this.is_filter = '';
        // if (this.listFiltertext != null)
        //  this.is_filter = this.listFiltertext.length;
        this.FilterViewModal.show(this.companyId, this.is_filter);
    };
    OpportunityListComponent.prototype.updateFilter = function (event) {
        this.searchTxt = event.target.value;
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode === 13 || keycode === '13') {
            this.search();
        }
    };
    OpportunityListComponent.prototype.search = function () {
        this.currentPage = 1;
        this.listFiltertext = '';
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "OpportunityName like '%" + this.listFilter + "%'";
        }
        this.refresh();
    };
    OpportunityListComponent.prototype.reset = function () {
        this.listFilter = '';
        this.listFiltertext = '';
        this.currentPage = 1;
        this.myCheckbox = false;
        this.refresh();
    };
    OpportunityListComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.deleteId == "" || this.deleteId == null || this.deleteId == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].Id.toString() + ",";
            }
        }
        else {
            this.deleteId = null;
            this.deleteId = "";
            for (var i = 0; i < selected.length; i++) {
                this.deleteId += selected[i].Id.toString() + ",";
            }
        }
    };
    OpportunityListComponent.prototype.deleteAll = function () {
        var _this = this;
        if (this.deleteId != null && this.deleteId != "") {
            var message = "Are you sure you want to delete the selected opportunity(s)?";
            this.dialogService.confirm('Delete Opportunity(s)', message).subscribe(function (confirmed) {
                if (confirmed) {
                    _this.opportunitylistService.DeleteRecords(_this.deleteId, _this.tableName).subscribe(function (r) {
                        _this.toaster.success("Record(s) has been deleted successfully");
                        _this.deleteId = "";
                        _this.selected = [];
                        _this.refresh();
                    }, function (error) {
                    });
                }
            });
        }
        else {
            this.toaster.error("Please select at least one row.");
        }
    };
    OpportunityListComponent.prototype.Delete = function (row) {
        var _this = this;
        var message = "Are you sure you want to delete Opportunity  \"" + row.OpportunityName + "\"?";
        this.dialogService.confirm('Delete Opportunity', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.opportunitylistService.DeleteRecords(row.Id, _this.tableName).subscribe(function (r) {
                    _this.toaster.success("Opportunity \"" + row.OpportunityName + "\" has been deleted successfully");
                    _this.refresh();
                }, function (error) {
                });
            }
        });
    };
    OpportunityListComponent.prototype.DisplayKanbanView = function () {
        this.KanbanViewModal.show(this.isOpportunityView);
    };
    OpportunityListComponent.prototype.ShowListView = function (typeOpportunityView) {
        this.isOpportunityView = typeOpportunityView;
    };
    OpportunityListComponent.prototype.DisplayOldKanbanView = function () {
        var result = this.isOpportunityView;
        if (result == 'Stage') {
            this.isOpportunityView = 'List';
            this.isOpportunityOldView = 'Kanban View';
            this.pageSizeValue = 15;
            this.currentPage = 1;
        }
        else {
            this.isOpportunityView = 'Stage';
            this.isOpportunityOldView = 'List View';
            this.pageSizeValue = 15;
            this.currentPage = 1;
        }
        this.refresh();
    };
    OpportunityListComponent.prototype.LoadViewData = function () {
        var _this = this;
        this.loadSave = true;
        this.pageSizeValue = 15;
        this.currentPage = 1;
        this.commonService.getViewList(this.searchTxt, this.searchUserType, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.moduleName, this.submoduleName, this.companyId).subscribe(function (response) {
            _this.pagedData = _this.commonService.pagedData;
            _this.pagedData.data.forEach(function (cnt) {
                if (cnt.is_default == true) {
                    _this.vewId = cnt.custom_view_id;
                    _this.ViewModel = cnt.view_name;
                }
            });
        }, function (error) {
            _this.loadSave = false;
        }, function () { _this.loadSave = false; });
    };
    OpportunityListComponent.prototype.SetManageViewValue = function (event, text) {
        this.ViewModel = text;
        this.custom_view_id = event;
        this.refresh();
        //this.LoadViewData();
    };
    OpportunityListComponent.prototype.switchClicked = function (event) {
        this.listFiltertext = '';
        this.myCheckbox = event.srcElement.checked;
        this.currentPage = 1;
        if (this.listFilter.trim().length > 0) {
            this.listFiltertext = "OpportunityName like '%" + this.listFilter + "%'";
        }
        if (this.listFiltertext.trim().length > 0) {
            this.refresh();
        }
        if (this.myCheckbox == false) {
            this.refresh();
        }
    };
    OpportunityListComponent.ctorParameters = function () { return [
        { type: _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateFilterView', { static: false }),
        __metadata("design:type", _shared_searchfilter_searchfilteradd_component__WEBPACK_IMPORTED_MODULE_6__["SearchfilteraddComponent"])
    ], OpportunityListComponent.prototype, "FilterViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('templateManageView', { static: false }),
        __metadata("design:type", _shared_manageviewnew_manageviewnew_component__WEBPACK_IMPORTED_MODULE_10__["ManageviewnewComponent"])
    ], OpportunityListComponent.prototype, "ManageViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('KanbanViewModal', { static: false }),
        __metadata("design:type", _kanbanviewpopup_kanbanviewpopup_component__WEBPACK_IMPORTED_MODULE_9__["KanbanviewpopupComponent"])
    ], OpportunityListComponent.prototype, "KanbanViewModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["DatatableComponent"])
    ], OpportunityListComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number)
    ], OpportunityListComponent.prototype, "offset", void 0);
    OpportunityListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-opportunitylist',
            template: __importDefault(__webpack_require__(/*! raw-loader!./opportunitylist.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunitylist.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./opportunitylist.component.scss */ "./src/app/views/opportunity/opportunitylist.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"], _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_3__["ConfirmationDialogService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_5__["ToastrService"]])
    ], OpportunityListComponent);
    return OpportunityListComponent;
}());



/***/ }),

/***/ "./src/app/views/opportunity/opportunityview.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/views/opportunity/opportunityview.component.scss ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3ZpZXdzL29wcG9ydHVuaXR5L29wcG9ydHVuaXR5dmlldy5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/views/opportunity/opportunityview.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/views/opportunity/opportunityview.component.ts ***!
  \****************************************************************/
/*! exports provided: OpportunityviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunityviewComponent", function() { return OpportunityviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ng-select/ng-select */ "./node_modules/@ng-select/ng-select/esm5/ng-select.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/fesm5/swimlane-ngx-datatable.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../dashboard/dashboard.service */ "./src/app/views/dashboard/dashboard.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../emailtemplate/emailtemplate.service */ "./src/app/views/emailtemplate/emailtemplate.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};













var OpportunityviewComponent = /** @class */ (function () {
    function OpportunityviewComponent(route, commonService, opprtunityservice, fb, emailTemplateService, dashboardService, dialogService, leadservice, router, toaster) {
        var _this = this;
        this.route = route;
        this.commonService = commonService;
        this.opprtunityservice = opprtunityservice;
        this.fb = fb;
        this.emailTemplateService = emailTemplateService;
        this.dashboardService = dashboardService;
        this.dialogService = dialogService;
        this.leadservice = leadservice;
        this.router = router;
        this.toaster = toaster;
        this.active = false;
        this.notemodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_9__["noteModel"]();
        this.requestDesign = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["RequestDesign"]();
        this.emailmodel = new _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_9__["emailModel"]();
        this.stageid = 1;
        //new
        this.ColumnMode = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["ColumnMode"];
        this.SelectionType = _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["SelectionType"];
        this.listFilter = '';
        this.searchTxt = '';
        this.sortDir = 'desc';
        this.sortColumn = 'createdon';
        this.pagedData = {
            pager: {},
            data: []
        };
        this.AssociatedproductpagedData = {
            pager: {},
            data: []
        };
        this.NotespagedData = {
            pager: {},
            data: []
        };
        this.emailpagedData = {
            pager: {},
            data: []
        };
        this.AssociatedproposalpagedData = {
            pager: {},
            data: []
        };
        this.productid = "";
        this.selected = [];
        this.fileName = 'Choose file';
        this.contactpagedData = {
            pager: {},
            data: []
        };
        this.loadSave = false;
        this.addNoteForm = this.fb.group({
            // note: ['', Validators.required],  
            noteDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
        });
        this.EmailForm = this.fb.group({
            templateid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            sentto: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            subject: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            emailDescription: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
        });
        //IMAGE UPLOAD   
        this.UploadimageForm = this.fb.group({
            profilePic: [''],
            'file': '',
            'filename': [''],
            filetype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required]
        });
        this.addRequestDesignForm = this.fb.group({
            requestDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            fromTime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required],
            designNotes: [''],
            adderNotes: [''],
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this.loginuserid = userdetail.id;
        });
    }
    OpportunityviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.submoduleid = 11;
        this.objectname = 'opportunity';
        localStorage.removeItem('opid');
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this.opid = id;
            localStorage.setItem('opid', _this.opid);
        });
        this.getopportunitystage();
        this.GetOpportunityViewAccData();
        this.Getappointments();
        this.pageSizeValue = 10;
        this.pageSizeValueContact = 10;
        this.pageSizeValueAssociateProduct = 10;
        this.pageSizeValueProposal = 10;
        this.pageSizeValueemail = 10;
        this.pageSizeValuenotes = 10;
        this.getPageSizes();
        this.GetAssociateProductList();
        //  this.GetOpportunityProposalList();
        this.getNoteslist();
        this.getEmaillist();
        this.getContactList();
        this.getImages();
        this.getcontactdll();
        this.GettemplatetDll();
        this.commonService.getMasterItemsList('PrerequisiteLoanProductDocumentType').subscribe(function (result) {
            _this.lstfiletype = _this.commonService.masters;
            // console.log('lstfiletype', this.lstfiletype);
        });
    };
    OpportunityviewComponent.prototype.changeToValue = function (e) {
    };
    OpportunityviewComponent.prototype.getopportunitystage = function () {
        var _this = this;
        this.opprtunityservice.getopportunitystage(this.opid).subscribe(function (result) {
            _this.stagelist = result;
            // console.log('stagelist', this.stagelist);
            for (var i = 0; i < result.length; i++) { //12 change due yo error by aakash goyal
                if (result[i].activeTab == 1) {
                    _this.stageid = result[i].stageid;
                }
                // console.log(this.stageid);
                _this.GetOpportunityview();
            }
        });
    };
    OpportunityviewComponent.prototype.tabclick = function (id) {
        this.stageid = id;
        this.GetOpportunityview();
    };
    OpportunityviewComponent.prototype.editProposal = function (id, oppId) {
        this.router.navigate(['../proposal-list/addproposal/opportunity/', oppId], { queryParams: { proposal: id } });
    };
    OpportunityviewComponent.prototype.GetOpportunityViewAccData = function () {
        var _this = this;
        this.opprtunityservice.GetOpportunityViewAccData(this.opid).subscribe(function (result) {
            // console.log('this.accountdata',result);
            if (result.length > 0) {
                _this.accountdata = result;
                _this.emailacc = result[0].Email;
                _this.Address = result[0].Address;
                _this.closeddate1 = result[0].closeddate;
                _this.createdon = result[0].createdon;
                _this.phoneno = result[0].MobilePhone;
                _this.createdby = result[0].createdby;
                _this.substagename = result[0].subStageName;
            }
            // console.log('this.emailacc', this.emailacc);
        });
    };
    OpportunityviewComponent.prototype.DeleteContact = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Contact?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteContact(Id, _this.opid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Contact has been deleted successfully..");
                    _this.getContactList();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.GetOpportunityview = function () {
        var _this = this;
        this.opprtunityservice.GetOpportunityview(this.opid, this.stageid).subscribe(function (result) {
            _this.oplist = result;
            // console.log('oplist', result);
        });
    };
    OpportunityviewComponent.prototype.updateStage = function (id) {
        var _this = this;
        var message = "Are you sure you want update Stage?";
        this.dialogService.confirm('update Stage', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.opprtunityservice.updateStage(_this.opid, id).subscribe(function (result) {
                    _this.GetOpportunityview();
                    _this.getopportunitystage();
                    _this.GetOpportunityViewAccData();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.Getappointments = function () {
        var _this = this;
        this.leadservice.GetLeadappointments(this.opid, this.submoduleid, this.objectname).subscribe(function (result) {
            // console.log('appointlistbefore', result);
            _this.appointlistbefore = result.filter(function (x) { return x.AppointmentType == 'upcoming'; });
            _this.appointlistafter = result.filter(function (x) { return x.AppointmentType == 'past'; });
        });
    };
    OpportunityviewComponent.prototype.deleteAssociateproduct = function (Id) {
        var _this = this;
        var message = "Are you sure you want to de-Associate Product?";
        this.dialogService.confirm('Delete Product', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.deleteAssociateproduct(Id, _this.opid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Product has been de-Associate successfully..");
                    _this.GetAssociateProductList();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.deleteAssociateProposal = function (Id) {
        var _this = this;
        var message = "Are you sure you want to proposal?";
        this.dialogService.confirm('Delete Proposal', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.opprtunityservice.DeleteRecords(Id, 'tblProposal').subscribe(function (r) {
                    _this.toaster.success("Proposal has been delete successfully..");
                    _this.GetOpportunityProposalList();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.GetProductList = function () {
        var _this = this;
        this.productModal.show();
        this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    OpportunityviewComponent.prototype.GetAssociateProductList = function () {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.GetOpportunityProposalList = function () {
        var _this = this;
        this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproposalpagedData = _this.opprtunityservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.getPageSizes = function () {
        var _this = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this.lstPageSize = _this.commonService.masters;
            _this.lstPageSizeContact = _this.commonService.masters;
            _this.lstPageSizeNotes = _this.commonService.masters;
            _this.lstPageSizeemail = _this.commonService.masters;
            _this.lstPageSizeAssociateProduct = _this.commonService.masters;
            _this.lstPageSizeProposal = _this.commonService.masters;
        });
    };
    OpportunityviewComponent.prototype.onActivate = function (event) {
    };
    OpportunityviewComponent.prototype.onSelect = function (_a) {
        var _b;
        var selected = _a.selected;
        if (this.productid == "" || this.productid == null || this.productid == 'undefined') {
            this.selected.splice(0, this.selected.length);
            (_b = this.selected).push.apply(_b, selected);
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productid += selected[i].ID.toString() + ",";
                }
            }
        }
        else {
            this.productid = null;
            this.productid = "";
            for (var i = 0; i < selected.length; i++) {
                if (selected[i].asociatedUser !== 1) {
                    this.productid += selected[i].ID.toString() + ",";
                }
            }
        }
        // console.log('this.productid', this.productid);
    };
    OpportunityviewComponent.prototype.setPageAssociateProduct = function ($event) {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.setPageAssociateProposal = function ($event) {
        var _this = this;
        this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSizeAssociateProduct, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproposalpagedData = _this.opprtunityservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.setPage = function ($event) {
        var _this = this;
        this.lstPageSize = $event.page - 1;
        this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, this.lstPageSize, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    OpportunityviewComponent.prototype.setPageNote = function ($event) {
        var _this = this;
        this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeemail, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            // console.log('NotespagedData', this.NotespagedData);
        });
    };
    OpportunityviewComponent.prototype.saveProduct = function () {
        var _this = this;
        if (this.productid != null && this.productid != "") {
            //this.loadSave = false;
            // console.log('this.productid1111', this.productid);
            this.leadservice.AssociteProduct(this.productid, this.opid, this.submoduleid, this.objectname, false).subscribe(function (r) {
                // console.log('produvct')
                _this.toaster.success("product has been Associate scuccessfully");
                // this.loadSave = true
                _this.productid = "";
                _this.selected = [];
                _this.GetAssociateProductList();
                _this.GetProductList();
                _this.productModal.hide();
            }, function (error) {
            });
        }
        else {
            // this.loadSave = true
            this.toaster.error("Please select at least one row.");
        }
        //this.loadSave = true
    };
    OpportunityviewComponent.prototype.showNotesPopup = function () {
        this.AddNotesModal.show();
    };
    OpportunityviewComponent.prototype.SaveNotes = function () {
        var _this = this;
        if (this.addNoteForm.valid) {
            this.loadSave = true;
            // this.notemodel.note_name = this.addNoteForm.value.note;
            this.notemodel.note_description = this.addNoteForm.value.noteDescription;
            this.notemodel.object_ref_id = this.opid;
            this.notemodel.object_name = this.objectname;
            this.notemodel.object_id = this.submoduleid;
            // console.log(this.addNoteForm.value.note + ' sadf' + this.addNoteForm.value.noteDescription);
            this.leadservice.saveNotes(this.notemodel).subscribe(function (result) {
                if (result.statusCode == 200) {
                    //setTimeout(() => {  console.log('notes') }, 3000);
                    _this.loadSave = false;
                    _this.toaster.success(result.responseMessage);
                    _this.addNoteForm.reset();
                    _this.getNoteslist();
                    _this.AddNotesModal.hide();
                }
                else {
                    _this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
                //}, error => {
                //  //this.loadSave = false;
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.addNoteForm);
        }
    };
    OpportunityviewComponent.prototype.clickrm = function () {
        this.AddNotesModal.show();
    };
    OpportunityviewComponent.prototype.getEmaillist = function () {
        var _this = this;
        this.leadservice.getEmaillist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.emailpagedData = _this.leadservice.pagedData;
            // console.log('emailpagedData', this.emailpagedData);
        });
    };
    OpportunityviewComponent.prototype.getNoteslist = function () {
        var _this = this;
        this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            // console.log('NotespagedData', this.NotespagedData);
        });
    };
    OpportunityviewComponent.prototype.DeleteNote = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Note?";
        this.dialogService.confirm('Delete Note', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.DeleteNote(Id, _this.opid, _this.submoduleid, _this.objectname).subscribe(function (r) {
                    _this.toaster.success("Note has been deleted successfully..");
                    _this.getNoteslist();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.Deleteimage = function (Id) {
        var _this = this;
        var message = "Are you sure you want to delete Image?";
        this.dialogService.confirm('Delete Image', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.leadservice.Deleteimage(Id).subscribe(function (r) {
                    _this.toaster.success("Image has been deleted successfully..");
                    _this.getImages();
                }, function (error) {
                });
            }
        });
    };
    OpportunityviewComponent.prototype.setPageNotes = function ($event) {
        var _this = this;
        this.lstPageSizeNotes = $event.page - 1;
        this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeNotes, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            // console.log('NotespagedData', this.NotespagedData);
        });
    };
    Object.defineProperty(OpportunityviewComponent.prototype, "noteDescription", {
        //get note() { return this.addNoteForm.get('note'); }
        get: function () { return this.addNoteForm.get('noteDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "sentto", {
        get: function () { return this.EmailForm.get('sentto'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "templateid", {
        get: function () { return this.EmailForm.get('templateid'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "subject", {
        get: function () { return this.EmailForm.get('subject'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "emailDescription", {
        get: function () { return this.EmailForm.get('emailDescription'); },
        enumerable: true,
        configurable: true
    });
    OpportunityviewComponent.prototype.SaveEmail = function () {
        var _this = this;
        if (this.EmailForm.valid) {
            this.loadSave = true;
            var ab = this.contactlist.filter(function (x) { return x.value == _this.EmailForm.value.sentto; });
            this.emailmodel.sent_to = ab[0].masterName;
            this.emailmodel.contactid = this.EmailForm.value.sentto;
            this.emailmodel.templateid = this.EmailForm.value.templateid;
            this.emailmodel.subject = this.EmailForm.value.subject;
            this.emailmodel.description = this.EmailForm.value.emailDescription;
            this.emailmodel.object_ref_id = this.opid;
            this.emailmodel.object_name = this.objectname;
            this.emailmodel.object_id = this.submoduleid;
            // console.log(this.emailmodel)
            this.leadservice.saveEmail(this.emailmodel).subscribe(function (result) {
                setTimeout(function () {
                    if (result.statusCode == 200) {
                        _this.loadSave = false;
                        _this.toaster.success(result.responseMessage);
                        _this.getEmaillist();
                        _this.emailModal.hide();
                        _this.EmailForm.reset();
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(result.responseMessage);
                    }
                }, 3000);
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.EmailForm);
        }
    };
    OpportunityviewComponent.prototype.AddContact = function () {
        this.router.navigate(['../contactlist/addContact/opportunity', this.opid]);
    };
    Object.defineProperty(OpportunityviewComponent.prototype, "profilePic", {
        get: function () { return this.UploadimageForm.get('profilePic'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "filename", {
        get: function () { return this.UploadimageForm.get('filename'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "filetype", {
        get: function () { return this.UploadimageForm.get('filetype'); },
        enumerable: true,
        configurable: true
    });
    OpportunityviewComponent.prototype.setFile = function ($event) {
        this.commonService.uploadImageFileValidator($event);
        this.commonService.uploadDocumentSize("img", $event.target.files[0].size, "5MB");
        if (this.commonService.isFileValid) {
            this.fileName = $event.target.files[0].name;
            //this.companyLogo.setValue($event.target.files[0].name);
        }
    };
    OpportunityviewComponent.prototype.prepareFormDataForDocument = function () {
        var input = new FormData();
        input.append('companyId', '1001');
        input.append('companyName', '');
        input.append('moduleid', '4');
        input.append('submoduleid', 'opportunity');
        input.append('refid', this.opid);
        input.append('filetype', this.UploadimageForm.value.filetype);
        var fileBrowser = this.fileInput.nativeElement;
        if (fileBrowser.files && fileBrowser.files[0]) {
            input.append('file', fileBrowser.files[0]);
        }
        return input;
    };
    OpportunityviewComponent.prototype.SaveImage = function () {
        var _this = this;
        if (this.UploadimageForm.valid) {
            this.loadSave = true;
            var companySetupModel = this.prepareFormDataForDocument();
            this.dashboardService.addOrUpdateUploadFileOnAzzure(companySetupModel).subscribe(function (result) {
                setTimeout(function () {
                    if (result.statusCode == 200) {
                        _this.loadSave = false;
                        _this.toaster.success('image uploaded successfully');
                        _this.fileInput.nativeElement.value = "";
                        //// console.log("fileInput", this.fileInput.nativeElement.files);
                        _this.fileName = '';
                        _this.getImages();
                        _this.fileuploadddl.clearModel();
                    }
                    else {
                        _this.loadSave = false;
                        _this.toaster.error(result.responseMessage);
                    }
                }, 3000);
            }, function (error) {
            });
        }
        else {
            this.loadSave = false;
            this.commonService.validateAllFormFields(this.UploadimageForm);
        }
    };
    OpportunityviewComponent.prototype.getContactList = function () {
        var _this = this;
        this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    OpportunityviewComponent.prototype.showemailpopup = function () {
        this.emailModal.show();
    };
    OpportunityviewComponent.prototype.close = function () {
        this.emailModal.hide();
        this.AddNotesModal.hide();
        this.productModal.hide();
    };
    OpportunityviewComponent.prototype.onChange = function ($event) {
        var _this = this;
        this.leadservice.GetProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.pagedData = _this.leadservice.pagedData;
            // console.log('pagedData', this.pagedData);
        });
    };
    OpportunityviewComponent.prototype.onChangeEmail = function ($event) {
        var _this = this;
        this.leadservice.getEmaillist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.emailpagedData = _this.leadservice.pagedData;
            // console.log('emailpagedData', this.emailpagedData);
        });
    };
    OpportunityviewComponent.prototype.onChangeNotes = function ($event) {
        var _this = this;
        this.leadservice.getNoteslist(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.NotespagedData = _this.leadservice.pagedData;
            // console.log('NotespagedData', this.NotespagedData);
        });
    };
    OpportunityviewComponent.prototype.onChangeAssociateProduct = function ($event) {
        var _this = this;
        this.leadservice.GetAssociateProductList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproductpagedData = _this.leadservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.onChangeAssociateProposal = function ($event) {
        var _this = this;
        this.opprtunityservice.GetOpportunityProposalList(this.opid, this.submoduleid, this.objectname, this.listFilter, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.AssociatedproposalpagedData = _this.opprtunityservice.pagedData;
        });
    };
    OpportunityviewComponent.prototype.setPageContact = function ($event) {
        var _this = this;
        this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    OpportunityviewComponent.prototype.onChangeContact = function () {
        var _this = this;
        this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, 0, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this.contactpagedData = _this.leadservice.pagedData;
            // console.log('contactpagedData', this.contactpagedData);
        });
    };
    OpportunityviewComponent.prototype.getImages = function () {
        var _this = this;
        this.opprtunityservice.GetOpportunityViewFileupload(this.opid).subscribe(function (result) {
            _this.fileuplist = result;
            // console.log('fileuplist', result);
        });
    };
    OpportunityviewComponent.prototype.displayemaildetail = function (data) {
        this.emaildesc = data.description;
        // console.log('sasd', this.emaildesc);
        this.emaildetail.show();
    };
    OpportunityviewComponent.prototype.closeemaildesc = function () {
        this.emaildetail.hide();
    };
    OpportunityviewComponent.prototype.displaynotedetail = function (data) {
        this.notedesc = data.note_description;
        // console.log('notedesc', this.notedesc);
        this.notedetail.show();
    };
    OpportunityviewComponent.prototype.closenotedesc = function () {
        this.notedetail.hide();
    };
    OpportunityviewComponent.prototype.onChangetemp = function ($event) {
    };
    OpportunityviewComponent.prototype.onPaste = function ($event) {
    };
    OpportunityviewComponent.prototype.getcontactdll = function () {
        var _this = this;
        this.leadservice.GetContactDll(this.opid, this.submoduleid, this.objectname).subscribe(function (result) {
            _this.contactlist = result;
            // console.log(' this.contactlist', this.contactlist);
        });
    };
    OpportunityviewComponent.prototype.GettemplatetDll = function () {
        var _this = this;
        this.leadservice.GettemplatetDll(this.objectname).subscribe(function (result) {
            _this.templatelist = result;
        });
    };
    OpportunityviewComponent.prototype.gettemplatelist = function (event) {
        var _this = this;
        // console.log('event', event);
        this.tempid = event.value;
        this.emailTemplateService.getEmailTemplateById(this.tempid).subscribe(function (result) {
            // console.log('tempaltedate', result)
            _this.EmailForm.patchValue({
                subject: result.emailTemplateSubject,
                emailDescription: result.template
            });
        });
    };
    OpportunityviewComponent.prototype.closerequestdesign = function () {
        this.requestdesignModal.hide();
    };
    OpportunityviewComponent.prototype.showrequestdesignpopup = function () {
        this.addRequestDesignForm.reset();
        this.requestdesignModal.show();
        this.GetRequestDesignOpportunity();
        //let today = new Date();
        //this.date1 = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
        //console.log('date1',this.date1);
        //this.fTime = new Date();
        //this.fTime.getHours() + ":" + this.fTime.getMinutes();
        //this.addRequestDesignForm.patchValue({
        //  requestDate: this.date1,
        //  fromTime:this.fTime
        //})
    };
    OpportunityviewComponent.prototype.GetRequestDesignOpportunity = function () {
        var _this = this;
        this.opprtunityservice.GetRequestDesignOpportunity(this.opid).subscribe(function (result) {
            console.log('dataresult', result);
            var fromtime = new Date(result.requestDate);
            if (result.requestDate != '0001-01-01T00:00:00') {
                _this.addRequestDesignForm.patchValue({
                    adderNotes: result.adderNotes,
                    designNotes: result.designNotes,
                    requestDate: fromtime,
                    fromTime: fromtime
                });
            }
            else {
                var today = new Date();
                _this.date1 = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                console.log('date1', _this.date1);
                _this.fTime = new Date();
                _this.fTime.getHours() + ":" + _this.fTime.getMinutes();
                _this.addRequestDesignForm.patchValue({
                    requestDate: _this.date1,
                    fromTime: _this.fTime
                });
            }
        });
    };
    Object.defineProperty(OpportunityviewComponent.prototype, "requestDate", {
        get: function () { return this.addRequestDesignForm.get('requestDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "fromTime", {
        get: function () { return this.addRequestDesignForm.get('fromTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "designNotes", {
        get: function () { return this.addRequestDesignForm.get('designNotes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityviewComponent.prototype, "adderNotes", {
        get: function () { return this.addRequestDesignForm.get('adderNotes'); },
        enumerable: true,
        configurable: true
    });
    OpportunityviewComponent.prototype.SaveRequestDesign = function () {
        var _this = this;
        console.log('this.addForm', this.addRequestDesignForm.value);
        //requestDesign
        if (this.addRequestDesignForm.valid) {
            this.requestDesign.designNotes = this.addRequestDesignForm.value.designNotes;
            this.requestDesign.adderNotes = this.addRequestDesignForm.value.adderNotes;
            var dtdate = new Date(this.addRequestDesignForm.value.requestDate);
            this.requestDesign.RequestDate = dtdate.toDateString();
            this.requestDesign.FromTime = this.addRequestDesignForm.value.fromTime;
            this.fTime = new Date(this.requestDesign.FromTime);
            this.requestDesign.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
            // this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
            this.requestDesign.OpportunityId = this.opid;
            console.log('this.appmodel', this.requestDesign);
            this.opprtunityservice.SaveRequestDesignOpportunity(this.requestDesign).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this.toaster.success(result.responseMessage);
                    _this.addRequestDesignForm.reset();
                    _this.requestdesignModal.hide();
                }
                else {
                    //this.loadSave = false;
                    _this.toaster.error(result.responseMessage);
                }
            }, function (error) {
                //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addRequestDesignForm);
        }
    };
    OpportunityviewComponent.prototype.onSort = function (e) {
    };
    OpportunityviewComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"] },
        { type: _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"] },
        { type: _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_12__["EmailTemplateService"] },
        { type: _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_10__["DashboardService"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_11__["ConfirmationDialogService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_9__["LeadlistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileuploadddl', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], OpportunityviewComponent.prototype, "fileuploadddl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "modalmakeAppointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('requestdesign', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "requestdesignModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('fileInput', { static: false }),
        __metadata("design:type", Object)
    ], OpportunityviewComponent.prototype, "fileInput", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('AddNotes', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "AddNotesModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('product', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "productModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('email', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "emailModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('emaildetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "emaildetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('notedetail', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_6__["ModalDirective"])
    ], OpportunityviewComponent.prototype, "notedetail", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"], { static: false }),
        __metadata("design:type", _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_5__["DatatableComponent"])
    ], OpportunityviewComponent.prototype, "table", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("myckeditor", { static: false }),
        __metadata("design:type", Object)
    ], OpportunityviewComponent.prototype, "ckeditor", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('clearDrop', { static: false }),
        __metadata("design:type", _ng_select_ng_select__WEBPACK_IMPORTED_MODULE_4__["NgSelectComponent"])
    ], OpportunityviewComponent.prototype, "clearDrop", void 0);
    OpportunityviewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-opportunityview',
            template: __importDefault(__webpack_require__(/*! raw-loader!./opportunityview.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityview.component.html")).default,
            styles: [__importDefault(__webpack_require__(/*! ./opportunityview.component.scss */ "./src/app/views/opportunity/opportunityview.component.scss")).default]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"],
            _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormBuilder"],
            _emailtemplate_emailtemplate_service__WEBPACK_IMPORTED_MODULE_12__["EmailTemplateService"],
            _dashboard_dashboard_service__WEBPACK_IMPORTED_MODULE_10__["DashboardService"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_11__["ConfirmationDialogService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_9__["LeadlistService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_8__["ToastrService"]])
    ], OpportunityviewComponent);
    return OpportunityviewComponent;
}());

//GetOpportunityViewFileupload() {
//  this.opprtunityservice.GetOpportunityViewFileupload(this.opid).subscribe((result: any) => {
//    this.fileuplist = result;
//    // console.log('fileuplist', result);
//  })
//}
//GetOpportunityViewcontractlist() {
//  this.opprtunityservice.GetOpportunityViewcontractlist(this.opid).subscribe((result: any) => {
//    this.contractlist = result;
//    // console.log('contractlist', result);
//  })
//}
//GetOpportunityViewWorkorder() {
//  this.opprtunityservice.GetOpportunityViewWorkorder(this.opid).subscribe((result: any) => {
//    this.worklist = result;
//    // console.log('worklist', result);
//  })
//}
//GetOpportunityViewTask() {
//  this.opprtunityservice.GetOpportunityViewTask(this.opid).subscribe((result: any) => {
//    this.tasklist = result;
//    // console.log('tasklist', result);
//  })
//}
//GetAppointmentbyopportunityId() {
//  this.opprtunityservice.GetAppointmentbyopportunityId(this.opid).subscribe((result: any) => {
//    // console.log('appointlistbefore', result);
//    this.appointlistbefore = result.filter(x => x.AppointmentType == 'upcoming');
//    this.appointlistafter = result.filter(x => x.AppointmentType == 'past');
//  })
//}
//GetOpportunityViewProposal() {
//  this.opprtunityservice.GetOpportunityViewProposal(this.opid).subscribe((result: any) => {
//    this.proposallist = result;
//    // console.log('proposallist', result);
//  })
//}
//GetOpportunityViewProduct() {
//  this.opprtunityservice.GetOpportunityViewProduct(this.opid).subscribe((result: any) => {
//    this.productlist = result;
//    // console.log('productlist', result);
//  })
//}
//GetOpportunityviewTabData() {
//  this.opprtunityservice.GetOpportunityviewTabData(this.opid).subscribe((result: any) => {
//    this.tabllist = result;
//    result.forEach(childObj => {
//      this.Aware_of_Solar_Tax_Credits_ITC = childObj.Aware_of_Solar_Tax_Credits_ITC;
//      this.Aware_of_Solar_Tax_Liabilities = childObj.Aware_of_Solar_Tax_Liabilities;
//      this.Budget_Confirmed = childObj.Budget_Confirmed;
//      this.Credit_Threshold_Met = childObj.Credit_Threshold_Met;
//      this.Description = childObj.Description;
//      this.Loan_Product = childObj.Loan_Product;
//      this.Discovery_Completed = childObj.Discovery_Completed;
//      this.Homeowner = childObj.Homeowner;
//      this.Insulation_Upgrade = childObj.Insulation_Upgrade;
//      this.LED_Lightbulb_Upgrade = childObj.LED_Lightbulb_Upgrade;
//      this.Loss_Reason = childObj.Loss_Reason;
//      this.Max_R_Upgrade = childObj.Max_R_Upgrade;
//      this.Mounting_Location = childObj.Mounting_Location;
//      this.OpportunityName = childObj.OpportunityName;
//      this.Probability = childObj.Probability;
//      this.ROI_Analysis_Completed = childObj.ROI_Analysis_Completed;
//      this.Re_Roof_Needed = childObj.Re_Roof_Needed;
//      this.Request_Proposal_Design = childObj.Request_Proposal_Design;
//      this.Roof_Material = childObj.Roof_Material;
//      this.Roof_Type = childObj.Roof_Type;
//      this.Shop_has_Electrical_Sub_Panel = childObj.Shop_has_Electrical_Sub_Panel;
//      this.Smart_Thermostat_Installation = childObj.Smart_Thermostat_Installation;
//      this.closeddate = childObj.closeddate;
//      this.leadsource = childObj.leadsource;
//      this.mainpannelupgrade = childObj.mainpannelupgrade;
//      this.primarycampsourc = childObj.primarycampsourc;
//      this.syncquate = childObj.syncquate;
//    })
//    // console.log('tablist', result);
//  })
//}
///appointment Popup
//getAppointmentType() {
//  this.commonService.getMasterItemsList('appointmenttype').subscribe((result: any) => {
//    this.lstappointment = this.commonService.masters;
//    // console.log('sas', this.commonService.masters);
//  })
//}
//getcustomertype() {
//  this.opprtunityservice.GetAssignedUsers().subscribe((result: any) => {
//    this.lstCustomer = result;
//  })
//}
//close() {
//  this.active = false;
//  this.modalmakeAppointment.hide();
//}
//Save() {
//  if (this.addForm.valid) {
//    this.appmodel.OpportunityId = this.opid;
//    this.appmodel.AppointmentTypeID = this.addForm.value.appointmenttypeId;
//    this.appmodel.CustomerID = this.addForm.value.customerId;
//    this.appmodel.AppointmentDueDate = this.addForm.value.appointmentDueDate;
//    this.appmodel.FromTime = this.addForm.value.fromTime;
//    this.appmodel.ToTime = this.addForm.value.toTime;
//    this.fTime = new Date(this.appmodel.FromTime);
//    this.Tdate = new Date(this.appmodel.ToTime);
//    this.appmodel.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
//    this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
//    this.opprtunityservice.addeditannouncement(this.appmodel).subscribe((result: any) => {
//      if (result.statusCode == 200) {
//        this.toaster.success(result.responseMessage);
//      }
//      else {
//        //this.loadSave = false;
//        this.toaster.error(result.responseMessage);
//      }
//    }, error => {
//      //this.loadSave = false;
//    });
//  }
//  else {
//    this.commonService.validateAllFormFields(this.addForm);
//  }
//  //this.appmodel.FromTime = this.fTime.getDate() + '-' + this.fTime.getMonth() + '-' + this.fTime.getFullYear();
//  //this.fTime = new Date(this.appmodel.FromTime);
//  // console.log(this.appmodel.FromTime);
//  this.modalmakeAppointment.hide();
//  this.router.navigateByUrl("/calendar");
//}
//show() {
//  //this.refresh();
//  this.modalmakeAppointment.show();
//  this.active = true;
//}
//addForm = this.fb.group({
//  appointmenttypeId: [null],
//  customerId: [null],
//  appointmentDueDate: [null],
//  fromTime: [null],
//  toTime: [null],
//  // code: ['', Validators.required],
//})
//get appointmenttypeId() { return this.addForm.get('appointmenttypeId'); }
//get customerId() { return this.addForm.get('customerId'); }
//get appointmentDueDate() { return this.addForm.get('appointmentDueDate'); }
//get fromTime() { return this.addForm.get('fromTime'); }
//get toTime() { return this.addForm.get('toTime'); }


/***/ }),

/***/ "./src/app/views/opportunity/opportunityviewNew.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/views/opportunity/opportunityviewNew.component.ts ***!
  \*******************************************************************/
/*! exports provided: OpportunityViewNewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpportunityViewNewComponent", function() { return OpportunityViewNewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
/* harmony import */ var _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lead/leadlist.service */ "./src/app/views/lead/leadlist.service.ts");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _calendar_makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../calendar/makeappointment/makeappointment.component */ "./src/app/views/calendar/makeappointment/makeappointment.component.ts");
/* harmony import */ var _sendtoloanhomimodelpopup_sendtoloanhomimodelpopup_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component */ "./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.ts");
/* harmony import */ var _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../pipes/datetime.pipe */ "./src/app/pipes/datetime.pipe.ts");
/* harmony import */ var _shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../shared/stagemanagement/stagemanagement.component */ "./src/app/views/shared/stagemanagement/stagemanagement.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};














var OpportunityViewNewComponent = /** @class */ (function () {
    function OpportunityViewNewComponent(dialogService, opprtunityservice, commonService, fb, router, toaster, leadservice, route, compp, location) {
        var _this_1 = this;
        this.dialogService = dialogService;
        this.opprtunityservice = opprtunityservice;
        this.commonService = commonService;
        this.fb = fb;
        this.router = router;
        this.toaster = toaster;
        this.leadservice = leadservice;
        this.route = route;
        this.compp = compp;
        this.location = location;
        this.requestDesign = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["RequestDesign"]();
        this.moduleName = 'crm';
        this.submoduleName = 'opportunity';
        this.formControlList = [];
        this.loadSave = false;
        this.displayType = 'VIEW';
        this.topValue = '';
        this.OpportunityName = '';
        this.contactCount = 0;
        this.lstContacts = {
            pager: {},
            data: []
        };
        this.sortDir = 'desc';
        this.ownerId = '';
        this.sortColumn = 'createdon';
        this.ContactPageNo = 1;
        this.pageSize = 4;
        this.contactpagedData = {
            pager: {},
            data: []
        };
        this.lstProducts = {
            pager: {},
            data: []
        };
        this.ProductsPageNo = 1;
        this.productCount = 0;
        this.workOrderCount = 0;
        this.lstWorkOrders = {
            pager: {},
            data: []
        };
        this.WorkOrderPageNo = 1;
        this.ContractCount = 0;
        this.lstContract = {
            pager: {},
            data: []
        };
        this.ContractPageNo = 1;
        // desmodel: designmodel = new designmodel();
        this.AccountsCount = 0;
        this.lstAccounts = {
            pager: {},
            data: []
        };
        this.AccountPageNo = 1;
        this.lstProposals = {
            pager: {},
            data: []
        };
        this.proposalCount = 0;
        this.proposalPageNo = 1;
        this.selectedAction = 0;
        this.isredesign = false;
        this.isHide = true;
        this.solgenpower = false;
        this.Utility_Proposal_Design_Information_DataModel = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["Utility_Proposal_Design_Information_DataModel"]();
        this.searchText = '';
        this.len = 10;
        this.requesttitle = '';
        this.siteurl = '';
        this.ddlStateList = [];
        this.ddlCountryList = [];
        this.checkboxdata1 = [];
        this.checkboxdataTop = [];
        this.addRequestDesignForm = this.fb.group({
            //startDate: [null, [Validators.required]],
            requestDate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            //fromTime: [null, Validators.required],
            designNotes: [''],
            adderNotes: [''],
            redisgnReason: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]
        });
        this.commonService.getLoggedInName.subscribe(function (userdetail) {
            _this_1.loginuserid = userdetail.id;
            _this_1.companyType = userdetail.companyType;
            if (_this_1.companyType == "companytypeSolarInstall") {
                _this_1.solgenpower = true;
            }
        });
        //this.router.routeReuseStrategy.shouldReuseRoute = function () {
        //  return false;
        //};
        this.timeFormat = this.commonService.getTimeFormat();
    }
    OpportunityViewNewComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.siteurl = window.location.origin;
        console.log('siteurl', this.siteurl);
        this.submoduleid = 11;
        this.objectname = 'opportunity';
        localStorage.removeItem('opid');
        this.loadSave = true;
        this.route.paramMap.subscribe(function (params) {
            var id = params.get('id');
            _this_1.Id = id;
            _this_1.opid = id;
            localStorage.setItem('opid', _this_1.opid);
        });
        this.pageSizeValueContact = 4;
        this.GetCustomFieldsList();
        this.getPageSizes();
        this.getContactList();
        this.getRelatedTab();
        this.initForm();
    };
    OpportunityViewNewComponent.prototype.getRelatedTab = function () {
        this.refreshProductsList();
        this.refreshWorkOrdersList();
        this.refreshContractList();
        this.refreshAccountsList();
        this.refreshProposalsList();
    };
    OpportunityViewNewComponent.prototype.contactmsg = function (e) {
        this.getContactList();
        this.closeContact();
    };
    OpportunityViewNewComponent.prototype.close = function () {
        this.router.navigateByUrl("/opportunity");
    };
    OpportunityViewNewComponent.prototype.getRedsignReason = function () {
        var _this_1 = this;
        this.commonService.getMasterItemsList("ProposalRedesignReason").subscribe(function (result) {
            _this_1.requestredesignList = _this_1.commonService.masters;
            console.log('requestredesignList', _this_1.requestredesignList);
        });
    };
    OpportunityViewNewComponent.prototype.GetCustomFieldsList = function () {
        var _this_1 = this;
        this.GetCustomFieldsListTopRow();
        this.formControlList = [];
        this.displayType = 'VIEW';
        this.opprtunityservice.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this_1.customCompnentValues = _this_1.opprtunityservice.customFieldsList.data;
                //console.log('sdsdadsd', this.customCompnentValues);
                _this_1.customCompnentValues.forEach(function (t) {
                    var groupCheck = _this_1.formControlList.filter(function (y) { return y.group_id == t.group_id; });
                    if (t.dt_code == 'checkbox') {
                        var checkdata = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["CheckboxData"]();
                        checkdata.controlname = t.ColumnName;
                        _this_1.checkboxdata1.push(checkdata);
                    }
                    if (groupCheck == null || groupCheck.length == 0) {
                        var obj = {
                            group_id: t.group_id,
                            group_name: t.group_name,
                            group_display_name: t.group_display_name,
                            InnerData: _this_1.customCompnentValues.filter(function (x) { return x.group_id == t.group_id; })
                        };
                        _this_1.formControlList.push(obj);
                    }
                });
                var group_1 = {};
                _this_1.customCompnentValues.forEach(function (cnt) {
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this_1.checkboxdata1.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this_1.checkboxdata1.forEach(function (item) {
                                _this_1.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    //if (cnt.dt_code == 'select') {
                    //  var i = 0;
                    //  if (cnt.value != '' && cnt.select_options != null) {
                    //    cnt.select_options.forEach(itemList => {
                    //      if (itemList.value == cnt.value) {
                    //        cnt.value = itemList.name;
                    //        i++;
                    //      }
                    //    });
                    //  }
                    //  if (i == 0) {
                    //    cnt.value = '';
                    //  }
                    //}
                    if (cnt.ColumnName == 'OpportunityName') {
                        _this_1.OpportunityName = cnt.value;
                    }
                    if (cnt.ColumnName == 'AccountId') {
                        debugger;
                        _this_1.topValue = cnt.value;
                        _this_1.opprAccountId = cnt.ref_value;
                    }
                    if (cnt.ColumnName == 'OwnerId') {
                        debugger;
                        _this_1.ownerId = cnt.ref_value;
                    }
                    group_1[cnt.form_controlName] = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](val, [cnt.is_required == true ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required : _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator,
                        cnt.actual_data_type == "int" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                            cnt.actual_data_type == "bigint" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]{1,9}") :
                                cnt.actual_data_type == "decimal" ? _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].pattern("[0-9]+(\.[0-9][0-9]?)?") :
                                    _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator
                    ]);
                });
                _this_1.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroup"](group_1);
                _this_1.loadSave = false;
            }
        });
    };
    OpportunityViewNewComponent.prototype.GetCustomFieldsListTopRow = function () {
        var _this_1 = this;
        debugger;
        this.displayType = 'VIEW_TOP';
        this.opprtunityservice.GetCustomFieldsList(this.moduleName, this.submoduleName, this.companyId, this.Id, this.displayType).subscribe(function (result) {
            if (result) {
                _this_1.customCompnentValuesTop = _this_1.opprtunityservice.customFieldsList.data;
                //console.log("thisEditData1", this.customCompnentValuesTop);
                _this_1.customCompnentValuesTop.forEach(function (cnt) {
                    //console.log("cntcnt", cnt);
                    var val = null;
                    if (cnt.actual_data_type == 'bit') {
                        val = cnt.value == 1 ? true : false;
                    }
                    else {
                        val = (cnt.value == '' ? null : cnt.value);
                    }
                    _this_1.checkboxdataTop.forEach(function (item) { if (cnt.form_controlName == item.controlname) {
                        item.controlvalues = cnt.value;
                    } }); //for checkboxes on form
                    if (cnt.actual_data_type == 'checkbox') {
                        try {
                            _this_1.checkboxdataTop.forEach(function (item) {
                                _this_1.form.get(item.controlname).setValue(item.controlvalues.split(','));
                            });
                        }
                        catch (err) { }
                    }
                    //if (cnt.dt_code == 'select') {
                    //  if (cnt.value != '' && cnt.select_options != null) {
                    //    cnt.select_options.forEach(itemList => {
                    //      if (itemList.value == cnt.value) {
                    //        cnt.value = itemList.name;
                    //      }
                    //    });
                    //  }
                    //}       
                    if (cnt.ColumnName == 'AccountId') {
                        _this_1.topValue = cnt.value;
                        _this_1.opprAccountId = cnt.ref_value;
                    }
                    if (cnt.ColumnName == 'OwnerId') {
                        _this_1.ownerId = cnt.ref_value;
                    }
                });
                _this_1.loadSave = false;
            }
        });
    };
    OpportunityViewNewComponent.prototype.getPageSizes = function () {
        var _this_1 = this;
        this.commonService.getMasterItemsList("PageSize").subscribe(function (res) {
            _this_1.lstPageSizeContact = _this_1.commonService.masters;
        });
    };
    //======================================== SEND TO LOANHOMI ===========================================
    OpportunityViewNewComponent.prototype.openSendToLoanHomi = function (e) {
        //console.log("sdasdasdasd", e);
        this.SendToLoanHomiModel.show12(e);
    };
    //=====================================================================================================
    //====================================== Get ContactsLists ============================================
    OpportunityViewNewComponent.prototype.AddContact = function () {
        //this.router.navigate(['../contactlist/addContact/opportunity', this.opid]);
        this.addContact.show();
        //this.contactcomponent.show(this.opid, 0);
    };
    OpportunityViewNewComponent.prototype.closeContact = function () {
        this.addContact.hide();
    };
    OpportunityViewNewComponent.prototype.getContactList = function () {
        var _this_1 = this;
        this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize, this.loginuserid).subscribe(function (response) {
            _this_1.contactpagedData = _this_1.leadservice.pagedData;
            _this_1.contactCount = _this_1.contactpagedData.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setPageContact = function ($event) {
        var _this_1 = this;
        this.leadservice.getContactList(this.opid, this.submoduleid, this.objectname, this.sortColumn, this.sortDir, this.lstPageSizeContact, this.pageSizeValue, this.loginuserid).subscribe(function (response) {
            _this_1.contactpagedData = _this_1.leadservice.pagedData;
        });
    };
    OpportunityViewNewComponent.prototype.DeleteContact = function (Id, name) {
        var _this_1 = this;
        var message = "Are you sure you want to delete Contact \"" + name + "\"?";
        this.dialogService.confirm('Delete Contact', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this_1.leadservice.DeleteContact(Id, _this_1.opid, _this_1.submoduleid, _this_1.objectname).subscribe(function (r) {
                    _this_1.toaster.success("Contact has been deleted successfully.");
                    _this_1.getContactList();
                }, function (error) {
                });
            }
        });
    };
    //GetOpportunityContactsLists() {
    // 
    //  this.opprtunityservice.GetOpportunityContactsLists(this.opportunityId, this.sortColumn, this.sortDir, this.ContactPageNo, this.pageSize).subscribe(resp => {
    //    this.lstContacts = resp;
    //    this.contactCount = resp.pager.totalItems;
    //  });
    //}
    //setOpportunityContactPageNo($event) {
    //  this.ContactPageNo = $event.page;
    //  this.GetOpportunityContactsLists();
    //}
    //onOpportunityContactSort($event) {
    //  const sort = $event.sorts[0]
    //  this.sortDir = sort.dir;
    //  this.sortColumn = $event.column.prop;
    //  this.GetOpportunityContactsLists();
    //}
    //=============================================================================================================================
    //=================================================  Product ==================================================================
    OpportunityViewNewComponent.prototype.refreshProductsList = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOpprtunityProductsList(this.opid, this.sortColumn, this.sortDir, this.ProductsPageNo, this.pageSize).subscribe(function (resp) {
            _this_1.lstProducts = resp;
            _this_1.productCount = resp.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setProductsPageNo = function ($event) {
        this.ProductsPageNo = $event.page;
        // this.refreshProductsList();
    };
    OpportunityViewNewComponent.prototype.onProductsSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        //this.refreshProductsList();
    };
    //==============================================================================================================================
    //==================================================== WorkOrders ==============================================================
    OpportunityViewNewComponent.prototype.refreshWorkOrdersList = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOpprtunityWorkOrderList(this.opid, this.sortColumn, this.sortDir, this.WorkOrderPageNo, this.pageSize).subscribe(function (resp) {
            _this_1.lstWorkOrders = resp;
            _this_1.workOrderCount = resp.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setWorkorderPageNo = function ($event) {
        this.WorkOrderPageNo = $event.page;
        this.refreshWorkOrdersList();
    };
    OpportunityViewNewComponent.prototype.onWorkOrdersSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshWorkOrdersList();
    };
    //==============================================================================================================================
    //==================================================== Contract ==============================================================
    OpportunityViewNewComponent.prototype.refreshContractList = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOpprtunityContractList(this.opid, this.sortColumn, this.sortDir, this.ContractPageNo, this.pageSize).subscribe(function (resp) {
            _this_1.lstContract = resp;
            _this_1.ContractCount = resp.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setContractPageNo = function ($event) {
        this.ContractPageNo = $event.page;
        this.refreshContractList();
    };
    OpportunityViewNewComponent.prototype.onContractSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshContractList();
    };
    //================================================================================================================================
    //====================================================== Accounts ================================================================
    OpportunityViewNewComponent.prototype.refreshAccountsList = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOpprtunityAccountsList(this.opid, this.sortColumn, this.sortDir, this.AccountPageNo, this.pageSize).subscribe(function (resp) {
            _this_1.lstAccounts = resp;
            console.log("this.lstAccounts", _this_1.lstAccounts);
            _this_1.AccountsCount = resp.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setAccountPageNo = function ($event) {
        this.AccountPageNo = $event.page;
        this.refreshAccountsList();
    };
    OpportunityViewNewComponent.prototype.onAccountSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshAccountsList();
    };
    //================================================================================================================================
    //====================================================== Proposals ================================================================
    OpportunityViewNewComponent.prototype.refreshProposalsList = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOpprtunityProposalsList(this.opid, this.sortColumn, this.sortDir, this.proposalPageNo, this.pageSize).subscribe(function (resp) {
            _this_1.lstProposals = resp;
            _this_1.proposalCount = resp.pager.totalItems;
        });
    };
    OpportunityViewNewComponent.prototype.setProposalPageNo = function ($event) {
        this.proposalPageNo = $event.page;
        this.refreshProposalsList();
    };
    OpportunityViewNewComponent.prototype.onProposalSort = function ($event) {
        var sort = $event.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = $event.column.prop;
        this.refreshProposalsList();
    };
    OpportunityViewNewComponent.prototype.GetUtilityCompanyDll = function (id) {
        var _this_1 = this;
        if (id === void 0) { id = 0; }
        this.opprtunityservice.GetUtilityCompanyDll(id, '0', this.searchText).subscribe(function (data) {
            _this_1.utilityCompanyList = data;
        });
    };
    OpportunityViewNewComponent.prototype.initForm = function () {
        this.edit_Utility_Proposal_Design_InformationForm = this.fb.group({
            'Utility_Proposal_Id': [null],
            'Utility_Company': [null, null],
            'Utility_Account_Number': [null, null],
            'Utility_Meter_Number': [null, null],
            'Annual_kwh_Usage': [null, null],
            'Last_Utility_bill_URL': [null, null],
            'Home_Sqft': [null, null],
            'Sales_Tax_Rate': [null, null],
            'FTC_Not_Eligible': [null, null],
            'Billing_City': [null, null],
            'Billing_Street': [null, null],
            'Billing_State': [null, null],
            'Billing_Country': [null, null],
            'Billing_Postal_Code': [null, null],
            'Full_Utility_Bill': [null, null],
            'No_Utility_Account_or_Meter_Number': [null, null]
        });
    };
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Utility_Proposal_Id", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Proposal_Id'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Utility_Company", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Company'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Utility_Account_Number", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Account_Number'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Utility_Meter_Number", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Utility_Meter_Number'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Annual_kwh_Usage", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Annual_kwh_Usage'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Last_Utility_bill_URL", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Last_Utility_bill_URL'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Home_Sqft", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Home_Sqft'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Sales_Tax_Rate", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Sales_Tax_Rate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "FTC_Not_Eligible", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('FTC_Not_Eligible'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Billing_City", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_City'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Billing_Street", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Street'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Billing_State", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_State'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Billing_Country", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Billing_Postal_Code", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Billing_Postal_Code'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "Full_Utility_Bill", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('Full_Utility_Bill'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "No_Utility_Account_or_Meter_Number", {
        get: function () { return this.edit_Utility_Proposal_Design_InformationForm.get('No_Utility_Account_or_Meter_Number'); },
        enumerable: true,
        configurable: true
    });
    OpportunityViewNewComponent.prototype.Edit_Utility_Account = function (row) {
        this.loadSave = true;
        //console.log("aaaaaaaaaaa", row);
        this.title = "Edit Utility & Proposal Design Information";
        var utilityCompanyId = (row.UtilityCompanyId == null) ? '' : row.UtilityCompanyId.toString();
        this.GetUtilityCompanyDll(utilityCompanyId);
        this.GetDDLState();
        this.GetDDLCountry();
        this.Utility_Proposal_Id.setValue(row.Id);
        this.Utility_Company.setValue((utilityCompanyId != "") ? utilityCompanyId : null);
        this.Utility_Account_Number.setValue(row.Utility_Account_Number);
        this.Utility_Meter_Number.setValue(row.Utility_Meter_Number);
        this.Annual_kwh_Usage.setValue(row.Estimated_Annual_Kwh_Usage);
        this.Last_Utility_bill_URL.setValue(row.Last_Utility_Bill_URL);
        this.Home_Sqft.setValue(row.Home_Sq_Ft);
        this.Sales_Tax_Rate.setValue(row.Tax_Rate);
        this.FTC_Not_Eligible.setValue(row.FTC_Not_Eligible);
        this.Billing_City.setValue(row.BillingCity);
        this.Billing_Street.setValue(row.BillingStreet);
        this.Billing_State.setValue(row.BillingState);
        this.Billing_Country.setValue(row.BillingCountry);
        this.Billing_Postal_Code.setValue(row.BillingPostalCode);
        this.Full_Utility_Bill.setValue(row.Full_Utility_Bill);
        this.No_Utility_Account_or_Meter_Number.setValue(row.No_Utility_Account_or_Meter_Number);
        //this.edit_Utility_Proposal_Design_InformationForm.patchValue({
        //  Utility_Proposal_Id: row.Id,
        //  Utility_Company: row.UtilityCompanyId == null?null: row.UtilityCompanyId.toString(),
        //  Utility_Account_Number: row.Utility_Account_Number,
        //  Utility_Meter_Number: row.Utility_Meter_Number,
        //  No_Utility_Account_or_Meter_Number: row.No_Utility_Account_or_Meter_Number,
        //}); 
        this.edit_Utility_Proposal_Design_InformationPopupModel.show();
        this.loadSave = false;
    };
    OpportunityViewNewComponent.prototype.SaveUtility_Proposal_Design_Information = function () {
        var _this_1 = this;
        this.loadSave = true;
        this.Utility_Proposal_Design_Information_DataModel.Utility_Proposal_Id = this.Utility_Proposal_Id.value;
        this.Utility_Proposal_Design_Information_DataModel.utility_Company = this.Utility_Company.value;
        this.Utility_Proposal_Design_Information_DataModel.utility_Account_Number = this.Utility_Account_Number.value;
        this.Utility_Proposal_Design_Information_DataModel.utility_Meter_Number = this.Utility_Meter_Number.value;
        this.Utility_Proposal_Design_Information_DataModel.Annual_kwh_Usage = this.Annual_kwh_Usage.value;
        this.Utility_Proposal_Design_Information_DataModel.Last_Utility_bill_URL = this.Last_Utility_bill_URL.value;
        this.Utility_Proposal_Design_Information_DataModel.Home_Sqft = this.Home_Sqft.value;
        this.Utility_Proposal_Design_Information_DataModel.Sales_Tax_Rate = this.Sales_Tax_Rate.value;
        this.Utility_Proposal_Design_Information_DataModel.FTC_Not_Eligible = this.FTC_Not_Eligible.value;
        this.Utility_Proposal_Design_Information_DataModel.Billing_City = this.Billing_City.value;
        this.Utility_Proposal_Design_Information_DataModel.Billing_Street = this.Billing_Street.value;
        this.Utility_Proposal_Design_Information_DataModel.Billing_State = this.Billing_State.value;
        this.Utility_Proposal_Design_Information_DataModel.Billing_Country = this.Billing_Country.value;
        this.Utility_Proposal_Design_Information_DataModel.Billing_PostalCode = this.Billing_Postal_Code.value;
        this.Utility_Proposal_Design_Information_DataModel.Full_Utility_Bill = this.Full_Utility_Bill.value;
        this.Utility_Proposal_Design_Information_DataModel.No_Utility_Account_or_Meter_Number = this.No_Utility_Account_or_Meter_Number.value;
        this.opprtunityservice.SaveUtility_Proposal_Design_Information(this.Utility_Proposal_Design_Information_DataModel).subscribe(function (result) {
            if (result.statusCode == 200) {
                _this_1.loadSave = false;
                _this_1.toaster.success(result.responseMessage);
                _this_1.edit_Utility_Proposal_Design_InformationForm.reset();
                // this.refresh();
                //this.currentPageAssignedRes = 1;
                _this_1.refreshAccountsList();
                _this_1.edit_Utility_Proposal_Design_InformationPopupModel.hide();
            }
            else {
                _this_1.loadSave = false;
                _this_1.toaster.error(result.responseMessage);
                //this.currentPageAssignedRes = 1;
                _this_1.refreshAccountsList();
            }
        }, function (error) {
            _this_1.loadSave = false;
        });
    };
    OpportunityViewNewComponent.prototype.closeUtility_Proposal_Design_InformationPopup = function () {
        this.edit_Utility_Proposal_Design_InformationPopupModel.hide();
    };
    OpportunityViewNewComponent.prototype.onScrollToEndUtilityCompany = function (dataList) {
        this.fetchMoreUtilityCompany(dataList);
    };
    OpportunityViewNewComponent.prototype.fetchMoreUtilityCompany = function (dataList) {
        var _this_1 = this;
        if (this.searchText == undefined) {
            this.searchText = '';
        }
        this.len = dataList.length;
        this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe(function (data) {
            _this_1.utilityCompanyList = _this_1.utilityCompanyList.concat(data);
        });
    };
    OpportunityViewNewComponent.prototype.onKeyUtilityCompany = function (e, dataList) {
        var _this_1 = this;
        this.len = 0;
        this.searchText = e.target.value;
        this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe(function (data) {
            _this_1.utilityCompanyList = data;
        });
    };
    OpportunityViewNewComponent.prototype.onClearLangUtilityCompany = function (dataList) {
        var _this_1 = this;
        this.len = 0;
        this.searchText = '';
        this.opprtunityservice.GetUtilityCompanyDll('', this.len, this.searchText).subscribe(function (data) {
            _this_1.utilityCompanyList = data;
        });
    };
    //================================================================================================================================
    OpportunityViewNewComponent.prototype.addItem = function (newItem) {
        debugger;
        if (newItem) {
            this.GetCustomFieldsList();
            this.getContactList();
        }
    };
    //requestDesign() {
    //  this.Design.show();
    //}
    //closedesign() {
    //  this.Design.hide();   
    //}
    //oppDesignForm = this.fb.group({
    //  designOpportunityId: [null, Validators.nullValidator],
    //  designdate: ['', Validators.required],
    //  designTime: [null, Validators.nullValidator],
    //  designNotes: [null, Validators.nullValidator],
    //  adderNotes: [null, Validators.nullValidator]
    //});
    //get designOpportunityId() { return this.oppDesignForm.get('designOpportunityId'); }
    //get designTime() { return this.oppDesignForm.get('designTime'); }
    //get designdate() { return this.oppDesignForm.get('designdate'); }
    //get designNotes() { return this.oppDesignForm.get('designNotes'); }
    //get adderNotes() { return this.oppDesignForm.get('adderNotes'); }
    //submitdata() {
    //  if (this.oppDesignForm.valid) {
    //    this.desmodel.designOpportunityId = this.opid;
    //    this.desmodel.designNotes = this.oppDesignForm.value.description;
    //    let dtdate = new Date(this.oppDesignForm.value.designdate);
    //    this.desmodel.designdate = dtdate.toDateString();
    //    this.desmodel.designTime = this.oppDesignForm.value.designTime;
    //    this.fTime = new Date(this.desmodel.designTime);
    //    this.desmodel.designTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
    //    this.opprtunityservice.addDesignRequest(this.desmodel).subscribe((result: any) => {
    //      if (result.statusCode == 200) {
    //        this.toaster.success(result.responseMessage);
    //        this.router.navigate(["/calendar"]);
    //        //this.hideEvent.emit('abc');
    //        //this.addForm.reset();
    //        this.Design.hide();
    //      }
    //      else {
    //        //this.loadSave = false;
    //        this.toaster.error(result.responseMessage);
    //      }
    //    }, error => {
    //      //this.loadSave = false;
    //    });
    //  }
    //  else {
    //    this.commonService.validateAllFormFields(this.addForm);
    //  }
    //}
    OpportunityViewNewComponent.prototype.closerequestdesign = function () {
        this.requestdesignModal.hide();
        this.selectedAction = "0";
    };
    OpportunityViewNewComponent.prototype.convertUTCDateToLocalDate = function (date) {
        var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        var offset = date.getTimezoneOffset() / 60;
        var hours = date.getHours();
        newDate.setHours(hours - offset);
        return newDate;
    };
    OpportunityViewNewComponent.prototype.SaveRequestDesign = function () {
        var _this_1 = this;
        console.log('this.addForm', this.addRequestDesignForm.value);
        //requestDesign
        //debugger;
        var convertdatetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_11__["DateTimeToLocalForAddEditPipe"]();
        if (this.requesttitle == 'REQUEST DESIGN') {
            this.addRequestDesignForm.get('redisgnReason').setValidators(null);
            this.addRequestDesignForm.get('redisgnReason').setErrors(null);
        }
        if (this.addRequestDesignForm.valid) {
            //debugger;
            this.requestDesign.RequestDate = (this.addRequestDesignForm.value.requestDate == '' ? null : this.commonService.getUserSelectedZoneToUTC(this.addRequestDesignForm.value.requestDate));
            //this.requestDesign.RequestDate = (this.addRequestDesignForm.value.requestDate == '' ? null : convertdatetime.transform(this.addRequestDesignForm.value.requestDate, null))
            //this.requestDesign.RequestDate = this.addRequestDesignForm.value.requestDate;
            this.requestDesign.designNotes = this.addRequestDesignForm.value.designNotes;
            this.requestDesign.adderNotes = this.addRequestDesignForm.value.adderNotes;
            //let dtdate = new Date(this.addRequestDesignForm.value.requestDate);
            //this.requestDesign.RequestDate = dtdate.toDateString();
            this.requestDesign.FromTime = this.addRequestDesignForm.value.requestDate;
            this.fTime = new Date(this.requestDesign.FromTime);
            this.requestDesign.FromTime = this.fTime.getHours() + ":" + this.fTime.getMinutes();
            // this.appmodel.ToTime = this.Tdate.getHours() + ":" + this.Tdate.getMinutes();
            this.requestDesign.OpportunityId = this.opid;
            this.requestDesign.redisgnReason = this.addRequestDesignForm.value.redisgnReason;
            this.requestDesign.isredisgn = this.isredesign;
            console.log('this.appmodel', this.requestDesign);
            //debugger;
            this.opprtunityservice.SaveRequestDesignOpportunity(this.requestDesign).subscribe(function (result) {
                if (result.statusCode == 200) {
                    _this_1.toaster.success(result.responseMessage);
                    _this_1.addRequestDesignForm.reset();
                    _this_1.requestdesignModal.hide();
                    _this_1.selectedAction = "0";
                    _this_1.GetCustomFieldsList();
                    //this.compp.refreshData(this.opid,'opportunity');
                    _this_1.stageManagement.refreshData(_this_1.opid, 'opportunity');
                }
                else {
                    //this.loadSave = false;
                    _this_1.toaster.error(result.responseMessage);
                }
            }, function (error) {
                //this.loadSave = false;
            });
        }
        else {
            this.commonService.validateAllFormFields(this.addRequestDesignForm);
        }
    };
    OpportunityViewNewComponent.prototype.showrequestdesignpopup = function () {
        var _this_1 = this;
        this.opprtunityservice.GetOppDataById(this.opid).subscribe(function (resp) {
            _this_1.opportunityData = resp;
            console.log("opportunityData", _this_1.opportunityData);
            if (_this_1.opportunityData.Loan_Product == null || _this_1.opportunityData.Mounting_Location == null || _this_1.opportunityData.ShopHasElectricalSubPanel == null || _this_1.opportunityData.Roof_Type == null || _this_1.opportunityData.Roof_Material == null || _this_1.opportunityData.Re_Roof_Needed == null) {
                var message = "Please fill " + "''";
                if (_this_1.opportunityData.Loan_Product == null || _this_1.opportunityData.Loan_Product == "") {
                    message += "Loan Product, ";
                }
                if (_this_1.opportunityData.Mounting_Location == null || _this_1.opportunityData.Mounting_Location == "") {
                    message += "Mounting Location, ";
                }
                if (_this_1.opportunityData.ShopHasElectricalSubPanel == null || _this_1.opportunityData.ShopHasElectricalSubPanel == "") {
                    message += "Shop Has Electrical Sub Panel, ";
                }
                if (_this_1.opportunityData.Roof_Type == null || _this_1.opportunityData.Roof_Type == "") {
                    message += "Roof Type, ";
                }
                if (_this_1.opportunityData.Roof_Material == null || _this_1.opportunityData.Roof_Material == "") {
                    message += "Roof Material, ";
                }
                if (_this_1.opportunityData.Re_Roof_Needed == null || _this_1.opportunityData.Re_Roof_Needed == "") {
                    message += "Re-Roof Needed, ";
                }
                message = message.replace(/,\s*$/, "");
                if (message.split(',').length > 1) {
                    message = message.replace(/,(?=[^,]*$)/, ' and ');
                }
                message += "''" + " fields of this opportunity.";
                _this_1.toaster.error(message);
                _this_1.selectedAction = "0";
            }
            else {
                _this_1.requesttitle = 'REQUEST DESIGN';
                _this_1.isredesign = false;
                _this_1.addRequestDesignForm.reset();
                _this_1.addRequestDesignForm.get('redisgnReason').setValidators(null);
                _this_1.addRequestDesignForm.get('designNotes').setValidators(null);
                _this_1.addRequestDesignForm.updateValueAndValidity();
                _this_1.requestdesignModal.show();
                _this_1.GetRequestDesignOpportunity();
            }
        });
    };
    OpportunityViewNewComponent.prototype.showRerequestdesignpopup = function () {
        var _this_1 = this;
        //debugger;
        this.opprtunityservice.GetOppDataById(this.opid).subscribe(function (resp) {
            _this_1.opportunityData = resp;
            console.log("opportunityData", _this_1.opportunityData);
            if (_this_1.opportunityData.Loan_Product == null || _this_1.opportunityData.Mounting_Location == null || _this_1.opportunityData.ShopHasElectricalSubPanel == null || _this_1.opportunityData.Roof_Type == null || _this_1.opportunityData.Roof_Material == null || _this_1.opportunityData.Re_Roof_Needed == null) {
                var message = "Please fill " + "''";
                if (_this_1.opportunityData.Loan_Product == null || _this_1.opportunityData.Loan_Product == "") {
                    message += "Loan Product, ";
                }
                if (_this_1.opportunityData.Mounting_Location == null || _this_1.opportunityData.Mounting_Location == "") {
                    message += "Mounting Location, ";
                }
                if (_this_1.opportunityData.ShopHasElectricalSubPanel == null || _this_1.opportunityData.ShopHasElectricalSubPanel == "") {
                    message += "Shop Has Electrical Sub Panel, ";
                }
                if (_this_1.opportunityData.Roof_Type == null || _this_1.opportunityData.Roof_Type == "") {
                    message += "Roof Type, ";
                }
                if (_this_1.opportunityData.Roof_Material == null || _this_1.opportunityData.Roof_Material == "") {
                    message += "Roof Material, ";
                }
                if (_this_1.opportunityData.Re_Roof_Needed == null || _this_1.opportunityData.Re_Roof_Needed == "") {
                    message += "Re-Roof Needed, ";
                }
                message = message.replace(/,\s*$/, "");
                if (message.split(',').length > 1) {
                    message = message.replace(/,(?=[^,]*$)/, ' and ');
                }
                message += "''" + " fields of this opportunity.";
                _this_1.toaster.error(message);
                _this_1.selectedAction = "0";
            }
            else {
                _this_1.isredesign = true;
                _this_1.requesttitle = 'REQUEST REDESIGN';
                _this_1.addRequestDesignForm.reset();
                _this_1.addRequestDesignForm.get('redisgnReason').setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
                _this_1.addRequestDesignForm.get('designNotes').setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required);
                _this_1.addRequestDesignForm.updateValueAndValidity();
                _this_1.getRedsignReason();
                _this_1.requestdesignModal.show();
                _this_1.GetRequestDesignOpportunity();
            }
        });
    };
    OpportunityViewNewComponent.prototype.ddlOpportunity = function (value) {
        var ths = this;
        if (value == "1") {
            this.makeAppointment();
        }
        else if (value == "2") {
            this.sendAutomaticContract();
        }
        else if (value == "3") {
            this.showrequestdesignpopup();
        }
        else if (value == "4") {
            this.showRerequestdesignpopup();
        }
    };
    OpportunityViewNewComponent.prototype.GetDDLState = function () {
        var _this_1 = this;
        this.commonService.GetDDLListByFieldCode('State', this.moduleName, this.submoduleName).then(function (resp) {
            if (resp) {
                _this_1.ddlStateList = JSON.parse(resp.toString());
            }
        }).catch(function (err) { console.log(err); });
    };
    OpportunityViewNewComponent.prototype.GetDDLCountry = function () {
        var _this_1 = this;
        this.commonService.GetDDLListByFieldCode('Country', this.moduleName, this.submoduleName).then(function (resp) {
            if (resp) {
                _this_1.ddlCountryList = JSON.parse(resp.toString());
            }
        }).catch(function (err) { console.log(err); });
    };
    OpportunityViewNewComponent.prototype.childEvent = function () {
        this.selectedAction = "0";
    };
    OpportunityViewNewComponent.prototype.GetRequestDesignOpportunity = function () {
        var _this_1 = this;
        this.opprtunityservice.GetRequestDesignOpportunity(this.opid).subscribe(function (result) {
            console.log('dataresult', result);
            //debugger;
            //let fromtime = new Date(result.requestDate);
            var sDate = new Date(result.requestDate);
            //debugger;
            if (result.requestDate != '0001-01-01T00:00:00') {
                //debugger;
                var convertdatetime = new _pipes_datetime_pipe__WEBPACK_IMPORTED_MODULE_11__["DateTimeToLocalForAddEditPipe"]();
                _this_1.addRequestDesignForm.patchValue({
                    //requestDate: (result.requestDate == '' ? null : this.commonService.getUserSelectedZoneToUTC(sDate)),
                    requestDate: (result.requestDate == '' ? null : convertdatetime.transform(result.requestDate, null)),
                    adderNotes: result.adderNotes,
                    designNotes: result.designNotes,
                    //requestDate: fromtime,
                    //fromTime: fromtime,
                    redisgnReason: result.redisgnReason
                });
            }
            else {
                //debugger;
                var today = new Date();
                _this_1.date1 = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear();
                console.log('date1', _this_1.date1);
                _this_1.fTime = new Date();
                _this_1.fTime.getHours() + ":" + _this_1.fTime.getMinutes();
                _this_1.addRequestDesignForm.patchValue({
                    requestDate: null,
                });
            }
        });
    };
    Object.defineProperty(OpportunityViewNewComponent.prototype, "requestDate", {
        get: function () { return this.addRequestDesignForm.get('requestDate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "fromTime", {
        get: function () { return this.addRequestDesignForm.get('fromTime'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "designNotes", {
        get: function () { return this.addRequestDesignForm.get('designNotes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "adderNotes", {
        get: function () { return this.addRequestDesignForm.get('adderNotes'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OpportunityViewNewComponent.prototype, "redisgnReason", {
        get: function () { return this.addRequestDesignForm.get('redisgnReason'); },
        enumerable: true,
        configurable: true
    });
    OpportunityViewNewComponent.prototype.makeAppointment = function () {
        this.makeappointment.showComponent('Opportunity');
    };
    OpportunityViewNewComponent.prototype.onSort = function (e) {
        var sort = e.sorts[0];
        this.sortDir = sort.dir;
        this.sortColumn = e.column.prop;
        this.getContactList();
    };
    OpportunityViewNewComponent.prototype.changeToValue = function (e) {
    };
    OpportunityViewNewComponent.prototype.sendAutomaticContract = function () {
        var _this = this;
        var message = "Are you sure you want to Send Automatic Contract?";
        this.dialogService.confirm('Send automatic Contract', message).subscribe(function (confirmed) {
            if (confirmed) {
                _this.opprtunityservice.SendAutomaticContract(_this.opid).subscribe(function (result) {
                    if (result.statusCode == 200) {
                        _this.toaster.success('Automatic Contract has been sent successfully');
                    }
                    if (result.statusCode == 201) {
                        _this.toaster.success(result.responseMessage);
                    }
                    else {
                        _this.toaster.error(result.responseMessage);
                    }
                    _this.selectedAction = "0";
                });
            }
            else {
                _this.selectedAction = "0";
            }
        });
    };
    OpportunityViewNewComponent.prototype.OnBackToListClick = function () {
        // this.close();
        this.router.navigateByUrl("/opportunity");
        //this.location.back();
    };
    OpportunityViewNewComponent.prototype.refreshPage = function (e) {
        this.loadSave = true;
        this.ngOnInit();
        // this.stageManagement.ngOnInit();
        this.compp.ngOnInit();
        this.loadSave = false;
    };
    OpportunityViewNewComponent.ctorParameters = function () { return [
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"] },
        { type: _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["OpportunityListService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"] },
        { type: _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"] },
        { type: _shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_12__["StagemanagementComponent"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('edit_Utility_Proposal_Design_InformationPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], OpportunityViewNewComponent.prototype, "edit_Utility_Proposal_Design_InformationPopupModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('requestdesign', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], OpportunityViewNewComponent.prototype, "requestdesignModal", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('makeappointment', { static: false }),
        __metadata("design:type", _calendar_makeappointment_makeappointment_component__WEBPACK_IMPORTED_MODULE_9__["MakeappointmentComponent"])
    ], OpportunityViewNewComponent.prototype, "makeappointment", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('addContact', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_8__["ModalDirective"])
    ], OpportunityViewNewComponent.prototype, "addContact", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openSendToLoanHomiPopup', { static: false }),
        __metadata("design:type", _sendtoloanhomimodelpopup_sendtoloanhomimodelpopup_component__WEBPACK_IMPORTED_MODULE_10__["SendtoloanhomimodelpopupComponent"])
    ], OpportunityViewNewComponent.prototype, "SendToLoanHomiModel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('stageManagement', { static: false }),
        __metadata("design:type", _shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_12__["StagemanagementComponent"])
    ], OpportunityViewNewComponent.prototype, "stageManagement", void 0);
    OpportunityViewNewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            providers: [_shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_12__["StagemanagementComponent"]],
            selector: 'app-opportunityviewNew',
            template: __importDefault(__webpack_require__(/*! raw-loader!./opportunityviewNew.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/opportunityviewNew.component.html")).default,
        }),
        __metadata("design:paramtypes", [_shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_6__["ConfirmationDialogService"],
            _opportunitylist_service__WEBPACK_IMPORTED_MODULE_5__["OpportunityListService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_4__["ToastrService"],
            _lead_leadlist_service__WEBPACK_IMPORTED_MODULE_7__["LeadlistService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"],
            _shared_stagemanagement_stagemanagement_component__WEBPACK_IMPORTED_MODULE_12__["StagemanagementComponent"],
            _angular_common__WEBPACK_IMPORTED_MODULE_13__["Location"]])
    ], OpportunityViewNewComponent);
    return OpportunityViewNewComponent;
}());



/***/ }),

/***/ "./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.ts":
/*!**************************************************************************************************!*\
  !*** ./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: SendtoloanhomimodelpopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendtoloanhomimodelpopupComponent", function() { return SendtoloanhomimodelpopupComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-bootstrap/modal */ "./node_modules/ngx-bootstrap/modal/fesm5/ngx-bootstrap-modal.js");
/* harmony import */ var _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../opportunitylist.service */ "./src/app/views/opportunity/opportunitylist.service.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/common.service */ "./src/app/views/shared/common.service.ts");
/* harmony import */ var _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../manageuser/addedituser.service */ "./src/app/views/manageuser/addedituser.service.ts");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm5/ngx-toastr.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../shared/confirmation-dialog/confirmation-dialog.service */ "./src/app/views/shared/confirmation-dialog/confirmation-dialog.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (undefined && undefined.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { "default": mod };
};










var SendtoloanhomimodelpopupComponent = /** @class */ (function () {
    function SendtoloanhomimodelpopupComponent(fb, toaster, commonService, userService, opprtunityservice, el, decimalPipe, dialogService) {
        this.fb = fb;
        this.toaster = toaster;
        this.commonService = commonService;
        this.userService = userService;
        this.opprtunityservice = opprtunityservice;
        this.el = el;
        this.decimalPipe = decimalPipe;
        this.dialogService = dialogService;
        //@Output() refreshEvent : new EventEmitter<string>();
        this.refreshEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        //@ViewChild('refreshOpportunityPage') refreshOpportunityPage: OpportunityViewNewComponent;
        this.sendToLoanHomiDataModel = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["sendToLoanHomiModel"]();
        this.jsonData = new _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["sendToLoanHomiModelJsonData"]();
        this.loadSave = false;
        //ShowPreviousEmployerDetails = false;
        this.ShowCo_App_PreviousEmployerDetails = false;
        this.totalOtherFreqIncome = 0;
        this.Co_App_totalOtherFreqIncome = 0;
        this.showAddSendTLoanHomiForm = true;
        this.showPreviewSendTLoanHomiForm = false;
        this.resultData = [];
        this.format = '2.0-2';
        this.result = null;
        this.showValidationIconOnPR = false;
        this.showValidationIconOnCo_PR = false;
        this.showValidationIconOn_coApp_income = false;
        this.showValidationIconOn_income = false;
    }
    SendtoloanhomimodelpopupComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.fillForm(id);
        this.initiForm();
        // this.isAutoPaymentcheckBox = true; 
        //this.GetOwnThePropertyDll();
        this.GetEmployementTypeDll();
        this.GetIncomeFrequencyDll();
        this.getCountryDropdownList();
        this.getState();
        this.previousEmployerName.disable();
        this.previousOccupation.disable();
        this.yearsAtPreviousEmployement.disable();
        this.monthsAtPreviousEmployement.disable();
        this.yearsAtPreviousResidence.disable();
        this.monthsatPreviousResidence.disable();
        this.PRcountry.disable();
        this.PRstate.disable();
        this.PRCity.disable();
        this.PRStreet.disable();
        this.PRPostalCode.disable();
        this.PHousingStatus.disable();
        this.coApp_yearsAtPreviousResidence.disable();
        this.coApp_monthsatPreviousResidence.disable();
        this.coApp_PRcountry.disable();
        this.coApp_PRstate.disable();
        this.coApp_PRCity.disable();
        this.coApp_PRStreet.disable();
        this.coApp_PRPostalCode.disable();
        this.CoPHousingStatus.disable();
        this.coApp_previousEmployerName.disable();
        this.coApp_previousOccupation.disable();
        this.coApp_yearsAtPreviousEmployement.disable();
        this.coApp_monthsAtPreviousEmployement.disable();
        this.coApp_income.disable();
        this.coApp_otherIncome.disable();
        this.income.disable();
        this.otherIncome.disable();
        //====================================================================
        this.monthsatCurrentResidence.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsatCurrentResidence.setValue(11);
            }
        });
        this.monthsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsAtCurrentEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtCurrentResidence.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtCurrentResidence.setValue(11);
            }
        });
        this.monthsAtPreviousEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsAtPreviousEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtCurrentEmployement.setValue(11);
            }
        });
        this.coApp_monthsAtPreviousEmployement.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.coApp_monthsAtPreviousEmployement.setValue(11);
            }
        });
        this.monthsatPreviousResidence.valueChanges.subscribe(function (m) {
            if (m > 11) {
                _this.monthsatPreviousResidence.setValue(11);
            }
        });
        //this.coApp_monthsatPreviousResidence.valueChanges.subscribe(m => {
        //  if (m > 11) {
        //    this.coApp_monthsatPreviousResidence.setValue(11);
        //  }
        //}); 
        this.noOfMortgages.valueChanges.subscribe(function (m) {
            if (m > 99) {
                _this.noOfMortgages.setValue(99);
            }
        });
        //==========Validation On Years at Current Residence Fields ================
        this.yearsAtCurrentResidence.valueChanges.subscribe(function (m) {
            debugger;
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.showValidationIconOnPR = true;
                _this.yearsAtPreviousResidence.enable();
                _this.monthsatPreviousResidence.enable();
                _this.PRcountry.enable();
                _this.PRstate.enable();
                _this.PRCity.enable();
                _this.PRStreet.enable();
                _this.PRPostalCode.enable();
                _this.PHousingStatus.enable();
                _this.yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.yearsAtPreviousResidence.updateValueAndValidity();
                _this.monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.monthsatPreviousResidence.updateValueAndValidity();
                _this.PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PRcountry.updateValueAndValidity();
                _this.PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PRstate.updateValueAndValidity();
                _this.PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PRCity.updateValueAndValidity();
                _this.PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PRStreet.updateValueAndValidity();
                _this.PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PRPostalCode.updateValueAndValidity();
                _this.PHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.PHousingStatus.updateValueAndValidity();
            }
            else {
                _this.showValidationIconOnPR = false;
                _this.yearsAtPreviousResidence.setValue(null);
                _this.monthsatPreviousResidence.setValue(null);
                _this.PRcountry.setValue(null);
                _this.PRstate.setValue(null);
                _this.PRCity.setValue(null);
                _this.PRStreet.setValue(null);
                _this.PRPostalCode.setValue(null);
                _this.PHousingStatus.setValue(null);
                _this.yearsAtPreviousResidence.disable();
                _this.monthsatPreviousResidence.disable();
                _this.PRcountry.disable();
                _this.PRstate.disable();
                _this.PRCity.disable();
                _this.PRStreet.disable();
                _this.PRPostalCode.disable();
                _this.yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.yearsAtPreviousResidence.updateValueAndValidity();
                _this.monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.monthsatPreviousResidence.updateValueAndValidity();
                _this.PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PRcountry.updateValueAndValidity();
                _this.PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PRstate.updateValueAndValidity();
                _this.PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PRCity.updateValueAndValidity();
                _this.PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PRStreet.updateValueAndValidity();
                _this.PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PRPostalCode.updateValueAndValidity();
                _this.PHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.PHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //==========Validation On CoApp Years at Current Residence Fields ================
        this.coApp_yearsAtCurrentResidence.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.showValidationIconOnCo_PR = true;
                _this.coApp_yearsAtPreviousResidence.enable();
                _this.coApp_monthsatPreviousResidence.enable();
                _this.coApp_PRcountry.enable();
                _this.coApp_PRstate.enable();
                _this.coApp_PRCity.enable();
                _this.coApp_PRStreet.enable();
                _this.coApp_PRPostalCode.enable();
                _this.CoPHousingStatus.enable();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
            else {
                _this.showValidationIconOnCo_PR = false;
                _this.coApp_yearsAtPreviousResidence.setValue(null);
                _this.coApp_monthsatPreviousResidence.setValue(null);
                _this.coApp_PRcountry.setValue(null);
                _this.coApp_PRstate.setValue(null);
                _this.coApp_PRCity.setValue(null);
                _this.coApp_PRStreet.setValue(null);
                _this.coApp_PRPostalCode.setValue(null);
                _this.CoPHousingStatus.setValue(null);
                _this.coApp_yearsAtPreviousResidence.disable();
                _this.coApp_monthsatPreviousResidence.disable();
                _this.coApp_PRcountry.disable();
                _this.coApp_PRstate.disable();
                _this.coApp_PRCity.disable();
                _this.coApp_PRStreet.disable();
                _this.coApp_PRPostalCode.disable();
                _this.CoPHousingStatus.disable();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //==========Validation On Years at Current Employement Fields ================
        this.yearsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                _this.sendToLoanHomiDataModel.IsOE = true;
                // this.ShowPreviousEmployerDetails = true;
                _this.previousEmployerName.enable();
                _this.previousOccupation.enable();
                _this.yearsAtPreviousEmployement.enable();
                _this.monthsAtPreviousEmployement.enable();
                _this.yearsAtPreviousResidence.enable();
                _this.monthsatPreviousResidence.enable();
                _this.PRcountry.enable();
                _this.PRstate.enable();
                _this.PRCity.enable();
                _this.PRStreet.enable();
                _this.PRPostalCode.enable();
                _this.PHousingStatus.enable();
                _this.previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.previousEmployerName.updateValueAndValidity();
                _this.previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.previousOccupation.updateValueAndValidity();
                _this.yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.yearsAtPreviousEmployement.updateValueAndValidity();
                _this.monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.monthsAtPreviousEmployement.updateValueAndValidity();
            }
            else {
                // this.ShowPreviousEmployerDetails = false;
                _this.sendToLoanHomiDataModel.IsOE = false;
                _this.previousEmployerName.disable();
                _this.previousOccupation.disable();
                _this.yearsAtPreviousEmployement.disable();
                _this.monthsAtPreviousEmployement.disable();
                _this.previousEmployerName.setValue(null);
                _this.previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.previousEmployerName.updateValueAndValidity();
                _this.previousOccupation.setValue(null);
                _this.previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.previousOccupation.updateValueAndValidity();
                _this.yearsAtPreviousEmployement.setValue(null);
                _this.yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.yearsAtPreviousEmployement.updateValueAndValidity();
                _this.monthsAtPreviousEmployement.setValue(null);
                _this.monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.monthsAtPreviousEmployement.updateValueAndValidity();
            }
        });
        //============================================================================
        //============ Validation on Is co-applicant required Fields =================
        this.IsCoApplicantRequired.valueChanges.subscribe(function (m) {
            if (_this.IsCoApplicantRequired.value == true) {
                _this.coApp_firstName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_firstName.updateValueAndValidity();
                _this.coApp_lastName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_lastName.updateValueAndValidity();
                //this.coApp_phone.setValidators([Validators.required]); 
                //this.coApp_phone.updateValueAndValidity();
                _this.coApp_email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_email.updateValueAndValidity();
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_dateofBirth.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _this.checkAge]);
                _this.coApp_dateofBirth.updateValueAndValidity();
                _this.coApp_country.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_country.updateValueAndValidity();
                _this.coAppstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coAppstate.updateValueAndValidity();
                _this.coApp_city.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_city.updateValueAndValidity();
                _this.coApp_street.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_street.updateValueAndValidity();
                _this.coApp_postalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_postalCode.updateValueAndValidity();
                _this.coApp_occupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_occupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_monthsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_employerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_employerName.updateValueAndValidity();
                _this.coApp_incomeFrequency.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_incomeFrequency.updateValueAndValidity();
                _this.coApp_income.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_income.updateValueAndValidity();
                //this.coApp_otherIncomeFrequency.setValidators([Validators.required]);
                //this.coApp_otherIncomeFrequency.updateValueAndValidity();
                //this.coApp_otherIncome.setValidators([Validators.required]);
                //this.coApp_otherIncome.updateValueAndValidity();
                _this.coApp_employementTypeID.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_employementTypeID.updateValueAndValidity();
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_monthsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
            else {
                _this.sameAsapplicant.setValue(false);
                _this.coApp_firstName.setValue(null);
                _this.coApp_firstName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_firstName.updateValueAndValidity();
                _this.coApp_lastName.setValue(null);
                _this.coApp_lastName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_lastName.updateValueAndValidity();
                //this.coApp_phone.setValue(null);
                //this.coApp_phone.setValidators([Validators.nullValidator]);
                //this.coApp_phone.updateValueAndValidity();
                _this.coApp_email.setValue(null);
                _this.coApp_email.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_email.updateValueAndValidity();
                _this.coApp_ssn.setValue(null);
                _this.coApp_ssn.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_ssn.updateValueAndValidity();
                _this.coApp_dateofBirth.setValue(null);
                _this.coApp_dateofBirth.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_dateofBirth.updateValueAndValidity();
                _this.coApp_country.setValue(null);
                _this.coApp_country.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_country.updateValueAndValidity();
                _this.coAppstate.setValue(null);
                _this.coAppstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coAppstate.updateValueAndValidity();
                _this.coApp_city.setValue(null);
                _this.coApp_city.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_city.updateValueAndValidity();
                _this.coApp_street.setValue(null);
                _this.coApp_street.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_street.updateValueAndValidity();
                _this.coApp_occupation.setValue(null);
                _this.coApp_occupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_occupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentEmployement.setValue(null);
                _this.coApp_yearsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_monthsAtCurrentEmployement.setValue(null);
                _this.coApp_monthsAtCurrentEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsAtCurrentEmployement.updateValueAndValidity();
                _this.coApp_employerName.setValue(null);
                _this.coApp_employerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_employerName.updateValueAndValidity();
                _this.coApp_incomeFrequency.setValue(null);
                _this.coApp_incomeFrequency.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_incomeFrequency.updateValueAndValidity();
                _this.coApp_income.setValue(null);
                _this.coApp_income.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_income.updateValueAndValidity();
                //this.coApp_otherIncomeFrequency.setValue(null);
                //this.coApp_otherIncomeFrequency.setValidators([Validators.nullValidator]);
                //this.coApp_otherIncomeFrequency.updateValueAndValidity();
                //this.coApp_otherIncome.setValue(null);
                //this.coApp_otherIncome.setValidators([Validators.nullValidator]);
                //this.coApp_otherIncome.updateValueAndValidity();
                _this.coApp_employementTypeID.setValue(null);
                _this.coApp_employementTypeID.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_employementTypeID.updateValueAndValidity();
                _this.coApp_previousEmployerName.setValue(null);
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValue(null);
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtCurrentResidence.setValue(null);
                _this.coApp_yearsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_monthsAtCurrentResidence.setValue(null);
                _this.coApp_monthsAtCurrentResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsAtCurrentResidence.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValue(null);
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValue(null);
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_phone.setValue(null);
                _this.coApp_mobile.setValue(null);
                _this.coApp_postalCode.setValue(null);
                _this.coApp_postalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_postalCode.updateValueAndValidity();
                _this.coApp_otherIncomeFrequency.setValue(null);
                _this.coApp_otherIncome.setValue(null);
                _this.coApp_otherIncomeSource.setValue(null);
                _this.coApp_grossIncome.setValue(null);
                _this.coApp_yearsAtPreviousResidence.setValue(null);
                _this.coApp_yearsAtPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousResidence.updateValueAndValidity();
                _this.coApp_monthsatPreviousResidence.setValue(null);
                _this.coApp_monthsatPreviousResidence.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsatPreviousResidence.updateValueAndValidity();
                _this.coApp_PRcountry.setValue(null);
                _this.coApp_PRcountry.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRcountry.updateValueAndValidity();
                _this.coApp_PRstate.setValue(null);
                _this.coApp_PRstate.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRstate.updateValueAndValidity();
                _this.coApp_PRCity.setValue(null);
                _this.coApp_PRCity.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRCity.updateValueAndValidity();
                _this.coApp_PRStreet.setValue(null);
                _this.coApp_PRStreet.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRStreet.updateValueAndValidity();
                _this.coApp_PRPostalCode.setValue(null);
                _this.coApp_PRPostalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_PRPostalCode.updateValueAndValidity();
                _this.coApp_postalCode.setValue(null);
                _this.coApp_postalCode.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_postalCode.updateValueAndValidity();
                _this.CoPHousingStatus.setValue(null);
                _this.CoPHousingStatus.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.CoPHousingStatus.updateValueAndValidity();
            }
        });
        //============================================================================
        //============== Validate On coApp_yearsAtCurrentEmployement Field ==========
        this.coApp_yearsAtCurrentEmployement.valueChanges.subscribe(function (m) {
            if (m == "") {
                return;
            }
            if (m == 1 || m == 0) {
                //this.ShowCo_App_PreviousEmployerDetails = true;
                _this.sendToLoanHomiDataModel.coIsOE = true;
                _this.coApp_previousEmployerName.enable();
                _this.coApp_previousOccupation.enable();
                _this.coApp_yearsAtPreviousEmployement.enable();
                _this.coApp_monthsAtPreviousEmployement.enable();
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
            }
            else {
                // this.ShowCo_App_PreviousEmployerDetails = false;
                _this.coApp_previousEmployerName.disable();
                _this.coApp_previousOccupation.disable();
                _this.coApp_yearsAtPreviousEmployement.disable();
                _this.coApp_monthsAtPreviousEmployement.disable();
                _this.sendToLoanHomiDataModel.coIsOE = false;
                _this.coApp_previousEmployerName.setValue(null);
                _this.coApp_previousEmployerName.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_previousEmployerName.updateValueAndValidity();
                _this.coApp_previousOccupation.setValue(null);
                _this.coApp_previousOccupation.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_previousOccupation.updateValueAndValidity();
                _this.coApp_yearsAtPreviousEmployement.setValue(null);
                _this.coApp_yearsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_yearsAtPreviousEmployement.updateValueAndValidity();
                _this.coApp_monthsAtPreviousEmployement.setValue(null);
                _this.coApp_monthsAtPreviousEmployement.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
                _this.coApp_monthsAtPreviousEmployement.updateValueAndValidity();
            }
        });
        //============================================================================
        this.sameAsapplicant.valueChanges.subscribe(function (m) {
            if (m == true) {
                _this.coApp_country.setValue(_this.country.value);
                _this.coAppstate.setValue(_this.state.value);
                _this.coApp_city.setValue(_this.city.value);
                _this.coApp_street.setValue(_this.street.value);
                _this.coApp_postalCode.setValue(_this.postalCode.value);
            }
            else {
                _this.coApp_country.setValue(null);
                _this.coAppstate.setValue(null);
                _this.coApp_city.setValue(null);
                _this.coApp_street.setValue(null);
                _this.coApp_postalCode.setValue(null);
            }
        });
        this.downpaymentAmount.valueChanges.subscribe(function (m) {
            var value;
            value = m;
            if (value >= _this.TotalloanAmount) {
                _this.loanAmount.setValue(_this.totalSystemCost.value);
                _this.downpaymentAmount.setValue(null);
            }
            else {
                _this.totalLoanAmt = _this.totalSystemCost.value - value;
                _this.result = _this.decimalPipe.transform(_this.totalLoanAmt, _this.format);
                var re = /\,/gi;
                _this.result = _this.result.replace(re, "");
                _this.loanAmount.setValue(_this.result);
            }
        });
        //---------validation for not enter Negative Value into Income field----
        //----------------------------------------------------------------------
        //----Calculating Applicant Gross Amt------------- 
        this.lstIncomeFrequencyID.valueChanges.subscribe(function (m) {
            _this.totalGrossAmt = 0;
            if (m == _this.iFreqMonthValue) {
                // this.ShowIncomeFrequency = true;
                _this.showValidationIconOn_income = true;
                _this.income.enable();
                _this.incomeType = m;
                _this.totalGrossAmt = _this.income.value * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.ShowIncomeFrequency = true;
                _this.showValidationIconOn_income = true;
                _this.income.enable();
                _this.incomeType = m;
                _this.totalGrossAmt = _this.income.value;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                _this.incomeType = null;
                _this.totalGrossAmt = 0;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
                _this.income.setValue(null);
                //this.ShowIncomeFrequency = false;
                _this.income.disable();
                _this.showValidationIconOn_income = false;
            }
        });
        this.income.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.income.setValue(0);
                return;
            }
            // 1146 --Monthly Id
            if (_this.incomeType == _this.iFreqMonthValue) {
                _this.totalGrossAmt = m * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (_this.incomeType == _this.iFreqYearValue) {
                _this.totalGrossAmt = m;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m == null) {
                _this.totalGrossAmt = 0;
            }
        });
        this.otherIncomeFrequencyID.valueChanges.subscribe(function (m) {
            _this.totalOtherFreqIncome = 0;
            if (m == _this.iFreqMonthValue) {
                // this.ShowotherIncomeFrequency = true;
                _this.otherIncome.enable();
                _this.otherIncomeType = m;
                _this.totalOtherFreqIncome = _this.otherIncome.value * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.ShowotherIncomeFrequency = true;
                _this.otherIncome.enable();
                _this.otherIncomeType = m;
                _this.totalOtherFreqIncome = _this.otherIncome.value;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                //this.ShowotherIncomeFrequency = false;
                _this.otherIncome.disable();
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
                _this.otherIncome.setValue(null);
            }
        });
        this.otherIncome.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.otherIncome.setValue(0);
                return;
            }
            _this.totalOtherFreqIncome = 0;
            // 1146 --Monthly Id
            if (_this.otherIncomeType == _this.iFreqMonthValue) {
                _this.totalOtherFreqIncome = m * 12;
                _this.grossIncome.setValue(_this.totalGrossAmt + _this.totalOtherFreqIncome);
            }
            else if (_this.otherIncomeType == _this.iFreqYearValue) {
                _this.totalOtherFreqIncome = m;
                _this.grossIncome.setValue(_this.totalGrossAmt + m);
            }
        });
        //----------------------------------------
        //----Calculating Co-Applicant Gross Amt-------------
        this.coApp_incomeFrequency.valueChanges.subscribe(function (m) {
            if (m == _this.iFreqMonthValue) {
                // this.show_CoApp_IncomeFrequency = true;
                _this.coApp_income.enable();
                _this.showValidationIconOn_coApp_income = true;
                _this.coApp_incomeType = m;
                _this.totalCo_App_GrossAmt = _this.coApp_income.value * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.show_CoApp_IncomeFrequency = true;
                _this.coApp_income.enable();
                _this.showValidationIconOn_coApp_income = true;
                _this.coApp_incomeType = m;
                _this.totalCo_App_GrossAmt = _this.coApp_income.value;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                _this.coApp_otherIncomeType = null;
                _this.totalCo_App_GrossAmt = 0;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                _this.coApp_income.setValue(0);
                // this.show_CoApp_IncomeFrequency = false;
                _this.coApp_income.disable();
                _this.showValidationIconOn_coApp_income = false;
            }
        });
        this.coApp_income.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.coApp_income.setValue(null);
                return;
            }
            // 1146 --Monthly Id
            if (_this.coApp_incomeType == _this.iFreqMonthValue) {
                _this.totalCo_App_GrossAmt = m * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (_this.coApp_incomeType == _this.iFreqYearValue) {
                _this.totalCo_App_GrossAmt = m;
                var data = m + _this.Co_App_totalOtherFreqIncome;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                if (m == null) {
                    _this.totalCo_App_GrossAmt = 0;
                }
            }
        });
        this.coApp_otherIncomeFrequency.valueChanges.subscribe(function (m) {
            _this.Co_App_totalOtherFreqIncome = 0;
            if (m == _this.iFreqMonthValue) {
                // this.show_CoApp_otherIncomeFrequency = true;
                _this.coApp_otherIncome.enable();
                _this.coApp_otherIncomeType = m;
                _this.Co_App_totalOtherFreqIncome = _this.coApp_otherIncome.value * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else if (m == _this.iFreqYearValue) {
                //this.show_CoApp_otherIncomeFrequency = true;
                _this.coApp_otherIncome.enable();
                _this.coApp_otherIncomeType = m;
                _this.Co_App_totalOtherFreqIncome = _this.coApp_otherIncome.value;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            if (m != _this.iFreqMonthValue && m != _this.iFreqYearValue) {
                //this.show_CoApp_otherIncomeFrequency = false;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                _this.coApp_otherIncome.setValue(null);
                _this.coApp_otherIncome.disable();
            }
        });
        this.coApp_otherIncome.valueChanges.subscribe(function (m) {
            if (m < 0) {
                event.preventDefault();
                _this.coApp_otherIncome.setValue(0);
                return;
            }
            // 1440 --Monthly Id
            _this.Co_App_totalOtherFreqIncome = 0;
            if (_this.coApp_otherIncomeType == _this.iFreqMonthValue) {
                _this.Co_App_totalOtherFreqIncome = m * 12;
                _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
            }
            else {
                if (_this.coApp_otherIncomeType == _this.iFreqYearValue) {
                    _this.Co_App_totalOtherFreqIncome = m;
                    _this.coApp_grossIncome.setValue(_this.totalCo_App_GrossAmt + _this.Co_App_totalOtherFreqIncome);
                }
            }
        });
        //----------------------------------------
        //=====================================================================
    };
    SendtoloanhomimodelpopupComponent.prototype.show12 = function (OpptId) {
        this.fillForm(OpptId);
        // this.openPopupSendToLoanHomi.show();
        this.showAddSendTLoanHomiForm = true;
        this.showPreviewSendTLoanHomiForm = false;
    };
    SendtoloanhomimodelpopupComponent.prototype.closePopup = function () {
        //this.refreshEvent.emit('Yes');
        this.openPopupSendToLoanHomi.hide();
        //setTimeout(() => {   
        //      window.location.reload();
        //    }, 1000);
    };
    SendtoloanhomimodelpopupComponent.prototype.initiForm = function () {
        this.addSendTLoanHomiForm = this.fb.group({
            loanProduct: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            term: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            country: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            state: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            city: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            street: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            postalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            systemSizeKW: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            totalSystemCost: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            downpaymentAmount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            loanAmount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            ownthePropertyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            CoPHousingStatus: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            noOfMortgages: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            firstName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            lastName: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            //phone: ['', Validators.required],
            phone: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(14)],
            mobile: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(14)],
            // email: [null, [Validators.nullValidator, Validators.email]],    
            email: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            //ssn: [null, Validators.required],
            ssn: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].maxLength(11)]],
            // dateofBirth: [Validators.required, Validators.required],
            dateofBirth: [null, [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required, this.checkAge]],
            yearsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            // yearsAtCurrentResidence: ['', [Validators.required, Validators.pattern("[0 - 9] + (\.[0 - 9][0 - 9] ?) ?")]],
            monthsatCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            yearsAtPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            monthsatPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PRcountry: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PRstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PRCity: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PRStreet: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PRPostalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            PHousingStatus: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            employementTypeID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            employerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            yearsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            monthsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            lstIncomeFrequencyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            income: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            otherIncomeFrequencyID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            otherIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            otherIncomeSource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            grossIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            occupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            coApp_firstName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_lastName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_phone: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_mobile: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            // coApp_phone: ['', [Validators.required, Validators.maxLength(14)]],
            coApp_email: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_ssn: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            // coApp_ssn: ['', [Validators.required, Validators.maxLength(15)]],
            coApp_dateofBirth: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_country: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coAppstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_city: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_street: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_postalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_occupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_yearsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_monthsAtCurrentEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            employementType: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_employerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_incomeFrequency: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_income: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_otherIncomeFrequency: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_otherIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_otherIncomeSource: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_grossIncome: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            isAutoPaymentcheckBox: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            isTermCheckBox: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            isBorrowers: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required],
            coApp_employementTypeID: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            previousEmployerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            previousOccupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            yearsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            monthsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_previousEmployerName: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_previousOccupation: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_yearsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_monthsAtCurrentResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_yearsAtPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_monthsatPreviousResidence: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_PRcountry: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_PRstate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_PRCity: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_PRStreet: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_PRPostalCode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_yearsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            coApp_monthsAtPreviousEmployement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator],
            IsCoApplicantRequired: [false],
            //isAutoPaymentcheckBox: [true],
            sameAsapplicant: [false],
        });
    };
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "IsCoApplicantRequired", {
        get: function () { return this.addSendTLoanHomiForm.get('IsCoApplicantRequired'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "monthsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_monthsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "yearsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "sameAsapplicant", {
        get: function () { return this.addSendTLoanHomiForm.get('sameAsapplicant'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_country", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "state", {
        get: function () { return this.addSendTLoanHomiForm.get('state'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "country", {
        get: function () { return this.addSendTLoanHomiForm.get('country'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coAppstate", {
        get: function () { return this.addSendTLoanHomiForm.get('coAppstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "city", {
        get: function () { return this.addSendTLoanHomiForm.get('city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_city", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_city'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "street", {
        get: function () { return this.addSendTLoanHomiForm.get('street'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_street", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_street'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "postalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('postalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_postalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_postalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "downpaymentAmount", {
        get: function () { return this.addSendTLoanHomiForm.get('downpaymentAmount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "loanAmount", {
        get: function () { return this.addSendTLoanHomiForm.get('loanAmount'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "totalSystemCost", {
        get: function () { return this.addSendTLoanHomiForm.get('totalSystemCost'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "lstIncomeFrequencyID", {
        get: function () { return this.addSendTLoanHomiForm.get('lstIncomeFrequencyID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "income", {
        get: function () { return this.addSendTLoanHomiForm.get('income'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "grossIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('grossIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "otherIncomeFrequencyID", {
        get: function () { return this.addSendTLoanHomiForm.get('otherIncomeFrequencyID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "otherIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('otherIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_incomeFrequency", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_incomeFrequency'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_income", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_income'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_otherIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_grossIncome", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_grossIncome'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_otherIncomeFrequency", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncomeFrequency'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_employementTypeID", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_employementTypeID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "noOfMortgages", {
        get: function () { return this.addSendTLoanHomiForm.get('noOfMortgages'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "firstName", {
        get: function () { return this.addSendTLoanHomiForm.get('firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "lastName", {
        get: function () { return this.addSendTLoanHomiForm.get('lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_firstName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_firstName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_lastName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_lastName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "phone", {
        get: function () { return this.addSendTLoanHomiForm.get('phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "mobile", {
        get: function () { return this.addSendTLoanHomiForm.get('mobile'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_phone", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_phone'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_mobile", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_mobile'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "isTermCheckBox", {
        get: function () { return this.addSendTLoanHomiForm.get('isTermCheckBox'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "isAutoPaymentcheckBox", {
        get: function () { return this.addSendTLoanHomiForm.get('isAutoPaymentcheckBox'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "isBorrowers", {
        get: function () { return this.addSendTLoanHomiForm.get('isBorrowers'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "previousEmployerName", {
        get: function () { return this.addSendTLoanHomiForm.get('previousEmployerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "previousOccupation", {
        get: function () { return this.addSendTLoanHomiForm.get('previousOccupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "yearsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "monthsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "email", {
        get: function () { return this.addSendTLoanHomiForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "ssn", {
        get: function () { return this.addSendTLoanHomiForm.get('ssn'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "dateofBirth", {
        get: function () { return this.addSendTLoanHomiForm.get('dateofBirth'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "yearsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "monthsatCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsatCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "yearsAtPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('yearsAtPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "monthsatPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('monthsatPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PRcountry", {
        get: function () { return this.addSendTLoanHomiForm.get('PRcountry'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PRstate", {
        get: function () { return this.addSendTLoanHomiForm.get('PRstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PRCity", {
        get: function () { return this.addSendTLoanHomiForm.get('PRCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PRStreet", {
        get: function () { return this.addSendTLoanHomiForm.get('PRStreet'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PRPostalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('PRPostalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "PHousingStatus", {
        get: function () { return this.addSendTLoanHomiForm.get('PHousingStatus'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "employementTypeID", {
        get: function () { return this.addSendTLoanHomiForm.get('employementTypeID'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "employerName", {
        get: function () { return this.addSendTLoanHomiForm.get('employerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "occupation", {
        get: function () { return this.addSendTLoanHomiForm.get('occupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_email", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_ssn", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_ssn'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_dateofBirth", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_dateofBirth'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_yearsAtCurrentEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_previousEmployerName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_previousEmployerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_previousOccupation", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_previousOccupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_yearsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_monthsAtCurrentResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtCurrentResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_yearsAtPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_monthsatPreviousResidence", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsatPreviousResidence'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_PRcountry", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRcountry'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_PRstate", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRstate'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_PRCity", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRCity'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_PRStreet", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRStreet'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_PRPostalCode", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_PRPostalCode'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_employerName", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_employerName'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_occupation", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_occupation'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_yearsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_yearsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_monthsAtPreviousEmployement", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_monthsAtPreviousEmployement'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "coApp_otherIncomeSource", {
        get: function () { return this.addSendTLoanHomiForm.get('coApp_otherIncomeSource'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SendtoloanhomimodelpopupComponent.prototype, "CoPHousingStatus", {
        get: function () { return this.addSendTLoanHomiForm.get('CoPHousingStatus'); },
        enumerable: true,
        configurable: true
    });
    //get IsOE() { return this.addSendTLoanHomiForm.get('IsOE'); } 
    SendtoloanhomimodelpopupComponent.prototype.fillForm = function (OpptId) {
        var _this = this;
        this.addSendTLoanHomiForm.reset();
        this.addSendTLoanHomiForm.patchValue({
            isAutoPaymentcheckBox: true
        });
        this.GetOwnThePropertyDll();
        this.GetPrevHousingStatus();
        this.opportunityId = OpptId;
        /// this.addOrUpdatePermission = this.isUpdate;
        this.opprtunityservice.getSendToLoanHomiDetail(OpptId).subscribe(function (result) {
            if (result) {
                _this.resultData = result.data;
                if (_this.resultData[0].error == "-1") {
                    _this.loadSave = true;
                    _this.openPopupSendToLoanHomi.hide();
                    _this.loadSave = false;
                    _this.toaster.error("No Primary Proposal available for this opportunity");
                    return false;
                }
                if (_this.resultData[0].error == "-3") {
                    _this.loadSave = false;
                    _this.toaster.error("Loan Product is not associated with the Primary Proposal.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                if (_this.resultData[0].error == "-9") {
                    _this.loadSave = false;
                    _this.toaster.error("No Primary Proposal available for this opportunity.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                if (_this.resultData[0].error == "-2") {
                    _this.loadSave = false;
                    _this.toaster.error("Financial Institution of Loan Product can't be empty.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                if (_this.resultData[0].error == "-5") {
                    _this.loadSave = false;
                    _this.toaster.error("Loan application has already been added to the opportunity.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                if (_this.resultData[0].error == "-6") {
                    _this.loadSave = false;
                    _this.toaster.error("Contract is not assoicated with this opportunity.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                if (_this.resultData[0].error == "-7") {
                    _this.loadSave = false;
                    _this.toaster.error("Loan Product is not mapped.");
                    _this.openPopupSendToLoanHomi.hide();
                    return false;
                }
                _this.loadSave = false;
                // this.responsePopUp.show();
                _this.openPopupSendToLoanHomi.show();
                var d = new Date(result.data[0].Birthdate);
                var CoappBirthdate = new Date(result.data[0].CoappBirthdate);
                if (result.data[0].loanAmount == null) {
                    _this.loanAmt = result.data[0].Total_System_Cost__c - result.data[0].Downpayment_Amount__c;
                    _this.TotalloanAmount = result.data[0].Total_System_Cost__c;
                }
                else {
                    _this.loanAmt = result.data[0].Loan_Amount__c;
                    _this.TotalloanAmount = result.data[0].Total_System_Cost__c;
                }
                _this.addSendTLoanHomiForm.patchValue({
                    loanProduct: result.data[0].Loan_Product,
                    term: result.data[0].Term,
                    // term: result.term,
                    country: result.data[0].BillingCountry == null ? null : parseInt(result.data[0].BillingCountry),
                    state: result.data[0].BillingState == null ? null : parseInt(result.data[0].BillingState),
                    city: result.data[0].BillingCity,
                    street: result.data[0].BillingStreet,
                    postalCode: result.data[0].BillingPostalCode,
                    systemSizeKW: result.data[0].System_Size_kW__c,
                    totalSystemCost: result.data[0].Total_System_Cost__c,
                    downpaymentAmount: result.data[0].Downpayment_Amount__c,
                    loanAmount: _this.loanAmt,
                    firstName: result.data[0].FirstName,
                    lastName: result.data[0].LastName,
                    phone: result.data[0].Phone,
                    mobile: result.data[0].MobilePhone,
                    email: result.data[0].Email,
                    coApp_firstName: result.data[0].Coappfirstname,
                    coApp_lastName: result.data[0].Coapplastname,
                    coApp_phone: result.data[0].CoappPhone,
                    coApp_mobile: result.data[0].CoappMobilePhone,
                    coApp_email: result.data[0].CoappEmail,
                });
                // this.email.disable();
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    //=================
    //=========
    //================================ Getting Dropdown Data =================================================
    SendtoloanhomimodelpopupComponent.prototype.GetOwnThePropertyDll = function () {
        var _this = this;
        this.lstownthePropertyCode = 'OwntheProperty';
        this.commonService.getMasterItemsList("OwntheProperty").subscribe(function (result) {
            _this.lstowntheProperty = _this.commonService.masters;
            _this.selectedOwnTheProperty = _this.lstowntheProperty.filter(function (x) { return x.text == "YES"; });
            _this.defaultOwnTheProperty = _this.selectedOwnTheProperty[0].value;
            //this.defaultOwnTheProperty = JSON.parse(this.selectedOwnTheProperty); 
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.GetPrevHousingStatus = function () {
        var _this = this;
        debugger;
        this.commonService.getMasterItemsList("PrevHousingStatus").subscribe(function (result) {
            _this.lstprevHousingStatus = _this.commonService.masters;
            console.log("this.lstprevHousingStatus", _this.lstprevHousingStatus);
            //   this.selectedOwnTheProperty = this.lstprevHousingStatus.filter(x => x.text == "YES"); 
            //  this.defaultOwnTheProperty = this.selectedOwnTheProperty[0].value;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.GetEmployementTypeDll = function () {
        var _this = this;
        this.lstemployementTypeCode = 'EmploymentType';
        this.commonService.getMasterItemsList("EmploymentType").subscribe(function (result) {
            _this.lstemployementType = _this.commonService.masters;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.GetIncomeFrequencyDll = function () {
        var _this = this;
        this.lstIncomeFrequencyCode = 'IncomeFrequency';
        this.commonService.getMasterItemsList("IncomeFrequency").subscribe(function (result) {
            _this.lstIncomeFrequency = _this.commonService.masters;
            _this.iFreqYear = _this.lstIncomeFrequency.filter(function (x) { return x.text == "Annually"; });
            _this.iFreqYearValue = _this.iFreqYear[0].value;
            _this.iFreqMonth = _this.lstIncomeFrequency.filter(function (x) { return x.text == "Monthly"; });
            _this.iFreqMonthValue = _this.iFreqMonth[0].value;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.getCountryDropdownList = function () {
        var _this = this;
        this.userService.getCountryList().subscribe(function (result) {
            _this.countryLists = result;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.getState = function () {
        var _this = this;
        this.userService.getStateList().subscribe(function (result) {
            var data = result;
            _this.states = data;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.onSubmit = function () {
        var _this = this;
        debugger;
        if (this.addSendTLoanHomiForm.valid) {
            debugger;
            this.loadSave = true;
            this.sendToLoanHomiDataModel.OpportunityId = this.opportunityId;
            this.sendToLoanHomiDataModel.ProposalId = this.resultData[0].ProposalId;
            this.sendToLoanHomiDataModel.ContactId = this.resultData[0].ContactId;
            this.sendToLoanHomiDataModel.AccountId = this.resultData[0].AccountId;
            this.sendToLoanHomiDataModel.ContractId = this.resultData[0].ContractId;
            this.sendToLoanHomiDataModel.LoanProductId = this.resultData[0].LoanProductId;
            this.sendToLoanHomiDataModel.loanProduct = this.addSendTLoanHomiForm.value.loanProduct;
            this.sendToLoanHomiDataModel.Term = this.addSendTLoanHomiForm.value.term;
            this.sendToLoanHomiDataModel.country = this.addSendTLoanHomiForm.value.country;
            this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
            this.sendToLoanHomiDataModel.BillingCity = this.addSendTLoanHomiForm.value.city;
            this.sendToLoanHomiDataModel.MailingState = this.addSendTLoanHomiForm.value.state;
            this.sendToLoanHomiDataModel.MailingCity = this.addSendTLoanHomiForm.value.city;
            this.sendToLoanHomiDataModel.BillingStreet = this.addSendTLoanHomiForm.value.street;
            this.sendToLoanHomiDataModel.BillingPostalCode = this.addSendTLoanHomiForm.value.postalCode;
            this.sendToLoanHomiDataModel.System_Size_kW = this.addSendTLoanHomiForm.value.systemSizeKW;
            this.sendToLoanHomiDataModel.Total_System_Cost = this.addSendTLoanHomiForm.value.totalSystemCost;
            this.sendToLoanHomiDataModel.Downpayment_Amount = this.addSendTLoanHomiForm.value.downpaymentAmount;
            this.sendToLoanHomiDataModel.Loan_Amount = this.addSendTLoanHomiForm.value.loanAmount;
            this.sendToLoanHomiDataModel.Owntheproperty = this.addSendTLoanHomiForm.value.ownthePropertyID;
            this.sendToLoanHomiDataModel.NoofMortgages = this.addSendTLoanHomiForm.value.noOfMortgages;
            this.sendToLoanHomiDataModel.FirstName = this.addSendTLoanHomiForm.value.firstName;
            this.sendToLoanHomiDataModel.LastName = this.addSendTLoanHomiForm.value.lastName;
            this.sendToLoanHomiDataModel.Phone = this.addSendTLoanHomiForm.value.phone;
            this.sendToLoanHomiDataModel.MobilePhone = this.addSendTLoanHomiForm.value.mobile;
            this.sendToLoanHomiDataModel.Email = this.addSendTLoanHomiForm.value.email;
            this.sendToLoanHomiDataModel.SSN = this.addSendTLoanHomiForm.value.ssn;
            this.sendToLoanHomiDataModel.DOB = this.addSendTLoanHomiForm.value.dateofBirth == null ? this.addSendTLoanHomiForm.value.dateofBirth : moment__WEBPACK_IMPORTED_MODULE_7___default()(this.dateofBirth.value).format('MM-DD-YYYY'); //this.addSendTLoanHomiForm.value.dateofBirth
            this.sendToLoanHomiDataModel.YearsACA = this.addSendTLoanHomiForm.value.yearsAtCurrentResidence;
            this.sendToLoanHomiDataModel.MonthsACA = this.addSendTLoanHomiForm.value.monthsatCurrentResidence;
            this.sendToLoanHomiDataModel.PYearACR = this.addSendTLoanHomiForm.value.yearsAtPreviousResidence;
            this.sendToLoanHomiDataModel.PMonthACR = this.addSendTLoanHomiForm.value.monthsatPreviousResidence;
            this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
            this.sendToLoanHomiDataModel.PRstate = this.addSendTLoanHomiForm.value.PRstate;
            this.sendToLoanHomiDataModel.PRCity = this.addSendTLoanHomiForm.value.PRCity;
            this.sendToLoanHomiDataModel.PRStreet = this.addSendTLoanHomiForm.value.PRStreet;
            this.sendToLoanHomiDataModel.PRPostalCode = this.addSendTLoanHomiForm.value.PRPostalCode;
            this.sendToLoanHomiDataModel.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;
            this.sendToLoanHomiDataModel.EmployerType = this.addSendTLoanHomiForm.value.employementTypeID;
            this.sendToLoanHomiDataModel.Employer = this.addSendTLoanHomiForm.value.employerName;
            this.sendToLoanHomiDataModel.YearsACE = this.addSendTLoanHomiForm.value.yearsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.MonthsACE = this.addSendTLoanHomiForm.value.monthsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.PEmployerName = this.addSendTLoanHomiForm.value.previousEmployerName;
            this.sendToLoanHomiDataModel.POccupation = this.addSendTLoanHomiForm.value.previousOccupation;
            this.sendToLoanHomiDataModel.PYearsACE = this.addSendTLoanHomiForm.value.yearsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.PMonthsACE = this.addSendTLoanHomiForm.value.monthsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.IncomeFreq = this.addSendTLoanHomiForm.value.lstIncomeFrequencyID;
            this.sendToLoanHomiDataModel.Income = this.addSendTLoanHomiForm.value.income;
            this.sendToLoanHomiDataModel.OIncomeFreq = this.addSendTLoanHomiForm.value.otherIncomeFrequencyID;
            this.sendToLoanHomiDataModel.OIncomeMonthly = this.addSendTLoanHomiForm.value.otherIncome;
            this.sendToLoanHomiDataModel.OIncomeSource = this.addSendTLoanHomiForm.value.otherIncomeSource;
            this.sendToLoanHomiDataModel.GrossIncome = this.addSendTLoanHomiForm.value.grossIncome;
            this.sendToLoanHomiDataModel.Occupation = this.addSendTLoanHomiForm.value.occupation;
            this.sendToLoanHomiDataModel.coFirstname = this.addSendTLoanHomiForm.value.coApp_firstName;
            this.sendToLoanHomiDataModel.coLastname = this.addSendTLoanHomiForm.value.coApp_lastName;
            this.sendToLoanHomiDataModel.coPhone = this.addSendTLoanHomiForm.value.coApp_phone;
            this.sendToLoanHomiDataModel.coMobilePhone = this.addSendTLoanHomiForm.value.coApp_mobile;
            this.sendToLoanHomiDataModel.coEmail = this.addSendTLoanHomiForm.value.coApp_email;
            this.sendToLoanHomiDataModel.coSSN = this.addSendTLoanHomiForm.value.coApp_ssn;
            this.sendToLoanHomiDataModel.coDOB = this.addSendTLoanHomiForm.value.coApp_dateofBirth == null ? this.addSendTLoanHomiForm.value.coApp_dateofBirth : moment__WEBPACK_IMPORTED_MODULE_7___default()(this.coApp_dateofBirth.value).format('MM-DD-YYYY');
            this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
            //this.sendToLoanHomiDataModel.coState = this.addSendTLoanHomiForm.value.coState;
            this.sendToLoanHomiDataModel.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
            // this.sendToLoanHomiDataModel.coCity = this.addSendTLoanHomiForm.value.coApp_city; 
            this.sendToLoanHomiDataModel.coMailingCity = this.addSendTLoanHomiForm.value.coApp_city;
            //this.sendToLoanHomiDataModel.coStreetName = this.addSendTLoanHomiForm.value.coApp_street;
            this.sendToLoanHomiDataModel.coMailingStreet = this.addSendTLoanHomiForm.value.coApp_street;
            this.sendToLoanHomiDataModel.coMailingPostalCode = this.addSendTLoanHomiForm.value.coApp_postalCode;
            this.sendToLoanHomiDataModel.coOccupation = this.addSendTLoanHomiForm.value.coApp_occupation;
            this.sendToLoanHomiDataModel.coYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.coMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentEmployement;
            this.sendToLoanHomiDataModel.coEmployerType = this.addSendTLoanHomiForm.value.coApp_employementTypeID;
            this.sendToLoanHomiDataModel.coEmployer = this.addSendTLoanHomiForm.value.coApp_employerName;
            this.sendToLoanHomiDataModel.coIncomeFreq = this.addSendTLoanHomiForm.value.coApp_incomeFrequency;
            this.sendToLoanHomiDataModel.CoIncome = this.addSendTLoanHomiForm.value.coApp_income;
            this.sendToLoanHomiDataModel.CoOIncomeFreq = this.addSendTLoanHomiForm.value.coApp_otherIncomeFrequency;
            this.sendToLoanHomiDataModel.coOIncome = this.addSendTLoanHomiForm.value.coApp_otherIncome;
            this.sendToLoanHomiDataModel.coOIncomeSource = this.addSendTLoanHomiForm.value.coApp_otherIncomeSource;
            this.sendToLoanHomiDataModel.coGrossIncome = this.addSendTLoanHomiForm.value.coApp_grossIncome;
            this.sendToLoanHomiDataModel.CustomerSignedDate = this.resultData[0].CustomerSignedDate;
            if (this.addSendTLoanHomiForm.value.IsCoApplicantRequired == null) {
                this.sendToLoanHomiDataModel.Iscoapplicant = false;
            }
            else {
                this.sendToLoanHomiDataModel.Iscoapplicant = this.addSendTLoanHomiForm.value.IsCoApplicantRequired;
            }
            this.sendToLoanHomiDataModel.AutoPayment = this.addSendTLoanHomiForm.value.isAutoPaymentcheckBox;
            if (this.sendToLoanHomiDataModel.CustomerSignedDate == null || this.sendToLoanHomiDataModel.CustomerSignedDate == "") {
                this.sendToLoanHomiDataModel.IsDocsSigned = 0;
            }
            else {
                this.sendToLoanHomiDataModel.IsDocsSigned = 1;
            }
            this.sendToLoanHomiDataModel.isBorrowers = this.addSendTLoanHomiForm.value.isBorrowers == "" ? false : true;
            ;
            this.sendToLoanHomiDataModel.CreatedBy = this.resultData[0].CreatedById;
            this.sendToLoanHomiDataModel.coPEmployerName = this.addSendTLoanHomiForm.value.coApp_previousEmployerName;
            this.sendToLoanHomiDataModel.coPOccupation = this.addSendTLoanHomiForm.value.coApp_previousOccupation;
            this.sendToLoanHomiDataModel.coPYearsACE = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.coPMonthsACE = this.addSendTLoanHomiForm.value.coApp_monthsAtPreviousEmployement;
            this.sendToLoanHomiDataModel.coYearsACA = this.addSendTLoanHomiForm.value.coApp_yearsAtCurrentResidence;
            this.sendToLoanHomiDataModel.coMonthsACA = this.addSendTLoanHomiForm.value.coApp_monthsAtCurrentResidence;
            this.sendToLoanHomiDataModel.coPYearACR = this.addSendTLoanHomiForm.value.coApp_yearsAtPreviousResidence;
            this.sendToLoanHomiDataModel.coPMonthACR = this.addSendTLoanHomiForm.value.coApp_monthsatPreviousResidence;
            this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
            this.sendToLoanHomiDataModel.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
            this.sendToLoanHomiDataModel.coPRCity = this.addSendTLoanHomiForm.value.coApp_PRCity;
            this.sendToLoanHomiDataModel.coPRStreet = this.addSendTLoanHomiForm.value.coApp_PRStreet;
            this.sendToLoanHomiDataModel.coPRPostalCode = this.addSendTLoanHomiForm.value.coApp_PRPostalCode;
            this.sendToLoanHomiDataModel.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;
            this.sendToLoanHomiDataModel.OppOwnerId = this.resultData[0].OppOwnerId;
            this.sendToLoanHomiPreviewDetail = this.sendToLoanHomiDataModel;
            if (this.sendToLoanHomiPreviewDetail.country != null && this.sendToLoanHomiPreviewDetail.country != 0) {
                var valcountry = void 0;
                valcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.country; });
                this.sendToLoanHomiPreviewDetail.country = valcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coApp_country != null && this.sendToLoanHomiPreviewDetail.coApp_country != 0) {
                var valcoApp_country = void 0;
                valcoApp_country = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coApp_country; });
                this.sendToLoanHomiPreviewDetail.coApp_country = valcoApp_country[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.BillingState != null && this.sendToLoanHomiPreviewDetail.BillingState != 0) {
                var valstate = void 0;
                valstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.BillingState; });
                this.sendToLoanHomiPreviewDetail.BillingState = valstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coMailingState != null && this.sendToLoanHomiPreviewDetail.coMailingState != 0) {
                var valcostate = void 0;
                valcostate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coMailingState; });
                this.sendToLoanHomiPreviewDetail.coMailingState = valcostate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.Owntheproperty != null && this.sendToLoanHomiPreviewDetail.Owntheproperty != 0) {
                var valOwntheProperty = void 0;
                valOwntheProperty = this.lstowntheProperty.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.Owntheproperty; });
                this.sendToLoanHomiPreviewDetail.Owntheproperty = valOwntheProperty[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.EmployerType != null && this.sendToLoanHomiPreviewDetail.EmployerType != 0) {
                var valEmployerType = void 0;
                valEmployerType = this.lstemployementType.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.EmployerType; });
                this.sendToLoanHomiPreviewDetail.EmployerType = valEmployerType[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.IncomeFreq != null && this.sendToLoanHomiPreviewDetail.IncomeFreq != 0) {
                var valIncomeFreq = void 0;
                valIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.IncomeFreq; });
                this.sendToLoanHomiPreviewDetail.IncomeFreq = valIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.OIncomeFreq != null && this.sendToLoanHomiPreviewDetail.OIncomeFreq != 0) {
                var valOIncomeFreq = void 0;
                valOIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.OIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.OIncomeFreq = valOIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coIncomeFreq != null && this.sendToLoanHomiPreviewDetail.coIncomeFreq != 0) {
                var valcoIncomeFreq = void 0;
                valcoIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.coIncomeFreq = valcoIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != null && this.sendToLoanHomiPreviewDetail.CoOIncomeFreq != 0) {
                var valCoOIncomeFreq = void 0;
                valCoOIncomeFreq = this.lstIncomeFrequency.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.CoOIncomeFreq; });
                this.sendToLoanHomiPreviewDetail.CoOIncomeFreq = valCoOIncomeFreq[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coEmployerType != null && this.sendToLoanHomiPreviewDetail.coEmployerType != 0) {
                var valCoEmployerType = void 0;
                valCoEmployerType = this.lstemployementType.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coEmployerType; });
                this.sendToLoanHomiPreviewDetail.coEmployerType = valCoEmployerType[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PRcountry != null && this.sendToLoanHomiPreviewDetail.PRcountry != 0) {
                var valPRcountry = void 0;
                valPRcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PRcountry; });
                this.sendToLoanHomiPreviewDetail.PRcountry = valPRcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PRstate != null && this.sendToLoanHomiPreviewDetail.PRstate != 0) {
                var valPRstate = void 0;
                valPRstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PRstate; });
                this.sendToLoanHomiPreviewDetail.PRstate = valPRstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.PHousingStatus != null && this.sendToLoanHomiPreviewDetail.PHousingStatus != 0) {
                debugger;
                var valPHousingStatus = void 0;
                valPHousingStatus = this.lstprevHousingStatus.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.PHousingStatus; });
                this.sendToLoanHomiPreviewDetail.PHousingStatus = valPHousingStatus[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coPRcountry != null && this.sendToLoanHomiPreviewDetail.coPRcountry != 0) {
                var valcoPRcountry = void 0;
                valcoPRcountry = this.countryLists.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coPRcountry; });
                this.sendToLoanHomiPreviewDetail.coPRcountry = valcoPRcountry[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.coPRstate != null && this.sendToLoanHomiPreviewDetail.coPRstate != 0) {
                var valcoPRstate = void 0;
                valcoPRstate = this.states.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.coPRstate; });
                this.sendToLoanHomiPreviewDetail.coPRstate = valcoPRstate[0].text;
            }
            if (this.sendToLoanHomiPreviewDetail.CoPHousingStatus != null && this.sendToLoanHomiPreviewDetail.CoPHousingStatus != 0) {
                var valCoPHousingStatus = void 0;
                valCoPHousingStatus = this.lstprevHousingStatus.filter(function (x) { return x.value == _this.sendToLoanHomiPreviewDetail.CoPHousingStatus; });
                this.sendToLoanHomiPreviewDetail.CoPHousingStatus = valCoPHousingStatus[0].text;
            }
            this.showAddSendTLoanHomiForm = false;
            this.showPreviewSendTLoanHomiForm = true;
            this.loadSave = false;
            console.log("asdasdasdasd", this.sendToLoanHomiPreviewDetail);
        }
        else {
            for (var _i = 0, _a = Object.keys(this.addSendTLoanHomiForm.controls); _i < _a.length; _i++) {
                var key = _a[_i];
                if (this.addSendTLoanHomiForm.controls[key].invalid) {
                    var invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
                    console.log("sddasd", invalidControl);
                    invalidControl.focus();
                    break;
                }
            }
            this.commonService.validateAllFormFields(this.addSendTLoanHomiForm);
        }
        //=========================================================================================================
    };
    SendtoloanhomimodelpopupComponent.prototype.onBack = function () {
        this.showPreviewSendTLoanHomiForm = false;
        this.showAddSendTLoanHomiForm = true;
        this.loadSave = false;
    };
    SendtoloanhomimodelpopupComponent.prototype.onPrevSubmit = function () {
        var _this = this;
        debugger;
        this.loadSave = true;
        this.sendToLoanHomiPreviewDetail.country = this.addSendTLoanHomiForm.value.country;
        this.sendToLoanHomiDataModel.coApp_country = this.addSendTLoanHomiForm.value.coApp_country;
        this.sendToLoanHomiDataModel.PRcountry = this.addSendTLoanHomiForm.value.PRcountry;
        this.sendToLoanHomiDataModel.coPRcountry = this.addSendTLoanHomiForm.value.coApp_PRcountry;
        this.sendToLoanHomiDataModel.BillingState = this.addSendTLoanHomiForm.value.state;
        this.sendToLoanHomiPreviewDetail.coMailingState = this.addSendTLoanHomiForm.value.coAppstate;
        this.sendToLoanHomiPreviewDetail.PRstate = this.addSendTLoanHomiForm.value.PRstate;
        this.sendToLoanHomiPreviewDetail.coPRstate = this.addSendTLoanHomiForm.value.coApp_PRstate;
        this.sendToLoanHomiPreviewDetail.PHousingStatus = this.addSendTLoanHomiForm.value.PHousingStatus;
        this.sendToLoanHomiPreviewDetail.CoPHousingStatus = this.addSendTLoanHomiForm.value.CoPHousingStatus;
        debugger;
        this.jsonData.FormJsonData = JSON.stringify(this.sendToLoanHomiPreviewDetail);
        console.log("this.jsonData.FormJsonData", this.jsonData.FormJsonData);
        this.opprtunityservice.saveData(this.jsonData).subscribe(function (result) {
            var resultdata = JSON.parse(result);
            //===================SEND SMS TO Applicant ===============  
            //this.opprtunityservice.sendSMSToApplicant(this.sendToLoanHomiPreviewDetail.phone).subscribe((result: any) => {
            //  var SMSresultdata = JSON.parse(result);
            //})
            //========================================================
            //if (resultdata.Code == "Failure") {
            //  this.toaster.error(resultdata.StatusCode);
            //  this.loadSave = false;
            //  return  false;
            //}
            //if (result.statusCode == 200) {
            //if (resultdata.Code == "Success") {
            //  this.rDataLoanAppId = resultdata.LoanAppId;
            //  this.creditScoreCategory = resultdata.creditScoreCategory;
            //  this.IncomeVerificationValue = resultdata.IncomeVerificationValue;
            //  this.mandatoryDocuments = resultdata.MandatoryDocuments;
            //  this.openPopupSendToLoanHomi.hide();
            //  setTimeout(() => {
            //    this.responsePopUp.show();
            //    //this.toaster.success("Record Saved");  
            //    this.loadSave = false;
            //    //this.location.back();
            //  }, 1000);   
            //}
            _this.rUserName = resultdata.UserName;
            _this.rDataLoanAppId = resultdata.LoanAppId;
            _this.creditScoreCategory = resultdata.creditScoreCategory;
            _this.IncomeVerificationValue = resultdata.IncomeVerificationValue;
            _this.mandatoryDocuments = resultdata.MandatoryDocuments;
            console.log("resultdata", resultdata);
            if (resultdata.Code == null || resultdata.Code == "") {
                _this.toaster.error("Something went wrong please contact administrator.");
                _this.loadSave = false;
                return false;
            }
            if (resultdata.Code != "Failure") {
                if (resultdata.applicationStatus == "Failed") {
                    _this.openPopupSendToLoanHomi.hide();
                    _this.waringPopup.show();
                    _this.loadSave = false;
                }
                else {
                    _this.openPopupSendToLoanHomi.hide();
                    _this.responsePopUp.show();
                    _this.loadSave = false;
                }
            }
            else {
                _this.toaster.error(resultdata.StatusCode);
                _this.loadSave = false;
                return false;
            }
        }, function (error) {
            _this.loadSave = false;
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.keyPressNo = function (event) {
        var pattern = /[0-9\+\ ]/;
        //const pattern = /[0-9.\+\ ]/; --For decimal
        var inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar) && event.charCode != '0') {
            event.preventDefault();
        }
    };
    SendtoloanhomimodelpopupComponent.prototype.termCheck = function (event) {
        if (event == 'B') {
            this.isTermCheckBox.setValue(null);
            this.isTermCheckBox.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.isTermCheckBox.updateValueAndValidity();
        }
        else {
            this.isTermCheckBox.setValue(true);
            this.isTermCheckBox.clearValidators();
            this.isTermCheckBox.updateValueAndValidity();
        }
    };
    SendtoloanhomimodelpopupComponent.prototype.borrowersCheck = function (event) {
        if (event == 'B') {
            this.isBorrowers.setValue(null);
            this.isBorrowers.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].required]);
            this.isBorrowers.updateValueAndValidity();
        }
        else {
            this.isBorrowers.setValue(true);
            this.isBorrowers.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_3__["Validators"].nullValidator]);
            this.isBorrowers.updateValueAndValidity();
        }
    };
    SendtoloanhomimodelpopupComponent.prototype.closeResponsePopup = function () {
        this.responsePopUp.hide();
        this.loadSave = true;
        this.refreshEvent.emit('Yes');
        this.loadSave = false;
        // window.location.reload();
    };
    SendtoloanhomimodelpopupComponent.prototype.closeWaringPopup = function () {
        this.waringPopup.hide();
        this.loadSave = true;
        this.refreshEvent.emit('Yes');
        this.loadSave = false;
        // window.location.reload();
    };
    SendtoloanhomimodelpopupComponent.prototype.numberOnly = function (event) {
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode == 46) {
            this.dotCount += 1;
            this.checkNumberOnly = (event.target.value);
            var numericCheck = (event.target.value).toString();
            if (numericCheck.includes('.')) {
                this.dotCount += 1;
            }
            if (this.dotCount > 1) {
                this.dotCount = 0;
                return false;
            }
        }
        if (charCode > 31 && (charCode <= 45 || charCode > 57 || charCode == 47)) {
            return false;
        }
        this.checkNumberOnly = (event.target.value);
        if (this.checkNumberOnly != null) {
            var numeric = (event.target.value).toString();
            if (numeric.includes('.')) {
                var checkNumeric = numeric.split('.');
                if (checkNumeric.length > 2) {
                    return false;
                }
                this.checkString = checkNumeric[1].split('');
                if (this.checkString.length > 1) {
                    // this.toastrService.warning("Invalid value", "Warning");
                    return false;
                }
            }
        }
        this.dotCount = 0;
        return true;
    };
    SendtoloanhomimodelpopupComponent.prototype.onFocusOutEvent = function (event) {
        console.log(event);
        var emailAdd = event.target.value;
        console.log(event.target.value);
        this.CheckExistingEmail(emailAdd);
    };
    SendtoloanhomimodelpopupComponent.prototype.CheckExistingEmail = function (emailAdd) {
        var _this = this;
        var appEmail = this.resultData[0].Email;
        console.log("hngfjgfhjghgfh", appEmail);
        this.opprtunityservice.checkExistingEmailAddress(emailAdd).subscribe(function (result) {
            var resultData = JSON.parse(result.result); //convert strint to json// 
            console.log("resultData", resultData);
            if (resultData) {
                console.log("resultData1[0].FirstName", resultData.FirstName);
            }
            if (result.statusCode == 202) {
                _this.dialogService.existingEmail('Alert', 'Contact is already exists with this Email ID. If you click OK then existing contact details will be updated when you submit this form.').subscribe(function (confirmed) {
                    if (emailAdd == _this.resultData[0].Email) {
                        if (confirmed) { }
                        else {
                            _this.addSendTLoanHomiForm.patchValue({
                                email: ''
                            });
                        }
                    }
                    else {
                        if (confirmed) {
                            //console.log("bbbbbbbbbbb", confirmed); 
                            //console.log("mmmmmmmmmmmm", this.resultData[0].CoappEmail);
                            //if (this.resultData[0].CoappEmail != null)
                            //{
                            //  this.addSendTLoanHomiForm.patchValue({
                            //    coApp_firstName: this.resultData[0].Coappfirstname,
                            //    coApp_lastName: this.resultData[0].Coapplastname,
                            //    coApp_phone: this.resultData[0].CoappPhone,
                            //    coApp_mobile: this.resultData[0].CoappMobilePhone,
                            //    coApp_email: this.resultData[0].CoappEmail
                            //  });
                            //}
                            //else
                            //{
                            //  this.addSendTLoanHomiForm.patchValue({
                            //    coApp_firstName: resultData.FirstName,    
                            //    coApp_lastName: resultData.LastName,
                            //    coApp_phone: resultData.Phone,
                            //    coApp_mobile: resultData.MobilePhone,
                            //    coApp_email: resultData.Email
                            //  });
                            //}
                        }
                        else {
                            console.log("bbbbbbbbbbb", confirmed);
                            console.log("nnnnnnnnnnnnnn", _this.resultData[0].CoappEmail);
                            if (_this.resultData[0].CoappEmail != null) {
                                _this.addSendTLoanHomiForm.patchValue({
                                    //coApp_firstName: this.resultData[0].Coappfirstname,
                                    //coApp_lastName: this.resultData[0].Coapplastname,
                                    //coApp_phone: this.resultData[0].CoappPhone, 
                                    //coApp_mobile: this.resultData[0].CoappMobilePhone,
                                    coApp_email: ''
                                });
                            }
                            else {
                                _this.addSendTLoanHomiForm.patchValue({
                                    //coApp_firstName:'',
                                    //coApp_lastName: '',
                                    //coApp_phone: '',
                                    //coApp_mobile: '',
                                    coApp_email: ''
                                });
                            }
                        }
                    }
                    //else {
                    //  this.userProfileForm.patchValue({ email: this.userProfileForm.value.hdnEmail });
                    //}
                });
            }
        });
    };
    SendtoloanhomimodelpopupComponent.prototype.checkAge = function (control) {
        debugger;
        var value = control.value;
        console.log("value", value);
        if (value != null && value != "") {
            var selectedDate = moment__WEBPACK_IMPORTED_MODULE_7___default()(value, 'MM/DD/YYYY');
            console.log("selectedDate", selectedDate);
            var today = moment__WEBPACK_IMPORTED_MODULE_7___default()();
            console.log("today", today);
            var years = today.diff(selectedDate, 'years');
            console.log("years", years);
            if (years < 18) {
                return { 'lessthan18': true };
            }
        }
        else {
            return { 'required': true };
        }
        return null;
    };
    SendtoloanhomimodelpopupComponent.ctorParameters = function () { return [
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"] },
        { type: ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"] },
        { type: _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"] },
        { type: _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_5__["ManageUserService"] },
        { type: _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_8__["DecimalPipe"] },
        { type: _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogService"] }
    ]; };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('openSendToLoanHomiPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], SendtoloanhomimodelpopupComponent.prototype, "openPopupSendToLoanHomi", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('ResponsePopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], SendtoloanhomimodelpopupComponent.prototype, "responsePopUp", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('WaringPopup', { static: false }),
        __metadata("design:type", ngx_bootstrap_modal__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"])
    ], SendtoloanhomimodelpopupComponent.prototype, "waringPopup", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], SendtoloanhomimodelpopupComponent.prototype, "refreshEvent", void 0);
    SendtoloanhomimodelpopupComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sendtoloanhomimodelpopup',
            template: __importDefault(__webpack_require__(/*! raw-loader!./sendtoloanhomimodelpopup.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/views/opportunity/sendtoloanhomimodelpopup/sendtoloanhomimodelpopup.component.html")).default
        }),
        __metadata("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"],
            ngx_toastr__WEBPACK_IMPORTED_MODULE_6__["ToastrService"],
            _shared_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _manageuser_addedituser_service__WEBPACK_IMPORTED_MODULE_5__["ManageUserService"],
            _opportunitylist_service__WEBPACK_IMPORTED_MODULE_2__["OpportunityListService"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_common__WEBPACK_IMPORTED_MODULE_8__["DecimalPipe"],
            _shared_confirmation_dialog_confirmation_dialog_service__WEBPACK_IMPORTED_MODULE_9__["ConfirmationDialogService"]])
    ], SendtoloanhomimodelpopupComponent);
    return SendtoloanhomimodelpopupComponent;
}());



/***/ })

}]);
//# sourceMappingURL=views-opportunity-opportunity-module.js.map