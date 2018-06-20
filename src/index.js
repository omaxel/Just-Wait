(($) => {
    Number.isInteger = Number.isInteger || function (value) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

    class JustWait {
        static setDefaults(opt = JustWait.options) {
            JustWait.options = $.extend({}, JustWait.options, opt);
        }
    }

    JustWait.options = {
        waitFor: 100
    };

    const old_ajax = $.ajax;

    $.ajax = function (url, options) {

        const ajaxResult = old_ajax(url, options);

        if (typeof url === "object" && typeof options === "undefined") options = url;

        let waitFor = options.waitFor || JustWait.options.waitFor;

        if (!Number.isInteger(waitFor)) {
            throw new Error("Just Wait 'waitFor' options must be a number");
        }

        if (waitFor < 0) {
            throw new Error("Just Wait 'waitFor' options must be greater or equal to 0");
        }

        let waitForId = null;

        ajaxResult.wait = function (fn) {
            if (typeof fn === "function") waitForId = setTimeout(fn, waitFor);
            return this;
        };

        return ajaxResult.always(() => {
            if (waitForId !== null) {
                clearTimeout(waitForId);
                waitForId = null;
            }
        });
    };

    window.JustWait = JustWait;

})(jQuery);