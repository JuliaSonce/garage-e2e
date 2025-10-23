import type { User } from '../../data/interfaces/user.i';
// export interface User {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     confirmPassword?: string;
// }
export function randomString(): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const maxLen = 20;
    const minLen = 2;
    let result = "";
    const lengthOfResult = Math.floor(Math.random() * (maxLen - minLen + 1) + minLen)
    for (let i = 0; i < lengthOfResult; i++) {
        const randomNumber = Math.floor(Math.random() * characters.length)
        let letter = characters[randomNumber]
        result = result + letter;
    }

    return result;
}
export function randomName(): string {
    const string = randomString().toLocaleLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);

}

function randomLastName(): string {
    const string = randomString().toLocaleLowerCase()
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function randomEmail(): string {
    const string = randomString().toLocaleLowerCase()
    const emailTemplate = `${string}@test.com`
    return emailTemplate

}
export function generatePassword(): string {
    const minLen = 8;
    const maxLen = 15;
    let letters = randomString();

    while (letters.length < minLen - 1 || letters.length > maxLen - 1) {
        letters = randomString();
    }

    const digits = "0123456789";
    const randomDigit = digits[Math.floor(Math.random() * digits.length)];

    const insertPos = Math.floor(Math.random() * (letters.length + 1));
    const password = letters.slice(0, insertPos) + randomDigit + letters.slice(insertPos);

    return password;
}




export function generateUser(): User {
    return {
        firstName: randomName(),
        lastName: randomLastName(),
        email: randomEmail(),
        password: generatePassword(),
        confirmPassword: generatePassword()
    };
}


