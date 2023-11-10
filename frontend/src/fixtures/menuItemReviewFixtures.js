//import { getDefaultNormalizer } from "@testing-library/react"

const menuItemReviewFixtures = {
   
    oneReview: {
        "id": 1,
        "itemid": 5,
        "reviewerEmail": "chris@gmail.com",
        "stars": 3,
        "dateReviewed": "2022-01-02T12:00:00",
        "comments": "a comment"
    },
    threeReviews: [
        {
            "id": 2,
            "itemid": 6,
            "reviewerEmail": "chris1@gmail.com",
            "stars": 3,
            "dateReviewed": "2022-01-02T12:00:00",
            "comments": "excellent"
        },
        {
            "id": 3,
            "itemid": 7,
            "reviewerEmail": "chrisg1@gmail.com",
            "stars": 5,
            "dateReviewed": "2022-04-03T12:00:00",
            "comments": "bland"
        },
        {
            "id": 4,
            "itemid": 8,
            "reviewerEmail": "chris22@gmail.com",
            "stars": 2,
            "dateReviewed": "2022-07-04T12:00:00",
            "comments": "pretty good"
        }
    ]
}; //   


export { menuItemReviewFixtures };