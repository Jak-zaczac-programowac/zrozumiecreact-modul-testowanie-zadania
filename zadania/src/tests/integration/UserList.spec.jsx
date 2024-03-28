import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { UserList } from "../../components/UserList/UserList";

const mockedResponse = [
    { id: 1, name: "Leanne Graham", isActive: true },
    { id: 2, name: "Ervin Howell", isActive: false },
];

window.fetch = jest.fn(() => {
    return {
        then: () => {
            return {
                then: (callback) => {
                    return callback(mockedResponse);
                },
            };
        },
    };
});

test("renders user list correctly", async () => {
    render(<UserList />);

    expect(await screen.getByText("User List")).toBeVisible();
    expect(await screen.getByText("Leanne Graham")).toBeVisible();
});

test("toggles between showing all users and active users only", async () => {
    const { container } = render(<UserList />);

    const toggleButton = screen.getByRole("button", {
        name: "Show Active Users Only",
    });
    expect(toggleButton).toBeVisible();
    expect(await screen.getByText("Leanne Graham")).toBeVisible();
    expect(await screen.getByText("Ervin Howell")).toBeVisible();

    act(() => {
        toggleButton.click();
    });

    expect(await screen.getByText("Leanne Graham")).toBeVisible();
    expect(container.querySelector("ul").children.length).toBe(1);

    act(() => {
        toggleButton.click();
    });

    expect(await screen.getByText("Leanne Graham")).toBeVisible();
    expect(await screen.getByText("Ervin Howell")).toBeVisible();

    expect(container.querySelector("ul").children.length).toBe(2);
});
