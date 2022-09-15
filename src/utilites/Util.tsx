import axios from 'axios';

export const CallPostApi = async (urlString: string, formData: any, token: string) => {
  console.log('URL Api', urlString);
  console.log('token Api', token);
  console.log('Formdata Api', formData);
  console.log('API CALLED');
  let returnResponse;
  try {
    returnResponse = await axios({
      method: 'post',
      url: urlString,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'Aqua-Auth-Token': token,
      },
    });
  } catch (error) {
    console.log('API CALL ERROR:', error);
  }
  return returnResponse;
};

export const CallPatchApi = async (urlString: string, formData: any, token: string) => {
  console.log('API CALLED');
  let returnResponse;
  try {
    returnResponse = await axios({
      method: 'patch',
      url: urlString,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        'AQUA-AUTH-TOKEN': `${token}`,
      },
    });
  } catch (error) {
    console.log('API CALL ERROR:', error);
  }
  return returnResponse;
};

export const CallPostApiJson = async (urlString: string, formData: any, token: string) => {
  let returnResponse;
  try {
    returnResponse = await axios({
      method: 'post',
      url: urlString,
      data: formData,
      headers: {
        'Content-Type': 'application/json',
        'AQUA-AUTH-TOKEN': `${token}`,
      },
    });
  } catch (error) {
    console.log('API CALL ERROR:', error);
  }
  return returnResponse;
};

export const CallGetApi = async (urlString: string, token: string) => {
  let res;
  try {
    await axios
      .get(urlString, {
        headers: {
          'AQUA-AUTH-TOKEN': token,
        },
      })
      .then((response) => {
        res = response;
      });
  } catch (error) {
    console.log('URL:', urlString, '\nERROR:', error);
  }
  return res ? res : null;
};

export const CallGetApiNoHeader = async (urlString: string) => {
  let res;
  await axios.get(urlString).then((response) => {
    res = response;
    console.log('RESPONSIN CALL', response);
  });
  return res ? res : null;
};

export const CallGetFetchApi = (urlString: string, token: string) => {
  let response;
  fetch(urlString, {
    method: 'GET',
    headers: {
      'AQUA-AUTH-TOKEN': token,
    },
  }).then((res) => {
    response = res;
  });
  return response;
};
