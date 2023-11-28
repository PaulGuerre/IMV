import axios from 'axios';

/**
 * Send the zip file uploaded by the user and the random ID
 * @param {Object} formData 
 * @returns 
 */
export const sendFile = (formData) => {
    return axios.post('http://localhost:7000/file', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

/**
 * Get the list of users by sending the ID of the file
 * @param {String} fileID 
 * @returns 
 */
export const getUsers = (fileID) => {
    return axios.get(`http://localhost:7000/users?fileID=${fileID}`);
};

/**
 * Get the lists of messages and participants by sending the ID and the user
 * @param {String} fileID 
 * @param {String} user 
 * @returns 
 */
export const getMessages = (fileID, user) => {
    return axios.get(`http://localhost:7000/messages?fileID=${fileID}&user=${user}`);
};
