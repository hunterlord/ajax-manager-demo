import AjaxManager from 'react-ajax-manager';

const { API_BASE_URL, AJAX_TIMEOUT } = process.env;

const axiosConfig = {
  baseURL: process.env.API_BASE_URL,
  timeout: AJAX_TIMEOUT || 60000,
};

const ajaxManager = new AjaxManager(axiosConfig);

export { ajaxManager };
