import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import {
  FETCH_JOBS
} from './types';

const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

const ROOT_URL = 'http://api.indeed.com/ads/apisearch';

const buildUrl = (url, params) => {
  let query = url + '?';

  for (key in params){
    if (params.hasOwnProperty(key)) {
      query += `${key}=${params[key]}&`;
    }
  }

  return query.slice(0, -1);
};

export const fetchJobs = (region, callback) => async dispatch => {
  try {
    const zipcode = await reverseGeocode(region);
    const query = buildUrl(ROOT_URL, { ...JOB_QUERY_PARAMS, l: zipcode});
    const jobs = await axios.get(query);

    if (jobs) {
      dispatch({ type: FETCH_JOBS, payload: jobs.data });
      callback();
    }
  } catch(error) {
    console.log(error);
  }
};