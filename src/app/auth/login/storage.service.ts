export class StorageService {
    isLocalStorageEnabled = false;
    isCookieEnabled = false;

    defaultCookieValidityInDays = 1;

    constructor() {
        //Test if Cookies are enabled
        this.isCookieEnabled = navigator.cookieEnabled;

        //Test if Local Storage is enabled
        try {
            localStorage.setItem("testls", "valls");
            localStorage.removeItem("testls");
            this.isLocalStorageEnabled = true;
        } catch (e) {
            this.isLocalStorageEnabled = false;
        }
    }

    private setLocalStorage(key, value): void {
        localStorage.setItem(key, value);
    }

    private getLocalStorage(key) {
        return localStorage.getItem(key);
    }

    private deleteLocalStorage(key): void {
        localStorage.removeItem(key);
    }

    private setCookie(cname, cvalue, exdays) {
        //sessionStorage
        //localStorage.setItem(cname, cvalue);
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires="+d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
    private deleteCookie(cname) {
        //sessionStorage
        //localStorage.removeItem(cname);
         this.setCookie(cname,'',0);
    }
    private getCookie(cname) {
        //return sessionStorage.getItem(cname);
        //return localStorage.getItem(cname);
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    getItem(key) {
        if (this.isLocalStorageEnabled) {
            return this.getLocalStorage(key);
        }
        else if (this.isCookieEnabled) {
            return this.getCookie(key);
        }
        return null;
    }

    setItem(key, value) {
        if (this.isLocalStorageEnabled) {
            return this.setLocalStorage(key, value);
        }
        else if (this.isCookieEnabled) {
            return this.setCookie(key, value, this.defaultCookieValidityInDays);
        }
    }

    deleteItem(key) {
        if (this.isLocalStorageEnabled) {
            return this.deleteLocalStorage(key);
        }
        else if (this.isCookieEnabled) {
            return this.deleteCookie(key);
        }
    }
}