import axios from 'axios';

export const CallPostApi = async (urlString: string, formData: any, token: string) => {
  let returnResponse = await axios({
    method: 'post',
    url: urlString,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
      'AQUA-AUTH-TOKEN': `${token}`,
    },
  });
  return returnResponse;
};

export const CallGetApi = async (url: string) => {
  return await axios.get(url);
};
