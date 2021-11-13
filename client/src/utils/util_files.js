import axios from 'axios';

export const fetchFiles = () => {
    return axios.get('/api/files/');
}

export const fetchFile = (pk) => {
    return axios.get(`/api/file/${pk}`);
}