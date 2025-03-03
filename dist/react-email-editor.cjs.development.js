'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex;
}

var React = require('react');
var React__default = _interopDefault(React);

function _extends() {
	_extends = Object.assign ? Object.assign.bind() : function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};
	return _extends.apply(this, arguments);
}

var name = 'react-email-editor';
var version = '1.7.6';
var description = 'Unlayer\'s Email Editor Component for React.js';
var main = 'dist/index.js';
var typings = 'dist/index.d.ts';
var files = [
	'dist',
	'src',
];
var engines = {
	node: '>=10',
};
var scripts = {
	start: 'tsdx watch',
	build: 'tsdx build',
	test: 'tsdx test',
	'test:watch': 'tsdx test --watch',
	'test:coverage': 'tsdx test --coverage',
	lint: 'tsdx lint',
	prepare: 'tsdx build',
	release: 'npm run build && npm publish',
	'netlify-build': 'cd demo && npm install && npm run build',
};
var peerDependencies = {
	react: '>=15',
};
var husky = {
	hooks: {
		'pre-commit': 'tsdx lint',
	},
};
var devDependencies = {
	'@rollup/plugin-replace': '^5.0.2',
	'@testing-library/react': '^13.4.0',
	'@types/react': '^18.0.27',
	'@types/react-dom': '^18.0.10',
	husky: '^8.0.3',
	react: '^18.2.0',
	'react-dom': '^18.2.0',
	tsdx: '^0.14.1',
	tslib: '^2.4.1',
	typescript: '^4.9.4',
};
var author = '';
var homepage = 'https://github.com/unlayer/react-email-editor#readme';
var license = 'MIT';
var repository = 'https://github.com/unlayer/react-email-editor.git';
var keywords = [
	'react-component',
];
var pkg = {
	name: name,
	version: version,
	description: description,
	main: main,
	typings: typings,
	files: files,
	engines: engines,
	scripts: scripts,
	peerDependencies: peerDependencies,
	husky: husky,
	devDependencies: devDependencies,
	author: author,
	homepage: homepage,
	license: license,
	repository: repository,
	keywords: keywords,
};

var defaultScriptUrl = 'https://editor.unlayer.com/embed.js?2';
var callbacks = [];
var loaded = false;
var isScriptInjected = function isScriptInjected(scriptUrl) {
	var scripts = document.querySelectorAll('script');
	var injected = false;
	scripts.forEach(function(script) {
		if (script.src.includes(scriptUrl)) {
			injected = true;
		}
	});
	return injected;
};
var addCallback = function addCallback(callback) {
	callbacks.push(callback);
};
var runCallbacks = function runCallbacks() {
	if (loaded) {
		var callback;
		while (callback = callbacks.shift()) {
			callback();
		}
	}
};
var loadScript = function loadScript(callback, scriptUrl) {
	if (scriptUrl === void 0) {
		scriptUrl = defaultScriptUrl;
	}
	addCallback(callback);
	if (!isScriptInjected(scriptUrl)) {
		var embedScript = document.createElement('script');
		embedScript.setAttribute('src', scriptUrl);
		embedScript.onload = function() {
			loaded = true;
			runCallbacks();
		};
		document.head.appendChild(embedScript);
	} else {
		runCallbacks();
	}
};

var lastEditorId = 0;
var EmailEditor = /*#__PURE__*/React__default.forwardRef(function(props, ref) {
	var onLoad = props.onLoad,
	onReady = props.onReady,
	scriptUrl = props.scriptUrl,
	_props$minHeight = props.minHeight,
	minHeight = _props$minHeight === void 0 ? 500 : _props$minHeight,
	_props$style = props.style,
	style = _props$style === void 0 ? {} : _props$style;
	var editorId = React.useRef(props.editorId || 'editor-' + ++lastEditorId);
	var isLoadedRef = React.useRef(false);
	var _useState = React.useState(null),
	editor = _useState[0],
	setEditor = _useState[1];
	var loadEditor = React.useCallback(function() {
		if (isLoadedRef.current) return;
		isLoadedRef.current = true;
		var options = props.options || {};
		if (props.projectId) options.projectId = props.projectId;
		if (props.tools) options.tools = props.tools;
		if (props.appearance) options.appearance = props.appearance;
		if (props.locale) options.locale = props.locale;
		setEditor(unlayer.createEditor(_extends({}, options, {
			id: editorId.current,
			displayMode: 'email',
			source: {
				name: pkg.name,
				version: pkg.version,
			},
		})));
	}, [editorId.current, props.appearance, props.locale, props.options, props.projectId, props.tools]);
	var addEventListener = React.useCallback(function(type, callback) {
		editor == null ? void 0 : editor.addEventListener(type, callback);
	}, [editor]);
	var removeEventListener = React.useCallback(function(type, callback) {
		editor == null ? void 0 : editor.removeEventListener(type, callback);
	}, [editor]);
	var registerCallback = React.useCallback(function(type, callback) {
		editor == null ? void 0 : editor.registerCallback(type, callback);
	}, [editor]);
	var loadDesign = React.useCallback(function(design) {
		editor == null ? void 0 : editor.loadDesign(design);
	}, [editor]);
	var saveDesign = React.useCallback(function(callback) {
		editor == null ? void 0 : editor.saveDesign(callback);
	}, [editor]);
	var exportHtml = React.useCallback(function(callback, options) {
		editor == null ? void 0 : editor.exportHtml(callback, options);
	}, [editor]);
	var exportImage = React.useCallback(function(callback) {
		editor == null ? void 0 : editor.exportImage(callback);
	}, [editor]);
	var setMergeTags = React.useCallback(function(mergeTags) {
		editor == null ? void 0 : editor.setMergeTags(mergeTags);
	}, [editor]);
	var loadBlank = React.useCallback(function(options) {
		editor == null ? void 0 : editor.loadBlank(options);
	}, [editor]);
	React.useEffect(function() {
		loadScript(loadEditor, scriptUrl);
	}, [loadEditor, scriptUrl]);
	React.useEffect(function() {
		if (!editor) return;
		// All properties starting with on[Name] are registered as event listeners.
		for (var _i = 0, _Object$entries = Object.entries(props); _i < _Object$entries.length; _i++) {
			var _Object$entries$_i = _Object$entries[_i],
			key = _Object$entries$_i[0],
			value = _Object$entries$_i[1];
			if (/^on/.test(key) && key !== 'onLoad' && key !== 'onReady') {
				addEventListener(key, value);
			}
		}
		// @deprecated
		onLoad && onLoad();
		if (onReady) editor.addEventListener('editor:ready', onReady);
	}, [editor, addEventListener, onLoad, onReady, props]);
	React.useImperativeHandle(ref, function() {
		return {
			saveDesign: saveDesign,
			exportHtml: exportHtml,
			setMergeTags: setMergeTags,
			editor: editor,
			loadDesign: loadDesign,
			registerCallback: registerCallback,
			addEventListener: addEventListener,
			loadBlank: loadBlank,
			exportImage: exportImage,
			removeEventListener: removeEventListener,
		};
	}, [saveDesign, exportHtml, setMergeTags, editor, loadDesign, registerCallback, addEventListener, loadBlank, exportImage, removeEventListener]);
	return React__default.createElement('div', {
		style: {
			flex: 1,
			display: 'flex',
			minHeight: minHeight,
		},
	}, React__default.createElement('div', {
		id: editorId.current,
		style: _extends({}, style, {
			flex: 1,
		}),
	}));
});

exports.EmailEditor = EmailEditor;
exports.default = EmailEditor;
//# sourceMappingURL=react-email-editor.cjs.development.js.map
