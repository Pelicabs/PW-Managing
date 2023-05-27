require('dotenv').config()
const {scrypt, randomFill, createCipheriv, scryptSync, createDecipheriv} = require('node:crypto');
const { Buffer } = require('node:buffer')

const algorithm = 'aes-192-cbc'
const secret = process.env.ENCRYPT_PW

function encrypt (text) {
    return new Promise ((resolve, reject) => {
        scrypt(secret, 'salt', 24, (err, key) => {
            if (err) return reject (err)
            randomFill(new Uint8Array(16), (err, iv) => {
                if (err) return reject (err)
    
                const cipher = createCipheriv(algorithm, key, iv)
                let encrypted = cipher.update(text, 'utf8', 'hex')
                encrypted += cipher.final('hex')
                resolve ({encrypted, iv})
            })
        })
    })
}

function decrypt ({encrypted, iv}) {
    return new Promise ((resolve, reject) => {
        scrypt(secret, 'salt', 24, (err, key) => {
            if (err) return reject (err)
            const decipher = createDecipheriv(algorithm, key, iv)
            let decrypted = decipher.update(encrypted, 'hex', 'utf8')
            decrypted += decipher.final('utf8')
            resolve (decrypted)
        })
    })
}
