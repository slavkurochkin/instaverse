import axios from "axios";

const api = axios.create({ baseURL: process.env.REACT_APP_BASE_URL});

api.interceptors.request.use((req) => {

    if (localStorage.getItem("profile")) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});

export const fetchStories = async () => api.get("/stories");
export const fetchStoriesByTag = async (tag) => api.get(`/stories/tags?tagId=${tag}`);
export const createStory = async (story) => api.post("/stories", story);
export const updateStory = async (id, story) => api.patch(`/stories/${id}`, story);
export const deleteStory = async (id) => api.delete(`/stories/${id}`);
export const likeStory = async (id) => api.patch(`/stories/${id}/likeStory`);


export const login = async (formValues) => api.post("/user/login", formValues);
export const signup = async (formValues) => api.post("/user/signup", formValues);

// export const fetchProfile = async () => api.get("/user/profile");
// export const updateProfile = async (formValues) => api.post("/user/profile", formValues);
