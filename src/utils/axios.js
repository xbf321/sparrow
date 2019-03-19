import axios from 'axios';
import { message } from 'antd';

axios.defaults.baseURL = '/api';
const checkDeleteMethod = (response) => {
    const { status } = response;
    if (status === 404) {
        return false;
    }
    return true;
};

const checkPutMethod = (response) => {
    const { status: httpStatus, data: { message: dataMessage, status: dataStatus = -1 } } = response;
    if (dataStatus !== 0 && dataMessage) {
        message.error(dataMessage);
    }
    return false;
}

axios.interceptors.response.use(response => {
    const { config: { method }, data: {
        status = -1,
        message = '请求异常，请您重试',
        data
    } } = response;
    if (method.toUpperCase() === 'DELETE') {
        return checkDeleteMethod(response);
    }
    if (status === 0) {
        return data;
    }
    message.error(message);
    return undefined;
    
}, error => {
    // 检查 HTTP Method
    const { config: { method }, response } = error;
    if (method.toUpperCase() === 'DELETE') {
        const result = checkDeleteMethod(response);
        return result;
    }
    if (method.toUpperCase() === 'PUT') {
        const result = checkPutMethod(response);
        return result;
    }
    if (method.toUpperCase() === 'GET') {
        return false;
    }
    return Promise.reject(error);
});
export default axios;