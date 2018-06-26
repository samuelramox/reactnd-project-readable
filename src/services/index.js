import axios from 'axios';

export function get(url) {
  const headers = { Authorization: 'whatever-you-want' };
  return axios({
    method: 'get',
    url,
    headers
  });
}
