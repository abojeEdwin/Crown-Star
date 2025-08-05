
const isValidEmail = (email) =>
    /^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(email);

module.exports = {isValidEmail};