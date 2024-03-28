import { useState } from "react";

export function UserList() {
    const [users, setUsers] = useState([]);
    const [showActiveOnly, setShowActiveOnly] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    "https://jsonplaceholder.typicode.com/users"
                );
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleShowActiveOnly = () => {
        setShowActiveOnly(!showActiveOnly);
    };

    const filteredUsers = showActiveOnly
        ? users.filter((user) => user.isActive)
        : users;

    return (
        <div>
            <h2>User List</h2>
            <button onClick={handleToggleShowActiveOnly}>
                {showActiveOnly ? "Show All Users" : "Show Active Users Only"}
            </button>
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
}
