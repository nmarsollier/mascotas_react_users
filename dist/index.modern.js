import { environment, useErrorHandler, GlobalContent, FormTitle, Form, FormInput, FormPassword, DangerLabel, FormButtonBar, FormAcceptButton, FormButton, goHome } from 'mascotas_react_common';
import { securedAxios, updateStoreToken, updateStoreUser, cleanupStore } from 'mascotas_react_store';
import React, { useState } from 'react';

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
      return Promise.resolve(securedAxios().post(environment.backendUrl + "/v1/user/password", payload)).then(function (res) {
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
      return Promise.resolve(securedAxios().post(environment.backendUrl + "/v1/user", payload)).then(function (res) {
        updateStoreToken(res.data.token);
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
      return Promise.resolve(securedAxios().get(environment.backendUrl + "/v1/users/current")).then(function (res) {
        localStorage.setItem("user", res.data);
        updateStoreUser(res.data);
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
      return Promise.resolve(securedAxios().post(environment.backendUrl + "/v1/user/signin", payload)).then(function (res) {
        updateStoreToken(res.data.token);
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
        return Promise.resolve(securedAxios().get(environment.backendUrl + "/v1/user/signout")).then(function () {
          return Promise.resolve();
        });
      }, function () {
        return Promise.resolve();
      });
    }, function (_wasThrown, _result) {
      cleanupStore();
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
    updateStoreToken(currentToken);
    updateStoreUser(currentUser);
    reloadCurrentUser().then();
  }
}

function LoginUser(props) {
  var _useState = useState(""),
      userName = _useState[0],
      setUserName = _useState[1];

  var _useState2 = useState(""),
      password = _useState2[0],
      setPassword = _useState2[1];

  var errorHandler = useErrorHandler();

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
          goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(GlobalContent, null, /*#__PURE__*/React.createElement(FormTitle, null, "Login"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormInput, {
    label: "Usuario",
    name: "login",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setUserName(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormPassword, {
    label: "Password",
    name: "password",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setPassword(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React.createElement(FormButtonBar, null, /*#__PURE__*/React.createElement(FormAcceptButton, {
    label: "Login",
    onClick: loginClick
  }), /*#__PURE__*/React.createElement(FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return goHome(props);
    }
  }))));
}

function ChangeUserPassword(props) {
  var _useState = useState(""),
      currentPassword = _useState[0],
      setCurrentPassword = _useState[1];

  var _useState2 = useState(""),
      newPassword = _useState2[0],
      setNewPassword = _useState2[1];

  var _useState3 = useState(""),
      newPassword2 = _useState3[0],
      setNewPassword2 = _useState3[1];

  var errorHandler = useErrorHandler();

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
          goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(GlobalContent, null, /*#__PURE__*/React.createElement(FormTitle, null, "Cambiar Password"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormPassword, {
    label: "Password Actual",
    name: "currentPassword",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setCurrentPassword(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormPassword, {
    label: "Nuevo Password",
    name: "newPassword",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setNewPassword(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormPassword, {
    label: "Repetir Password",
    name: "newPassword2",
    errorHandler: errorHandler,
    onChange: function onChange(event) {
      return setNewPassword2(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React.createElement(FormButtonBar, null, /*#__PURE__*/React.createElement(FormAcceptButton, {
    label: "Cambiar",
    onClick: updatePasswordClick
  }), /*#__PURE__*/React.createElement(FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return goHome(props);
    }
  }))));
}

function RegisterUser(props) {
  var _useState = useState(""),
      login = _useState[0],
      setLogin = _useState[1];

  var _useState2 = useState(""),
      name = _useState2[0],
      setName = _useState2[1];

  var _useState3 = useState(""),
      password = _useState3[0],
      setPassword = _useState3[1];

  var _useState4 = useState(""),
      password2 = _useState4[0],
      setPassword2 = _useState4[1];

  var errorHandler = useErrorHandler();

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
          goHome(props);
        });
      }, function (error) {
        errorHandler.processRestValidations(error);
      });

      return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return /*#__PURE__*/React.createElement(GlobalContent, null, /*#__PURE__*/React.createElement(FormTitle, null, "Registrar Usuario"), /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormInput, {
    label: "Login",
    name: "login",
    value: login,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setLogin(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormInput, {
    label: "Usuario",
    name: "name",
    value: name,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setName(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormPassword, {
    label: "Password",
    name: "password",
    value: password,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setPassword(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(FormPassword, {
    label: "Repetir Password",
    name: "password2",
    value: password2,
    errorHandler: errorHandler,
    onChange: function onChange(e) {
      return setPassword2(e.target.value);
    }
  }), /*#__PURE__*/React.createElement(DangerLabel, {
    message: errorHandler.errorMessage
  }), /*#__PURE__*/React.createElement(FormButtonBar, null, /*#__PURE__*/React.createElement(FormAcceptButton, {
    label: "Registrarse",
    onClick: registerClick
  }), /*#__PURE__*/React.createElement(FormButton, {
    label: "Cancelar",
    onClick: function onClick() {
      return goHome(props);
    }
  }))));
}

export { ChangeUserPassword, LoginUser, RegisterUser, changePassword, getCurrentToken, getCurrentUser, login, logout, newUser, reloadCurrentUser };
//# sourceMappingURL=index.modern.js.map
