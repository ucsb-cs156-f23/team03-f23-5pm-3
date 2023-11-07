const recommendationRequestFixtures = {
    oneRecommendation: {
        "id": 1,
        "requesterEmail": "joegaucho@ucsb.edu",
        "professorEmail": "profC@ucsb.edu",
        "explanation": "Requesting letter of rec for grad school.",
        "dateRequested": "2022-01-02T12:00:00",
        "dateNeeded": "2022-03-02T12:00:00",
        "done": false
    },
    threeRecommendations: [
        {
            "id": 1,
            "requesterEmail": "joegaucho@ucsb.edu",
            "professorEmail": "profC@ucsb.edu",
            "explanation": "Requesting letter of rec for grad school.",
            "dateRequested": "2022-01-02T12:00:00",
            "dateNeeded": "2022-03-02T12:00:00",
            "done": false
        },
        {
            "id": 2,
            "requesterEmail": "orc@ucsb.edu",
            "professorEmail": "profC@ucsb.edu",
            "explanation": "Requesting letter of rec for summer research program.",
            "dateRequested": "2023-04-12T12:00:00",
            "dateNeeded": "2023-10-31T12:00:00",
            "done": false
        },
        {
            "id": 3,
            "requesterEmail": "curls@ucsb.edu",
            "professorEmail": "profG@ucsb.edu",
            "explanation": "Requesting letter of rec for grad school.",
            "dateRequested": "2023-06-07T12:00:00",
            "dateNeeded": "2023-11-07T12:00:00",
            "done": true            
        }
    ]
};


export {restaurantRecommendationFixtures};