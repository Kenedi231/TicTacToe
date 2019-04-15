const errorHandler = function (err, req, res, next) {
    let { status = "error", code = 500,message = 'Server error'} = err;
    res.cookie("accessToken", "");
    res.cookie("gameToken", "");
    return res
        .status(code)
        .json({ status, message });
};

module.exports = errorHandler;