// exerciseList.js

const exerciseList = {
    // LEGS
    "squats": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "lunges": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "leg press": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "leg curls": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "calf raises": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "leg extensions": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    "sumo squats": {"weighted": true, "reps": true, "timed": false, "category": "legs"},
    
    // CHEST
    "bench press": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    "push ups": {"weighted": false, "reps": true, "timed": false, "category": "chest"},
    "chest fly": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    "decline bench press": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    "incline bench press": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    "dumbbell pullover": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    "cable crossover": {"weighted": true, "reps": true, "timed": false, "category": "chest"},
    
    // BACK
    "deadlift": {"weighted": true, "reps": true, "timed": false, "category": "back"},
    "barbell row": {"weighted": true, "reps": true, "timed": false, "category": "back"},
    "pull ups": {"weighted": false, "reps": true, "timed": false, "category": "back"},
    "lat pulldown": {"weighted": true, "reps": true, "timed": false, "category": "back"},
    "t-bar row": {"weighted": true, "reps": true, "timed": false, "category": "back"},
    "face pulls": {"weighted": true, "reps": true, "timed": false, "category": "back"},
    "dumbbell rows": {"weighted": true, "reps": true, "timed": false, "category": "back"},

    // SHOULDERS
    "overhead press": {"weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    "lateral raises": {"weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    "front raises": {"weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    "shrugs": {"weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    "rear delt fly": {"weighted": true, "reps": true, "timed": false, "category": "shoulders"},
    
    // BICEPS
    "barbell curl": {"weighted": true, "reps": true, "timed": false, "category": "biceps"},
    "dumbbell curl": {"weighted": true, "reps": true, "timed": false, "category": "biceps"},
    "hammer curl": {"weighted": true, "reps": true, "timed": false, "category": "biceps"},
    "concentration curl": {"weighted": true, "reps": true, "timed": false, "category": "biceps"},
    "preacher curl": {"weighted": true, "reps": true, "timed": false, "category": "biceps"},
    
    // TRICEPS
    "tricep dips": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    "skull crushers": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    "tricep kickbacks": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    "overhead tricep extension": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    "close grip bench press": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    "tricep push down": {"weighted": true, "reps": true, "timed": false, "category": "triceps"},
    
    // CARDIO & AEROBICS
    "treadmill running": {"weighted": false, "reps": false, "timed": true, "category": "cardio"},
    "biking": {"weighted": false, "reps": false, "timed": true, "category": "cardio"},
    "jump rope": {"weighted": false, "reps": true, "timed": false, "category": "cardio"},
    "burpees": {"weighted": false, "reps": true, "timed": false, "category": "aerobics"},
    "jumping jacks": {"weighted": false, "reps": true, "timed": false, "category": "aerobics"},
    "mountain climbers": {"weighted": false, "reps": true, "timed": false, "category": "aerobics"},
    "aerobic steps": {"weighted": false, "reps": true, "timed": false, "category": "aerobics"},
    "rowing": {"weighted": false, "reps": false, "timed": true, "category": "cardio"},
    "swimming": {"weighted": false, "reps": false, "timed": true, "category": "cardio"},
    
    // OTHERS
    "sit ups": {"weighted": false, "reps": true, "timed": false, "category": "others"},
    "plank": {"weighted": false, "reps": false, "timed": true, "category": "others"},
    "leg raises": {"weighted": false, "reps": true, "timed": false, "category": "others"},
    "russian twists": {"weighted": true, "reps": true, "timed": false, "category": "others"},
    "woodchoppers": {"weighted": true, "reps": true, "timed": false, "category": "others"},
    
    // ... [and any other exercises you'd want to add]
};

export default exerciseList;
