var faker = require('faker');

faker.locale = "en_US";

function getCarts() {

    let sampleCarts = []
    for (let i = 0; i < 100; i++) {
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
      return sampleCarts
}

export default { getCarts };