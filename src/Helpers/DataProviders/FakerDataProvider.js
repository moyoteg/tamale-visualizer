var faker = require('faker');
const timeoutIntervarl = 1000
faker.locale = "en_US";

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getProviders(providerCount = 10, cartCount = 5) {
    await timeout(timeoutIntervarl)
    let sampleProviders = []
        for (let i = 0; i < providerCount; i++) {
            let sample = {
                "Carts": getCarts(cartCount, false),
                "name": faker.company.companyName(),
                "description": faker.lorem.sentence(),
                "logoURL": faker.image.abstract()
            }
            sampleProviders.push(sample)
        }
        return await sampleProviders    
}

async function getCarts(count, shouldAwait) {
    if (shouldAwait) {
        await timeout(timeoutIntervarl)
    }
    let sampleCarts = []
    for (let i = 0; i < count; i++) {
        let sample = {
            "url": "",
            "load": {
                "oaxaquenio": 0,
                "rojo": 0,
                "type": "tamal",
                "dulce": 0,
                "verde": 0
            },
            "description": faker.lorem.sentence(),
            "driver": {
                "firstName": faker.name.firstName(),
                "lastName": faker.name.lastName(),
                "phoneNumber": faker.phone.phoneNumber(),
                "profilePictureURL": faker.image.avatar()
            },
            "schedule": {
                "endTime": faker.random.number(),
                "startTime": faker.random.number(),
                "weekAvailability": {
                    "sunday": faker.random.boolean(),
                    "wednesday": faker.random.boolean(),
                    "saturday": faker.random.boolean(),
                    "thursday": faker.random.boolean(),
                    "friday": faker.random.boolean(),
                    "monday": faker.random.boolean(),
                    "tuesday": faker.random.boolean()
                }
            }
        }
        sampleCarts.push(sample)
    }
    return await sampleCarts
}

export default { getCarts, getProviders };