exports.choice = function(choices) {
    return choices[Math.floor(Math.random() * choices.length)]
};

exports.range = function(min, max) {
    let number = Math.random() * (max - min) + min;
    return Math.floor(number);
};

exports.percent = function() {
    let percent = Math.random() * (100 - 0) + 0;
    return Math.floor(percent);
};