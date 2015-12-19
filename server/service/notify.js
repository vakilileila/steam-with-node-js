var option = {
    success: function (title, message) {
        if (message == undefined)
            message = title;
        return notify('success', title, message);
    },
    error: function (title, message) {
        if (message == undefined)
            message = title;
        return notify('error', title, message);
    },
    info: function (title, message) {
        if (message == undefined)
            message = title;
        return notify('info', title, message);
    },
    warning: function (title, message) {
        if (message == undefined)
            message = title;
        return notify('warning', title, message);
    }
}

function notify(type, title, message) {
    return {type: type, title: title, message: message};
}

module.exports = option;