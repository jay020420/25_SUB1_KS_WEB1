import { useState, useEffect } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            setUsers(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <div>loading...</div>
    }

    return (
        <ul>
            {users.map(user => (
                <li key = {user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

export default UserList