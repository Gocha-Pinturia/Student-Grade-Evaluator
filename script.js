// Task 1.1 isValidScore
const isValidScore = function(score) {
    if (score === null) {
        console.log("Warning: no score provided.");
        return false;
    } else if (score >= 0 && score <= 100) {
        return true;
    } else {
        return false;
    }

}

console.log("Task 1.1 Function isValidScore"); 
console.log(isValidScore(85, 80));      // true
console.log(isValidScore(101));         // false
console.log(isValidScore(-5));          // false
console.log(isValidScore(null));        // Warning: no score provided. → false
console.log(isValidScore(0));           // true  (0 is a valid score!)
console.log();


// Task 1.2 getLetterGrade
const getLetterGrade = (score, passingScore = 50) => {
    const result = isValidScore(score);
    if(!result) {
        return "Invalid";
    }
    if (score >= 90 && score >= passingScore) {
        return 'A';
    } else if (score >= 75 && score >= passingScore) {
        return 'B';
    } else if (score >= 60 && score >= passingScore) {
        return 'C';
    } else if (score >= passingScore) {
        return 'D';
    } else {
        return 'F';
    }
}

console.log("Task 1.2 Function getLetterGrade");
console.log(getLetterGrade(92)); // "A"
console.log(getLetterGrade(58)); // "D" (default passing = 50)
console.log(getLetterGrade(58, 60)); // "F" (custom passing = 60)
console.log(getLetterGrade(110)); // "Invalid"
console.log();


// Task 1.3
const formScore = "85";
console.log("Task 1.3");
console.log(formScore == 85); // true
console.log(formScore === 85); // false
console.log(isValidScore(formScore)); // true
console.log();


// Task 2.1
const calculateAverage = (s1, s2, s3, s4 = 0, count = 3) => ((s1 + s2 + s3 + s4) / count).toFixed(2);

console.log("Task 2.1 Function calculateAverage");
console.log(calculateAverage(70, 80, 90)); // (70+80+90) / 3 = 80.00
console.log(calculateAverage(70, 80, 90, 100, 4)); // (70+80+90+100) / 4 = 85.00
console.log();


// Task 2.2
const calculateWeightedScore = (exam, homework, bonus = 0) => (0.6 * exam + 0.4 * homework + bonus).toFixed(2);

console.log("Task 2.2 Function calculateWeightedScore");
console.log(calculateWeightedScore(80, 90)); // 0.6*80 + 0.4*90 + 0 = 84.00
console.log(calculateWeightedScore(80, 90, 5)); // 84 + 5 = 89.00
console.log(calculateWeightedScore(55, 70, 0)); // 0.6*55 + 0.4*70 = 61.00
console.log();


// Task 2.3
const isEligibleForRetake = (score, attendance) => true ? score < 60 && attendance > 75 : false;

console.log("Task 2.3 Function isEligibleForRetake");
console.log(isEligibleForRetake(45, 80)); // true (failed, but attended enough)
console.log(isEligibleForRetake(45, 60)); // false (failed, but too many absences)
console.log(isEligibleForRetake(75, 80)); // false (passed — no retake needed)
console.log();


// Task 3.1
console.log("Task 3.1 Function with callback")
const processScore = function(score, callback) {
    let result = isValidScore(score);
    if (!result) {
        console.log("Error: invalid score.");
        return null;
    } else return callback(score);
}

// Test with different callbacks:
console.log(processScore(78, getLetterGrade)); // "B"
console.log(processScore(78, score => score >= 60 ? "Pass" : "Fail")); // "Pass"
console.log(processScore(78, score => Math.round(score * 1.1))); // 86 (10% bonus applied)
console.log(processScore(110, getLetterGrade)); // Error: invalid score. → null
console.log();


// Task 3.2
console.log("Task 3.2 Function applyToAll with callback")
function applyToAll(a, b, c, callback) {
    // console.log("Score " + a + ": " + callback(a));
    console.log(`Score ${a}: ${callback(a)}`);
    console.log(`Score ${b}: ${callback(b)}`);
    console.log(`Score ${c}: ${callback(c)}`);
}
applyToAll(55, 72, 91, getLetterGrade);
console.log();
applyToAll(55, 72, 91, score => score >= 60 ? "Pass" : "Fail");
console.log();


// Task 4
console.log("Task 4 Score Tracker");
function createTracker(subjectName, passingScore = 60) {
    let count = 0;
    let total = 0;
    let highest = 0;
    let lowest = 100;

    return function(score) { // When we launch function createTracker this function creates access to variables(count, total, highest, lowest). This is called closure.
        // 1. Validate score using isValidScore
        if (!isValidScore(score)) {
            console.log(`[${subjectName}] Error: invalid score, not recorded.`);
            return;
        }
        // 2. Update count, total, highest, lowest
        count++;
        total += score;
        if (score > highest) {
            highest = score;
        }
        if (score < lowest) {
            lowest = score;
        }
        const avg = (total / count).toFixed(2);
        const status = score >= passingScore ? "Pass" : "Fail";
        // 3. Print the summary line (see expected output below)
        console.log(`[${subjectName}] #${count} score: ${score} avg: ${avg} hight: ${highest} low: ${lowest} -> ${status}`);
        console.log();
    };
}
// The mathTracker variable now contains a closure and has access to its own variables(count, total, highest, lowest).
const mathTracker = createTracker("Mathematics");

mathTracker(78);
mathTracker(45);
mathTracker(92);
mathTracker(110);

// The englishTracker variable now contains a closure and has access to its own variables(count, total, highest, lowest).
const englishTracker = createTracker("English", 15);
console.log();
englishTracker(60);


// Task Bonus
console.log("Bonus — The Final Report")
function printStudentReport(name, exam, homework, attendance, bonus) {
    let finalScore = calculateWeightedScore(exam, homework, bonus);
    console.log(`
====================================
Student: ${name}
------------------------------------
Exam:       ${exam}   (weight: 60%)
Homework:   ${homework}   (weight: 40%)
Bonus:       ${bonus} pts
Final score: ${finalScore}
Grade:       ${getLetterGrade(finalScore)}
Attendance:  ${attendance}%
Retake:      ${isEligibleForRetake(finalScore, attendance) ? "Yes" : "No"}
====================================`);
}

printStudentReport("Petra Novak", 74, 88, 82, 3);