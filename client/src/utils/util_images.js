import axios from 'axios';

export const fetchImages = (fileId) => {
    return axios.get(`/api/file/${fileId}/images`);
};

