export function performActionAndNotify(user, action) {
    console.log(`Performing action: ${action}`);
    sendNotification(user, `Action "${action}" completed successfully.`);
}

function sendNotification(user, message) {
    // Assume this function sends a notification to the user's device
    console.log(`Sending notification to ${user}: ${message}`);
}
