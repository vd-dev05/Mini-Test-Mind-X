import crypto from 'crypto';

function key (id,email) {
      const randomstring = crypto.randomUUID()
    //   mern-$userId$-$email$-$randomstring$
        const apiKey = `mern-$${id}$-$${email}$-$${randomstring}$`
        return apiKey
}
export {
    key
}
