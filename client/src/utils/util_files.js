import axios from 'axios';
import { getCookie } from './util_csrf'

const handleGenerateUrl = (url) => {
  const host = process.env.REACT_APP_HOST_IP_ADDRESS;
  return host ? `${host}${url}`: url;
}

export const fetchFiles = () => {
    return axios.get(handleGenerateUrl('/api/files'));
}

export const fetchFile = (pk) => {
    return axios.get(handleGenerateUrl(`/api/file/${pk}`));
}

export const uploadFile = (formData) => {
    const csrftoken = getCookie('csrftoken');
    return axios.post(handleGenerateUrl(`/api/file/upload/`), formData, {
      headers: {
        'X-CSRFToken': csrftoken,
        'content-type': 'multipart/form-data',
      },
    });
}
