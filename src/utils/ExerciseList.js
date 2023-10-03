// exerciseList.js

const exerciseList = {
    // LEGS
    100: {"name": "Squats", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    101: {"name": "Lunges", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    102: {"name": "Leg Press", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    103: {"name": "Leg Curls", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    104: {"name": "Calf Raises", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    105: {"name": "Leg Extensions", "weighted": true, "reps": true, "timed": false, "category": "legs"},
    106: {"name": "Sumo Squats", "weighted": true, "reps": true, "timed": false, "category": "legs"},

    // CHEST
    200: {"name": "Bench Press", "weighted": true, "reps": true, "timed": false, "category": "chest"},
    201: {"name": "Push Ups", "weighted": false, "reps": true, "timed": false, "category": "chest"},
    202: {"name": "Chest Fly", "weighted": true, "reps": true, "timed": false, "category": "chest"},
    203: {"name": "Decline Bench Press", "weighted": true, "reps": true, "timed": false, "category": "chest"},
    204: {"name": "Incline Bench Press", "weighted": true, "reps": true, "timed": false, "category": "chest"},
    205: {"name": "Dumbbell Pullover", "weighted": true, "reps": true, "timed": false, "category": "chest"},
    206: {"name": "Cable Crossover", "weighted": true, "reps": true, "timed": false, "category": "chest"},

    // BACK
    300: {"name": "Deadlift", "weighted": true, "reps": true, "timed": false, "category": "back"},
    301: {"name": "Barbell Row", "weighted": true, "reps": true, "timed": false, "category": "back"},
    302: {"name": "Pull Ups", "weighted": false, "reps": true, "timed": false, "category": "back"},
    303: {"name": "Lat Pulldown", "weighted": true, "reps": true, "timed": false, "category": "back"},
    304: {"name": "T-Bar Row", "weighted": true, "reps": true, "timed": false, "category": "back"},
    305: {"name": "Face Pulls", "weighted": true, "reps": true, "timed": false, "category": "back"},
    306: {"name": "Dumbbell Rows", "weighted": true, "reps": true, "timed": false, "category": "back"},

    // SHOULDERS
    400: {"name": "Overhead Press", "weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    401: {"name": "Lateral Raises", "weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    402: {"name": "Front Raises", "weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    403: {"name": "Shrugs", "weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    404: {"name": "Rear Delt Fly", "weighted": true, "reps": true, "timed": false, "category": "shoulders"},

    // BICEPS
    500: {"name": "Barbell Curl", "weighted": true, "reps": true, "timed": false, "category": "biceps"},
    501: {"name": "Dumbbell Curl", "weighted": true, "reps": true, "timed": false, "category": "biceps"},
    502: {"name": "Hammer Curl", "weighted": true, "reps": true, "timed": false, "category": "biceps"},
    503: {"name": "Concentration Curl", "weighted": true, "reps": true, "timed": false, "category": "biceps"},
    504: {"name": "Preacher Curl", "weighted": true, "reps": true, "timed": false, "category": "biceps"},

    // TRICEPS
    600: {"name": "Tricep Dips", "weighted": true, "reps": true, "timed": false, "category": "triceps"},
    601: {"name": "Skull Crushers", "weighted": true, "reps": true, "timed": false, "category": "triceps"},
    602: {"name": "Tricep Kickbacks", "weighted": true, "reps": true, "timed": false, "category": "triceps"},
    603: {"name": "Overhead Tricep Extension", "weighted": true, "reps": true, "timed": false, "category": "triceps"},
    604: {"name": "Close Grip Bench Press", "weighted": true, "reps": true, "timed": false, "category": "triceps"},
    605: {"name": "Tricep Push Down", "weighted": true, "reps": true, "timed": false, "category": "triceps"},

    // CARDIO & AEROBICS
    700: {"name": "Treadmill Running", "weighted": false, "reps": false, "timed": true, "category": "cardio"},
    701: {"name": "Biking", "weighted": false, "reps": false, "timed": true, "category": "cardio"},
    702: {"name": "Jump Rope", "weighted": false, "reps": true, "timed": false, "category": "cardio"},
    703: {"name": "Burpees", "weighted": false, "reps": true, "timed": false, "category": "cardio"},
    704: {"name": "Swimming", "weighted": false, "reps": false, "timed": true, "category": "cardio"},
    705: {"name": "Boxing", "weighted": false, "reps": false, "timed": true, "category": "cardio"}
};

export default exerciseList;
