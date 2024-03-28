import { performActionAndNotify } from "../../functions/performActionAndNotifyUser/performActionAndNotifyUser";

let consoleLogSpy;

consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});

test("performs action and sends notification", () => {
    const user = "testUser";
    const action = "testAction";
    performActionAndNotify(user, action);

    expect(consoleLogSpy).toHaveBeenCalledTimes(2);
    expect(consoleLogSpy).toHaveBeenCalledWith(`Performing action: ${action}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(
        `Sending notification to ${user}: Action "${action}" completed successfully.`
    );
});
