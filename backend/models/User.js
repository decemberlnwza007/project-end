const bcrypt = require('bcrypt');

class User
{
    constructor(email, password)
    {
        this.email;
        this.password = password;
    }
}

const person1 = new Person('Alice', 30);
person1.sayHello();