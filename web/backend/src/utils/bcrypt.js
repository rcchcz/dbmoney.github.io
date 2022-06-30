const bcrypt = require('bcrypt')

class Bcrypt {
    async hashingPassword(password) {
        const salt = await bcrypt.genSalt(10)
        const passwordEncrypted = await bcrypt.hash(password, salt)
        return passwordEncrypted
    }
    async comparePassword(passwordReceived, passwordEncrypted) {
        return await bcrypt.compare(passwordReceived, passwordEncrypted)
    }
}

module.exports = new Bcrypt();