import axios from 'axios';

// axios.interceptors.request.use(function (config) {
//     if (!isEnvNode && config.needLoading) {
//         loading.show();
//     }
//     config.startTime = (new Date()).getTime();
//     return config;
// }, function (error) {
//     return Promise.reject(error);
// });

const checkDeleteMethod = (response) => {
    const { status } = response;
    if (status === 404) {
        return false;
    }
    return true;
};

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
    console.error({
        status,
        message
    });
    return undefined;
    
}, error => {
    // 检查 HTTP Method
    const { config: { method }, response } = error;
    if (method.toUpperCase() === 'DELETE') {
        const result = checkDeleteMethod(response);
        return result;
    }
    return Promise.reject(error);
});
export default axios;