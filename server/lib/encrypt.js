require('dotenv').config()
const {scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv} = require('node:crypto');
const { Buffer } = require('node:buffer')
const { promisify } = require('util')
const randomBytesAsync = promisify(require('crypto').randomBytes)

const algorithm = 'aes-192-cbc'
const secret = process.env.ENCRYPT_PW

function encrypt (text) {
    return new Promise ((resolve, reject) => {
        scrypt(secret, 'salt', 24, async (err, key) => {
            if (err) return reject (err)
            const iv= await randomBytesAsync(16)
            const cipher = createCipheriv(algorithm, key, iv)
            let encrypted = cipher.update(text, 'utf8', 'hex')
            encrypted += cipher.final('hex')
            resolve ({encrypted, iv: iv.toString('hex')})
        })
    })
}

function decrypt ({encrypted, iv}) {
    return new Promise ((resolve, reject) => {
        scrypt(secret, 'salt', 24, (err, key) => {
            if (err) return reject (err)
            const decipher = createDecipheriv(algorithm, key, Buffer.from(iv, "hex"))
            let decrypted = decipher.update(encrypted, 'hex', 'utf8')
            decrypted += decipher.final('utf8')
            resolve (decrypted)
        })
    })
}

module.exports = {encrypt, decrypt}