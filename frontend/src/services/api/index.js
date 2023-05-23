export const service = {
    baseURL: "http://localhost:3001"
};

export const signUp = async ({ formData }) => {
    const response = await fetch(`${service.baseURL}/auth/register`, {
        method: "POST",
        body: formData
    });

    return await response.json();
};

export const authLogin = async (data) => {
    const response = await fetch(`${service.baseURL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return await response.json();
};

export const fetchPosts = async ({ token }) => {
    const response = await fetch(`${service.baseURL}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
};

export const fetchUserPosts = async ({ token, userId }) => {
    const response = await fetch(`${service.baseURL}/posts/${userId}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    return await response.json();
};

export const fetchUser = async ({ token, userId }) => {
    const response = await fetch(`${service.baseURL}/user/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })

    return await response.json();
};

export const postPost = async ({ token, formData }) => {
    const response = await fetch(`${service.baseURL}/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
    })

    return await response.json();
};

export const patchLike = async ({ token, userId, postId }) => {
    const response = await fetch(`${service.baseURL}/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId })
    });

    return await response.json();
};

export const patchFriend = async ({ token, userId, friendId }) => {
    const response = await fetch(`${service.baseURL}/${userId}/${friendId}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    });

    return await response.json();
};