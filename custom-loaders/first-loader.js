module.exports = function firstLoader(content) {
    console.log('My first loader is running');
    console.log(content);
    return content;
};
