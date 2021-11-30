import axios from 'axios';

const handleGenerateUrl = (url) => {
  const host = process.env.REACT_APP_HOST_IP_ADDRESS;
  return host ? `${host}${url}` : url;
};

export const fetchImages = (fileId) => {
    if (fileId) {
        return axios.get(handleGenerateUrl(`/api/file/${fileId}/images`));
    }
    return {
        data: null
    };
};

export const fetchImage = (imgId) => {
    if (imgId) {
        return axios.get(handleGenerateUrl(`/api/image/${imgId}`));
    }
    return {
        data: null
    };
}
