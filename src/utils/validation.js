
const isValid = function (value) {
    if(value == null || value == undefined) return false;
    if(typeof value !== "string" ) return false
    if(typeof value == "string" && value.trim() == "") return false;
    return true
}

function isValidString(input){
    return (/^[a-zA-Z]+$/.test(input))
}

// string with out numbers
const regex = /\d/;
const validString = function (string) {
    return regex.test(string)
};

const validateEmail = (email) => {
    return email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
};

const validateMobile = function(number) {
    if(/^[0-9]+$/.test(number)) return true
}

module.exports = {isValid ,isValidString, validString , validateEmail , validateMobile};