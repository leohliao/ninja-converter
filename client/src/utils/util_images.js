import axios from 'axios';

export const fetchImages = (fileId) => {
    return axios.get(`/api/file/${fileId}/images`);
};

export const fetchImage = (imgId) => {
    return axios.get(`/api/image/${imgId}`);
}
