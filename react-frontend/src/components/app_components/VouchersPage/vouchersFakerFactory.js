
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
id: faker.lorem.sentence(1),
categoryId: faker.lorem.sentence(1),
points: faker.datatype.boolean(""),
title: faker.datatype.boolean(""),
image: faker.datatype.boolean(""),
description: faker.datatype.boolean(""),
termsCondition: faker.datatype.boolean(""),
isLatest: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
