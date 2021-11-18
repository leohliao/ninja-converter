import axios from 'axios';
import { getCookie } from './util_csrf'

export const fetchFiles = () => {
    return axios.get('/api/files/');
}

export const fetchFile = (pk) => {
    return axios.get(`/api/file/${pk}`);
}

export const uploadFile = (formData) => {
    const csrftoken = getCookie('csrftoken');
    return axios.post(`/api/file/upload/`, formData, {
      headers: {
        'X-CSRFToken': csrftoken,
        'content-type': 'multipart/form-data',
      },
    });
}
