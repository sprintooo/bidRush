const users = [];

function createUser({ name, email, passwordHash }) {
    const user = {
        id: Date.now(),
        name,
        email,
        password: passwordHash,
    };

    users.push(user);
    return user;
}

function findUserByEmail(email) {
    return users.find((user) => user.email === email);
}

module.exports = {
    createUser,
    findUserByEmail,
};

