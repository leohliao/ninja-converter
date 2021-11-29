import axios from 'axios';

export const fetchImages = (fileId) => {
    if (fileId) {
        return axios.get(`/api/file/${fileId}/images`);
    }
    return {
        data: null
    };
};

export const fetchImage = (imgId) => {
    if (imgId) {
        return axios.get(`/api/image/${imgId}`);
    }
    return {
        data: null
    };
}
