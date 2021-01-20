import axios from 'axios';

import { API } from '../api/api';

jest.mock('axios');

describe('saveForm', () => {
  it('gets data with an API successfully', async () => {
    // mock an axious request to be fullfilled successfully
    axios.post.mockImplementationOnce(() => Promise.resolve({status: '200'}));

    // saveForm method executes successfully
    await expect(API.saveForm('data')).resolves.toEqual('200');
  });

  it('gets data with an API erroneously', async () => {
    const errorMessage = 'Network Error';

    // mock an axious request to be fullfilled with an error
    axios.post.mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    // saveForm method returns a promise with an error
    await expect(API.saveForm('data')).rejects.toThrow(errorMessage);
  });
});