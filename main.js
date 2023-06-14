(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,n(o.key),o)}}function r(e,t,r){return(t=n(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(t){var r=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===e(r)?r:String(r)}var o=function(){function e(t){var n=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r(this,"getInitialCards",(function(){return n.request("".concat(n.baseUrl,"/cards"),{headers:n.headers})})),r(this,"getProfileInfo",(function(){return n.request("".concat(n.baseUrl,"/users/me"),{headers:n.headers})})),r(this,"setProfileInfo",(function(e,t){return n.request("".concat(n.baseUrl,"/users/me"),{method:"PATCH",headers:n.headers,body:JSON.stringify({name:"".concat(e),about:"".concat(t)})})})),r(this,"addNewCardServer",(function(e,t){return n.request("".concat(n.baseUrl,"/cards"),{method:"POST",headers:n.headers,body:JSON.stringify({name:"".concat(e),link:"".concat(t)})})})),r(this,"deleteCardServer",(function(e){return n.request("".concat(n.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:n.headers})})),r(this,"setLike",(function(e){return n.request("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:n.headers})})),r(this,"deleteLike",(function(e){return n.request("".concat(n.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:n.headers})})),r(this,"setAvatar",(function(e){return n.request("".concat(n.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:n.headers,body:JSON.stringify({avatar:"".concat(e)})})})),this.baseUrl=t.baseUrl,this.headers=t.headers}var n,o;return n=e,(o=[{key:"getResponse",value:function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.statusText))}},{key:"request",value:function(e,t){return fetch(e,t).then(this.getResponse).catch((function(e){return console.log(e)}))}}])&&t(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}();function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function u(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,s(n.key),n)}}function a(e,t,r){return t&&u(e.prototype,t),r&&u(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function c(e,t,r){return(t=s(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(e){var t=function(e,t){if("object"!==i(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==i(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===i(t)?t:String(t)}var l=a((function e(t,r,n,o){var i=this,u=t.nameSelector,a=t.jobSelector,s=t.avatarSelector;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),c(this,"getUserInfo",(function(){return{name:i.profileName.textContent,about:i.profileJob.textContent,userId:i.profileName.dataset.userId}})),c(this,"setUserInfo",(function(e){var t=e.name,r=e.about;return i._setProfileInfo(t,r).then((function(e){i.profileName.textContent=e.name,i.profileJob.textContent=e.about}))})),c(this,"setUserAvatar",(function(e){var t=e.url;return i._setAvatar(t).then((function(e){i.profileAvatar.style.backgroundImage="url(".concat(e.avatar,")")}))})),this.profileName=document.querySelector(u),this.profileJob=document.querySelector(a),this.profileAvatar=document.querySelector(s),this._setProfileInfo=n,this._setAvatar=o,r().then((function(e){i.profileName.textContent=e.name,i.profileJob.textContent=e.about,i.profileAvatar.style.backgroundImage="url(".concat(e.avatar,")"),i.profileName.dataset.userId=e._id}))}));function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==f(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==f(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===f(o)?o:String(o)),n)}var o}var d=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._formSelector=t.formSelector,this._inputSelector=t.inputSelector,this._submitButtonSelector=t.submitButtonSelector,this._inputErrorClass=t.inputErrorClass}var t,r;return t=e,(r=[{key:"_hasInvalidInput",value:function(e){return e.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e,t){e.classList.add(this._inputErrorClass),t.textContent=e.validationMessage}},{key:"_hideInputError",value:function(e,t){e.classList.remove(this._inputErrorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e,t){e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?this._hideInputError(e,t):this._showInputError(e,t)}},{key:"toggleButtonState",value:function(e,t){t.disabled=this._hasInvalidInput(e)}},{key:"_setEventListeners",value:function(e){var t=this,r=Array.from(e.querySelectorAll(this._inputSelector)),n=e.querySelector(this._submitButtonSelector);this.toggleButtonState(r,n),r.forEach((function(o){return o.addEventListener("input",(function(){var i=e.querySelector(".".concat(o.name,"-input-error"));t._checkInputValidity(o,i),t.toggleButtonState(r,n)}))}))}},{key:"enableValidation",value:function(){var e=this;Array.from(document.querySelectorAll(this._formSelector)).forEach((function(t){e._setEventListeners(t)}))}}])&&p(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function y(e){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},y(e)}function m(){return m="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(e,t,r){var n=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=_(e)););return e}(e,t);if(n){var o=Object.getOwnPropertyDescriptor(n,t);return o.get?o.get.call(arguments.length<3?e:r):o.value}},m.apply(this,arguments)}function h(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&v(e,t)}function v(e,t){return v=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},v(e,t)}function b(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=_(e);if(t){var o=_(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return function(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}(this,r)}}function _(e){return _=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},_(e)}function S(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function g(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,E(n.key),n)}}function k(e,t,r){return t&&g(e.prototype,t),r&&g(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function w(e,t,r){return(t=E(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function E(e){var t=function(e,t){if("object"!==y(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==y(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===y(t)?t:String(t)}var I=function(){function e(t){var r=this;S(this,e),w(this,"_handleEsc",(function(e){"Escape"===e.key&&r.close(document.querySelector(".popup_opened"))})),w(this,"_handleOverlayClose",(function(e){e.target.className.includes("popup_opened")&&r.close(e.target)})),this._element=document.querySelector(t)}return k(e,[{key:"open",value:function(){this._element.classList.add("popup_opened"),this.setEventListeners()}},{key:"close",value:function(){this._element.classList.remove("popup_opened"),this.removeEventListeners()}},{key:"setEventListeners",value:function(){document.addEventListener("keydown",this._handleEsc),this._element.addEventListener("click",this._handleOverlayClose),this._element.querySelector(".popup__close").addEventListener("click",this.close.bind(this))}},{key:"removeEventListeners",value:function(){document.removeEventListener("keydown",this._handleEsc),this._element.removeEventListener("click",this._handleOverlayClose),this._element.querySelector(".popup__close").removeEventListener("click",this.close)}}]),e}(),P=function(e){h(r,e);var t=b(r);function r(e){return S(this,r),t.call(this,e)}return k(r,[{key:"open",value:function(e,t){m(_(r.prototype),"open",this).call(this),this._element.querySelector(".popup-picture__img").src=e,this._element.querySelector(".popup-picture__caption").textContent=t}}]),r}(I),L=function(e){h(r,e);var t=b(r);function r(e,n){var o;return S(this,r),(o=t.call(this,e))._callback=n,o._form=o._element.querySelector(".popup__form"),o._submitButton=o._form.querySelector(".popup__button"),o}return k(r,[{key:"open",value:function(e){var t=e.name,n=e.about,o=e.pictureId,i=e.e;m(_(r.prototype),"open",this).call(this),console.log(t,n,o),t&&n&&(this._form.elements.name.value=t,this._form.elements.about.value=n),o&&i&&(this.pictureId=o,this.card=i.target.closest(".card"))}},{key:"close",value:function(){m(_(r.prototype),"close",this).call(this),this._form.reset()}},{key:"_getInputValues",value:function(){var e=new FormData(this._form);return Object.fromEntries(e)}},{key:"_submitForm",value:function(e){var t=this;e.preventDefault();var r=this.pictureId?this.pictureId:this._getInputValues(),n=this._submitButton.textContent;this._submitButton.textContent="Сохранение...",this._callback(r,this.card).then((function(){t._submitButton.textContent=n,t.close()}))}},{key:"setEventListeners",value:function(){m(_(r.prototype),"setEventListeners",this).call(this),this._form.addEventListener("submit",this._submitForm.bind(this))}},{key:"removeEventListeners",value:function(){m(_(r.prototype),"removeEventListeners",this).call(this),this._form.removeEventListener("submit",this._submitForm)}}]),r}(I),j=document.querySelector(".profile__button_type_edit"),C=document.querySelector(".profile__button_type_add"),O=document.querySelector(".profile__avatar");function q(e){return q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(e)}function U(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==q(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==q(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===q(o)?o:String(o)),n)}var o}var T=function(){function e(t){var r=t.items,n=t.renderer;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._renderedItems=r,this._renderer=n}var t,r;return t=e,(r=[{key:"addItem",value:function(e){this._renderer(e)}},{key:"renderItems",value:function(){var e=this;this._renderedItems.then((function(t){t.slice().reverse().forEach((function(t){e._renderer(t)}))}))}}])&&U(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function x(e){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},x(e)}function A(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,(void 0,o=function(e,t){if("object"!==x(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!==x(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key),"symbol"===x(o)?o:String(o)),n)}var o}document.querySelector(".popup__button_delete");var V=function(){function e(t,r,n,o,i,u,a,c){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.titleValue=t.name,this.linkValue=t.link,this._selector=i,this.likes=t.likes,this._id=t._id,this.ownerId=t.owner._id,this.setLike=r,this.deleteLike=n,this.deleteCard=o,this.popupPicture=u,this.popupDelete=a,this.getUserInfo=c}var t,r;return t=e,(r=[{key:"_getElement",value:function(){return document.querySelector(this._selector).content.cloneNode(!0)}},{key:"generate",value:function(){var e=this;this._element=this._getElement(),this._setEventListeners(),this._element.querySelector(".card__img").style.backgroundImage="url(".concat(String(this.linkValue),")"),this._element.querySelector(".card__likes-count").textContent=this.likes.length,this._element.querySelector(".card__description").textContent=String(this.titleValue);var t=this._element.querySelector(".card__icon");return this.likes.map((function(e){return e._id})).some((function(t){return t===e.getUserInfo().userId}))&&t.classList.add("card__icon_active"),this._element}},{key:"_setEventListeners",value:function(){var e=this,t=this._element.querySelector(".card__trash"),r=this._element.querySelector(".card__likes-count");this._element.querySelector(".card__icon").addEventListener("click",(function(t){t.target.classList.contains("card__icon_active")?e.deleteLike(e._id).then((function(e){r.textContent=e.likes.length,t.target.classList.remove("card__icon_active")})).catch((function(e){console.log(e)})):e.setLike(e._id).then((function(e){r.textContent=e.likes.length,t.target.classList.add("card__icon_active")})).catch((function(e){console.log(e)}))})),this._element.querySelector(".card__img").addEventListener("click",(function(){e.popupPicture.open(e.linkValue,e.titleValue)})),this.getUserInfo().userId===this.ownerId?t.addEventListener("click",(function(t){e.popupDelete.open({pictureId:e._id,e:t})})):t.remove(".card__trash")}}])&&A(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}(),B=new o({baseUrl:"https://nomoreparties.co/v1/plus-cohort-22",headers:{authorization:"da373be5-de2f-43e0-943d-28642416cb3a","Content-Type":"application/json"}}),N=new l({nameSelector:".profile__name",jobSelector:".profile__job",avatarSelector:".profile__avatar"},B.getProfileInfo,B.setProfileInfo,B.setAvatar),R=new d({formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",errorClass:"popup__error_visible"}),D=new P("#popup-picture"),J=new L("#popup-delete",(function(e,t){return B.deleteCardServer(e).then((function(){t.remove()}))})),F=new T({items:B.getInitialCards().then((function(e){return e.map((function(e){return new V(e,B.setLike,B.deleteLike,B.deleteCardServer,"#card-template",D,J,N.getUserInfo).generate()}))})),renderer:function(e){document.querySelector(".cards").prepend(e)}}),M=new L("#popup-avatar",N.setUserAvatar),H=new L("#popup-edit",N.setUserInfo),z=new L("#popup-add",(function(e){return B.addNewCardServer(e.title,e.url).then((function(e){var t=new V(e,B.setLike,B.deleteLike,B.deleteCardServer,"#card-template",D,J,N.getUserInfo);console.log(t.generate()),F.addItem(t.generate())}))}));j.addEventListener("click",(function(){return H.open.call(H,N.getUserInfo())})),C.addEventListener("click",z.open.bind(z)),O.addEventListener("click",M.open.bind(M)),R.enableValidation(),F.renderItems()})();