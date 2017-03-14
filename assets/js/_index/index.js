/*
	 * author  : fzq
	 * email   : fzq@feiniu.com
	*/
	
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	// Generated by CoffeeScript 1.9.3
	(function () {
		var $_, $_C, Index, Mub, Perf, PureRenderMixin, Uls, Versions;

		React.initializeTouchEvents(true);

		PureRenderMixin = React.addons.PureRenderMixin;

		Perf = React.addons.Perf;

		$_ = React.DOM;

		$_C = React.createElement;

		Versions = React.createClass({
			displayName: 'Versions',
			onclick: function onclick(event) {
				var $this;
				$this = $(event.target);
				return React.render($_C(Index, {
					lect: $this.html()
				}), document.getElementById('panel'));
			},
			render: function render() {
				var cx, self;
				self = this;
				cx = React.addons.classSet;
				return $_.ul({
					className: 'list-inline'
				}, _.map(self.props.data, function (v, i) {
					var _css;
					_css = cx({
						'btn': true,
						'btn-success': i === self.props.lect,
						'btn-default': !(i === self.props.lect)
					});
					return $_.li({
						className: _css,
						onClick: self.onclick
					}, i);
				}));
			}
		});

		Mub = React.createClass({
			displayName: 'Mub',
			render: function render() {
				var self;
				self = this;
				return $_.div({}, _.map(self.props.data, function (item, i) {
					var _pul, _svn, _title, _ul;
					_svn = item.svn;
					if (!self.props.s_go) {
						_svn = _.filter(_svn, function (item) {
							return item.title.indexOf('<s>') === -1;
						});
					}
					_ul = $_C(Uls, {
						svn: _svn
					});
					_pul = '';
					_title = item.name + '(' + (_sm[item.name] || '') + ')';
					if (item.plist.length) {
						_pul = $_C(Mub, {
							data: item.plist,
							s_go: self.props.s_go
						});
					}
					if (!_.isEmpty(_svn) || _pul && _pul._owner && _pul._owner._context) {
						console.log(_pul);
						return $_.div({
							className: 'panel panel-default',
							ref: 'myInput'
						}, $_.div({
							className: 'panel-heading'
						}, $_.div({
							className: 'btn btn-danger'
						}, _title)), $_.div({
							className: 'panel-body'
						}, _ul, _pul));
					}
				}));
			}
		});

		Uls = React.createClass({
			displayName: 'Uls',
			render: function render() {
				var self;
				self = this;
				return $_.ul({
					className: 'nav nav-tabs'
				}, _.map(self.props.svn, function (item) {
					return $_.li({
						key: item.url
					}, $_.a({
						href: item.url,
						target: 'block',
						dangerouslySetInnerHTML: {
							__html: item.title
						}
					}), $_.small({}, item.name));
				}));
			}
		});

		Index = React.createClass({
			displayName: 'Index',

			cache: {
				key: false,
				data: false,
				lect: false
			},
			getInitialState: function getInitialState() {
				return {
					data: '',
					key: '',
					s_go: false
				};
			},
			dispose: function dispose(data) {
				var self;
				self = this;
				_.each(data, function (v) {
					if (!v.name) {
						return _.each(v, function (v2) {
							self.dispose(v2.plist);
							return v2.svn = self.dispose_svn(v2.svn);
						});
					} else {
						self.dispose(v.plist);
						return v.svn = self.dispose_svn(v.svn);
					}
				});
				return data;
			},
			dispose_svn: function dispose_svn(v) {
				return _.chain(v).sortBy('name').sortBy(function (a) {
					if (a.title.indexOf('<s>') === -1) {
						return 1;
					} else {
						return 99;
					}
				}).value();
			},
			onChange: function onChange(event) {
				var $this, self;
				self = this;
				$this = $(event.target);
				_.extend(self.state, {
					key: $this.val()
				});
				return self.setState(self.state);
			},
			onClick: function onClick(event) {
				var self;
				self = this;
				_.extend(self.state, {
					s_go: !self.state.s_go
				});
				return self.setState(self.state);
			},
			componentDidMount: function componentDidMount() {
				var self;
				self = this;
				return $.get('assets/json/pp.json', function (result) {
					if (self.isMounted()) {
						_.extend(self.state, {
							data: self.dispose(result)
						});
						self.setState(self.state);
						return scrollTop();
					}
				}, 'json');
			},
			keyfilter: function keyfilter(data) {
				var _key, self;
				self = this;
				_key = self.state.key;
				if (_key) {
					data = _.filter(data, function (v) {
						if (v.plist.length) {
							v.plist = self.keyfilter(v.plist);
						}
						if (v.name.indexOf(_key) === -1) {
							v.svn = _.filter(v.svn, function (v2) {
								return v2.title.indexOf(_key) !== -1 || v2.name.indexOf(_key) !== -1;
							});
							if (v.svn.length || v.plist.length) {
								return v;
							}
						} else {
							return v;
						}
					});
				}
				return data;
			},
			render: function render() {
				var _data, _on, self;
				self = this;
				_data = self.state.data;
				_on = self.props.lect || sessionStorage.lect || _.keys(_data)[0];
				_on && (sessionStorage.lect = _on);
				if (self.cache.key !== self.state.key || self.cache.lect !== _on || _.isEmpty(self.cache.data)) {
					_data = self.keyfilter($.extend(true, {}, _data[_on]));
					self.cache.key = self.state.key;
					self.cache.data = _data;
					self.cache.lect = _on;
				} else {
					_data = self.cache.data;
				}
				React.render($_C(Versions, {
					data: self.state.data,
					lect: _on
				}), document.getElementById('versions'));
				return $_.div({}, $_.div({
					className: 'input-group'
				}, $_.span({
					className: 'input-group-btn'
				}, $_.button({
					className: 'btn btn-default',
					type: 'button',
					onClick: self.onClick
				}, '显示弃用文件')), $_.input({
					type: 'text',
					className: 'form-control',
					'placeholder': '关键词',
					onChange: self.onChange
				})), $_.br({}), $_C(Mub, {
					data: _data,
					s_go: self.state.s_go
				}));
			}
		});

		React.render($_C(Index), document.getElementById('panel'));
	}).call(undefined);

/***/ }
/******/ ]);