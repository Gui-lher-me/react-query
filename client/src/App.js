import React from 'react';

import { QueryClientProvider, QueryClient, useQuery } from 'react-query';

import * as api from './services/api-services';

const queryClient = new QueryClient();

export const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <User />
        </QueryClientProvider>
    );
};

const User = () => {
    const { data, isLoading } = useQuery('users', () => api.readAll('users'));

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (data.users.length === 0) {
        return <p>No users found!</p>;
    }

    return <UserList users={data.users} />;
};

const UserList = ({ users }) => {
    return (
        <ul>
            {users.map((user) => (
                <UserItem key={user.id} user={user.name} />
            ))}
        </ul>
    );
};

const UserItem = ({ user }) => {
    return <li>{user}</li>;
};
