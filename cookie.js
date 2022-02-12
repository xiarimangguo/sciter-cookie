import * as Storage from "@storage";
import * as Env from "@env";
window.storage = Storage.open(Env.path("USER_DOCUMENTS") + "/data.db");
var root = storage.root || initDb(storage);
function initDb(storage) {
    storage.root = {
        version: 1,
        meta: {},
        localStorage: {},
        sessionStorage: {},
        cookie: {}
    };
    storage.commit();
    return storage.root;
}
window.localStorage = {
    setItem: function (Key, Val) {
        root["localStorage"][Key] = Val;
        storage.commit();
    },
    getItem: function (Key) {
        return root["localStorage"][Key];
    },
    removeItem: function (Key) {
        this.setItem(Key, undefined);
    }
};
window.sessionStorage = {
    setItem: function (Key, Val) {
        root["sessionStorage"][Key] = Val;
    },
    getItem: function (Key) {
        return root["sessionStorage"][Key];
    },
    removeItem: function (Key) {
        this.setItem(Key, undefined);
    }
};

String.prototype.toBoolean = function () {
    var regexTrue = /^\s*(true|1|on|yes)\s*$/i;
    var regexFalse = /^\s*(false|0|off|no)\s*$/i;
    if (regexTrue.test(this)) return true;
    if (regexFalse.test(this)) return false;
    return Boolean(this);
}

Object.defineProperty(document, "cookie", {
    get: function () {
        var setDefault = new Map([
            [".", ""],
            ["", ""],
            ["none", ""],
            ["None", ""],
            ["undefined", ""],
            ["Undefined", ""],
            ["null", ""],
            ["Null", ""],
            [undefined, ""],
            [null, ""],
        ]);

        var aDomain = location.host;
        var aPath = location.pathname;
        if (setDefault.has(aDomain)) var aDomain = "localhost";
        var domainPart = aDomain.split(".");
        var pathPart = aPath.split("/");
        var domainPart = removeEmpty(domainPart);
        var pathPart = removeEmpty(pathPart);
        if (!location.host) pathPart.shift();

        var domainStr = "";
        var dot = ".";
        var forCounter = 0;
        var returnObj = {};
        var aLength = domainPart.length;
        for (var i = aLength - 1; i > -1; i--) {
            forCounter++;
            if (forCounter <= 1) var isLocked = 1;
            if (aLength == 1) var isLocked = 0;
            var aPart = domainPart[i].replace(/\s*/g,"");
            if (!aPart) continue;
            var domainStr = aPart + domainStr;
            if (!isLocked) getCookies(domainStr);
            if (forCounter == aLength) var dot = "";
            var domainStr = dot + domainStr;
            var isLocked = 0;
        }

        function getCookies(aDomain) {
            var storRoot = storage.root["cookie"][aDomain];
            var storChild = storRoot;
            var aLength = pathPart.length;
            for (var j = 0; j <= aLength; j++) {
                if (j == aLength && j) break;
                if (j == aLength && !j) var aLocked = 1;
                if (!storChild) break;
                storRoot = storChild;
                for (var k in storRoot) {
                    if (!storRoot[k]["key"]) continue;
                    var timeNow = new Date();
                    var timeStmp = storRoot[k]["expires"].getTime();
                    var expr = (timeNow > timeStmp);
                    if (expr) delete storRoot[k];
                    if (!expr) returnObj[storRoot[k]["key"]] = storRoot[k]["value"];
                }
                if (!aLocked) storChild = storRoot["@" + pathPart[j]];
            }
        }

        function removeEmpty(arr) {
            for (var i = 0; i < arr.length; i++) {
                var aPart = arr[i];
                if (aPart) var aPart = aPart.replace(/\s*/g, "");
                if (!aPart) arr.splice(i, 1);
                if (!aPart) i--;
            }
            return arr;
        }

        var returnStr = "";
        var addtion = "; ";
        var forCounter = 0;
        var objLength = Object.keys(returnObj).length;
        for (var i in returnObj) {
            forCounter++;
            if (forCounter == objLength) var addtion = "";
            returnStr += i + "=" + returnObj[i] + addtion;
        }

        return returnStr;
    },
    set: function (val) {
        var setDefault = new Map([
            [".", ""],
            ["", ""],
            ["none", ""],
            ["None", ""],
            ["undefined", ""],
            ["Undefined", ""],
            ["null", ""],
            ["Null", ""],
            [undefined, ""],
            [null, ""],
        ]);

        var cookieParts = val.split(";");
        var predefined = ["key", "value"];
        var forCounter = 0;
        var cookieMap = {};
        for (var i = 0; i < cookieParts.length; i++) {
            if (forCounter <= 1) var isLocked = 1;
            var aPart = cookieParts[i].trim();
            if (!aPart) forCounter++;
            if (!aPart) continue;
            var aMap = aPart.split("=");
            if (isLocked) aMap[1] = aMap[forCounter];
            if (isLocked) aMap[0] = predefined[forCounter];
            if (aMap[0] == "expires") aMap[1] = new Date(aMap[1]);
            if (aMap[0] == "secure") aMap[1] = aMap[1].toBoolean();
            cookieMap[aMap[0]] = aMap[1];
            var isLocked = 0;
            if (forCounter <= 0) i--;
            forCounter++;
        }
        if (!cookieMap["expires"]) var timeNow = new Date();
        if (!cookieMap["expires"]) var timeFtr = timeNow.getDate() + 7;
        if (!cookieMap["expires"]) var timeCrcl = new Date();
        if (!cookieMap["expires"]) timeCrcl.setDate(timeFtr);
        if (!cookieMap["expires"]) cookieMap["expires"] = timeCrcl;

        if (setDefault.has(cookieMap["domain"]))
            cookieMap["domain"] = "localhost";
        var domainPart = cookieMap["domain"].split(".");
        var aDomain = "";
        var dot = ".";
        var forCounter = 0;
        var storRoot = storage.root["cookie"];
        var domainPart = removeEmpty(domainPart);
        for (var i = domainPart.length - 1; i > -1; i--) {
            forCounter++;
            if (forCounter <= 1) var isLocked = 1;
            var aPart = domainPart[i].replace(/\s*/g,"");
            if (domainPart.length == 1) var isLocked = 0;
            if (!aPart) continue;
            var aDomain = aPart + aDomain;
            if (!isLocked && !storRoot[aDomain]) storRoot[aDomain] = {};
            if (forCounter == domainPart.length) var dot = "";
            var aDomain = dot + aDomain;
            var isLocked = 0;
        }

        if (setDefault.has(cookieMap["path"]))
            cookieMap["path"] = "/";
        var pathPart = cookieMap["path"].split("/");
        var aPath = "";
        var slash = "/";
        var forCounter = 0;
        var storRoot = storRoot[aDomain];
        var pathPart = removeEmpty(pathPart);
        for (var i = 0; i < pathPart.length; i++) {
            forCounter++;
            var aPart = pathPart[i].trim();
            if (!aPart) continue;
            if (!storRoot[aPart]) storRoot["@"+aPart] = {};
            storRoot = storRoot["@"+aPart];
            aPath += slash + aPart;
        }
        if (!aPath) aPath = "/";

        function removeEmpty(arr) {
            for (var i = 0; i < arr.length; i++) {
                var aPart = arr[i];
                if (aPart) var aPart = aPart.replace(/\s*/g, "");
                if (!aPart) arr.splice(i, 1);
                if (!aPart) i--;
            }
            return arr;
        }

        cookieMap["domain"] = aDomain;
        cookieMap["path"] = aPath;
        storRoot[cookieMap["key"]] = cookieMap;
        storage.commit();
    }
});

window.Cookies = {
    set: function (cname, cvalue, settings) {
        if (!settings) var settings = {};
        if (!settings.expires) settings.expires = 7;
        var d = new Date();
        d.setTime(d.getTime() + (settings.expires * 24 * 60 * 60 * 1000));
        var expires = d.toUTCString();
        var cs = cname+"="+cvalue+"; ";
        for (var i in settings) {
            if (i != "expires") settings[i] = settings[i].toString();
            if (i == "expires") settings[i] = expires;
            cs += i + "=" + settings[i] + "; ";
        }
        document.cookie = cs;
    },
    get: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
        }
        return "";
    },
    remove: function (cname, settings) {
        if (!settings) var settings = {};
        settings.expires = 0;
        this.set(cname, "", settings);
    }
}
