const userName = process.env.USER_NAME;
if (userName) {
    console.log(`Hello, ${userName} Welcome to Node!`);
} else {
    console.log(`Hello, visitor! Set the USER_NAME variable for a personalized greeting.`);
}