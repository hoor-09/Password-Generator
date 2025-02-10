const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!-$^+";
const spaceChar = " ";

function getRandomChar(chars) {
    const index = Math.floor(Math.random() * chars.length);
    return chars[index];
}

function generatePassword(){
    const passwordInput = document.getElementById("password");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const excludeDuplicateCheckbox = document.getElementById("exc-duplicate");
    const spacesCheckbox = document.getElementById("spaces");


    let characters = "";
    if(lowercaseCheckbox.checked) characters += lowercaseChars;
    if(uppercaseCheckbox.checked) characters += uppercaseChars;
    if(numbersCheckbox.checked) characters += numberChars;
    if(symbolsCheckbox.checked) characters += symbolChars;
    if(spacesCheckbox.checked) characters += spaceChar;

    if(characters == ""){
    passwordInput.value = "";
    return;
    }

    const lengthInput = document.getElementById("length");
    let length = lengthInput ? parseInt(lengthInput.value, 10) : 12;
    if(isNaN(length) || length < 4 || length >32) length = 12;

    if (excludeDuplicateCheckbox.checked && characters.length < length) {
        alert("Not enough unique characters to generate the password!");
        return;
    }
    let password = "";
    
    while (password.length < length) {
        let char = getRandomChar(characters);
        if (excludeDuplicateCheckbox.checked && password.includes(char)) continue; // Prevent duplicates
        password += char;
    }
        
    
    // Set the final password after generation
    passwordInput.value = password;
}  
function copyPassword(){
    const passwordInput = document.getElementById('password');
    const copyButton = document.getElementById('copy');

    navigator.clipboard.writeText(passwordInput.value).then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(() => {
            copyButton.textContent = "Copy";
        }, 2000);
    });
}
document.addEventListener("DOMContentLoaded", ()=> {
    document.getElementById("generate").addEventListener("click", generatePassword);
});