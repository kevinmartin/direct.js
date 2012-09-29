/*!
 * Direct.js JavaScript Library v0.1.1
 * https://github.com/KevinMartin/direct.js
 *
 * Copyright 2012 Kevin Martin and other contributors
 * Released under the MIT license
 * https://github.com/KevinMartin/direct.js/blob/master/LICENSE
 */
window._ = window.direct = (function (window, document) {
	var lib		= {},
		loaded	= false,
		onload	= function (func) { // IE7+, FF, Chrome, Safari, WebKit
			if (document.addEventListener) {
				document.addEventListener("DOMContentLoaded", func, false);
				window.addEventListener("load", func, false);
			} else if (document.attachEvent) {
				document.attachEvent("onreadystatechange", func);
				window.attachEvent("onload", func);
			}
		},
		call = function (controller, action, common) { // call(controller, action[, common = true])
			if (!!lib[controller]) {
				if (common !== false && !!lib[controller].common && action !== "common") {
					lib[controller].common.call(lib.utils, lib.utils);
				}

				if (!!lib[controller][action]) {
					lib[controller][action].call(lib.utils, lib.utils);
				}
			}
		},
		direct = function (controller, action, func) { // direct(controller[, action = 'common'], function|object)
			var i, save;

			if (!controller) {
				return lib.utils;
			}

			if (!func) {
				if (typeof action === "object") {
					for (i in action) {
						if (action.hasOwnProperty(i)) {
							direct(controller, i, action[i]);
						}
					}

					return;
				}

				func	= action;
				action	= "common";
			}

			if (typeof controller !== "string" || typeof action !== "string") {
				return false;
			}

			lib[controller] = lib[controller] || {};

			if (!!lib[controller][action] && typeof lib[controller][action] === "function") {
				save					= lib[controller][action];
				lib[controller][action]	= function () { save(); func(); };
			} else {
				lib[controller][action] = func;
			}
		};

	onload(function () {
		if (!loaded && (loaded = true)) {
			var controller	= document.body.getAttribute("data-controller"),
				action		= document.body.getAttribute("data-action");

			call("utils", "common");
			call(controller, action);
		}
	});

	if (typeof define === "function") {
		define("direct", [], function () { return direct; });
	}

	return direct;
}(window, document));

