function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var mascotas_react_common = require('mascotas_react_common');
var mascotas_react_store = require('mascotas_react_store');
var React = require('react');
var React__default = _interopDefault(React);

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var changePassword = function changePassword(payload) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(mascotas_react_store.securedAxios().post(mascotas_react_common.environment.backendUrl + "/v1/user/password", payload)).then(function (res) {
        return Promise.resolve(res.data);
      });
    }, function (err) {
      if (err && err.response && err.response.status === 401) {
        logout();
      }

      return Promise.reject(err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var newUser = function newUser(payload) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(mascotas_react_store.securedAxios().post(mascotas_react_common.environment.backendUrl + "/v1/user", payload)).then(function (res) {
        mascotas_react_store.updateStoreToken(res.data.token);
        setCurrentToken(res.data.token);
        reloadCurrentUser().then();
        return Promise.resolve(res.data);
      });
    }, function (err) {
      return Promise.reject(err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var reloadCurrentUser = function reloadCurrentUser() {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(mascotas_react_store.securedAxios().get(mascotas_react_common.environment.backendUrl + "/v1/users/current")).then(function (res) {
        localStorage.setItem("user", res.data);
        mascotas_react_store.updateStoreUser(res.data);
        return Promise.resolve(res.data);
      });
    }, function (err) {
      if (err && err.response && err.response.status === 401) {
        logout();
      }

      return Promise.reject(err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var login = function login(payload) {
  try {
    return Promise.resolve(_catch(function () {
      return Promise.resolve(mascotas_react_store.securedAxios().post(mascotas_react_common.environment.backendUrl + "/v1/user/signin", payload)).then(function (res) {
        mascotas_react_store.updateStoreToken(res.data.token);
        setCurrentToken(res.data.token);
        reloadCurrentUser().then();
        return Promise.resolve(res.data);
      });
    }, function (err) {
      return Promise.reject(err);
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
var logout = function logout() {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return Promise.resolve(_finallyRethrows(function () {
      return _catch(function () {
        return Promise.resolve(mascotas_react_store.securedAxios().get(mascotas_react_common.environment.backendUrl + "/v1/user/signout")).then(function () {
          return Promise.resolve();
        });
      }, function () {
        return Promise.resolve();
      });
    }, function (_wasThrown, _result) {
      mascotas_react_store.cleanupStore();
      if (_wasThrown) throw _result;
      return _result;
    }));
  } catch (e) {
    return Promise.reject(e);
  }
};
function getCurrentToken() {
  var result = localStorage.getItem("token");
  return result ? result : undefined;
}

function setCurrentToken(token) {
  localStorage.setItem("token", token);
}

function getCurrentUser() {
  return localStorage.getItem("user");
}

if (getCurrentToken() !== undefined) {
  var currentToken = getCurrentToken();
  var currentUser = getCurrentUser();

  if (currentToken !== undefined && currentUser !== undefined) {
    mascotas_react_store.updateStoreToken(currentToken);
    mascotas_react_store.updateStoreUser(currentUser);
    reloadCurrentUser().then();
  }
}

function LoginUser(props) {
  var _useState = React.useState(""),
      userName = _useState[0],
      setUserName = _useState[1];

  var _useState2 = React.useState(""),
      password = _useState2[0],
      setPassword = _useState2[1];

  var errorHandler = mascotas_react_common.useErrorHandler();

  var loginClick = function loginClick() {
    try {
      errorHandler.cleanRestValidations();

      if (!userName) {
        errorHandler.addError("login", "No puede estar vacío");
      }

      if (!password) {
        errorHandler.addError("password", "No puede estar vacío");
      }

      if (errorHandler.hasErrors()) {
        return Promise.resolve();
      }

      var _temp2 = _catch(function () {
        return Promise.resolve(login({
          login: userName,
          password: password
        })).then(function () {
          mascotas_react_common.goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(mascotas_react_common.GlobalContent, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormTitle, null, "Login"), /*#__PURE__*/React__default.createElement(mascotas_react_common.Form, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormInput, {
    label: "Usuario",
    name: "login",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setUserName(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Password",
    name: "password",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setPassword(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButtonBar, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormAcceptButton, {
    label: "Login",
    onClick: loginClick
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return mascotas_react_common.goHome(props);
    }
  }))));
}

function ChangeUserPassword(props) {
  var _useState = React.useState(""),
      currentPassword = _useState[0],
      setCurrentPassword = _useState[1];

  var _useState2 = React.useState(""),
      newPassword = _useState2[0],
      setNewPassword = _useState2[1];

  var _useState3 = React.useState(""),
      newPassword2 = _useState3[0],
      setNewPassword2 = _useState3[1];

  var errorHandler = mascotas_react_common.useErrorHandler();

  var updatePasswordClick = function updatePasswordClick() {
    try {
      errorHandler.cleanRestValidations();

      if (!currentPassword) {
        errorHandler.addError("currentPassword", "No puede estar vacío");
      }

      if (!newPassword) {
        errorHandler.addError("newPassword", "No puede estar vacío");
      }

      if (newPassword !== newPassword2) {
        errorHandler.addError("newPassword2", "Las contraseñas no coinciden");
      }

      if (errorHandler.hasErrors()) {
        return Promise.resolve();
      }

      var _temp2 = _catch(function () {
        return Promise.resolve(changePassword({
          currentPassword: currentPassword,
          newPassword: newPassword
        })).then(function () {
          mascotas_react_common.goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(mascotas_react_common.GlobalContent, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormTitle, null, "Cambiar Password"), /*#__PURE__*/React__default.createElement(mascotas_react_common.Form, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Password Actual",
    name: "currentPassword",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setCurrentPassword(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Nuevo Password",
    name: "newPassword",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setNewPassword(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Repetir Password",
    name: "newPassword2",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setNewPassword2(event.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButtonBar, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormAcceptButton, {
    label: "Cambiar",
    onClick: updatePasswordClick
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return mascotas_react_common.goHome(props);
    }
  }))));
}

function RegisterUser(props) {
  var _useState = React.useState(""),
      login = _useState[0],
      setLogin = _useState[1];

  var _useState2 = React.useState(""),
      name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = React.useState(""),
      password = _useState3[0],
      setPassword = _useState3[1];

  var _useState4 = React.useState(""),
      password2 = _useState4[0],
      setPassword2 = _useState4[1];

  var errorHandler = mascotas_react_common.useErrorHandler();

  var registerClick = function registerClick() {
    try {
      errorHandler.cleanRestValidations();

      if (!login) {
        errorHandler.addError("login", "No puede estar vacío");
      }

      if (!name) {
        errorHandler.addError("name", "No puede estar vacío");
      }

      if (!password) {
        errorHandler.addError("password", "No puede estar vacío");
      }

      if (password !== password2) {
        errorHandler.addError("password2", "Las contraseñas no coinciden");
      }

      if (errorHandler.hasErrors()) {
        return Promise.resolve();
      }

      var _temp2 = _catch(function () {
        return Promise.resolve(newUser({
          login: login,
          name: name,
          password: password
        })).then(function () {
          mascotas_react_common.goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React__default.createElement(mascotas_react_common.GlobalContent, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormTitle, null, "Registrar Usuario"), /*#__PURE__*/React__default.createElement(mascotas_react_common.Form, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormInput, {
    label: "Login",
    name: "login",
    value: login,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setLogin(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormInput, {
    label: "Usuario",
    name: "name",
    value: name,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Password",
    name: "password",
    value: password,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormPassword, {
    label: "Repetir Password",
    name: "password2",
    value: password2,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setPassword2(e.target.value);
    }
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButtonBar, null, /*#__PURE__*/React__default.createElement(mascotas_react_common.FormAcceptButton, {
    label: "Registrarse",
    onClick: registerClick
  }), /*#__PURE__*/React__default.createElement(mascotas_react_common.FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return mascotas_react_common.goHome(props);
    }
  }))));
}

exports.ChangeUserPassword = ChangeUserPassword;
exports.LoginUser = LoginUser;
exports.RegisterUser = RegisterUser;
exports.changePassword = changePassword;
exports.getCurrentToken = getCurrentToken;
exports.getCurrentUser = getCurrentUser;
exports.login = login;
exports.logout = logout;
exports.newUser = newUser;
exports.reloadCurrentUser = reloadCurrentUser;
//# sourceMappingURL=index.js.map
