const fs = require('fs');
const path = require('path');
const JSZip = require("jszip");

/**
 * Get the users, based on the list of folders inside the messages/inbox folder
 * @param {String} fileID
 */
const getUsers = (fileID) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'uploads', `${fileID}.zip`);

        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);
            JSZip.loadAsync(data).then(zip => {
                const users = [];

                zip.folder("messages/inbox").forEach((relativePath, file) => {
                    if (file.dir && (relativePath.match(/\//g) || []).length === 1) {
                        users.push(file.name);
                    }
                });

                resolve(users);
            }).catch(err => reject(err) );
        });
    });
};

/**
 * Get the messages and the participants of the conversion based on the .json files contained in the users folder
 * @param {String} fileID 
 * @param {String} user 
 * @returns 
 */
const getMessages = (fileID, user) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'uploads', `${fileID}.zip`);

        fs.readFile(filePath, (err, data) => {
            if (err) reject(err);

            JSZip.loadAsync(data).then(zip => {
                const messages = [];
                const participants = [];
                const promises = [];

                zip.folder(user).forEach((relativePath, file) => {
                    if (file.name.endsWith('.json')) {
                        promises.push(
                            file.async("text").then(text => {
                                const data = JSON.parse(text);

                                const sortedMessages = data.messages.slice().sort((a, b) => a.timestamp_ms - b.timestamp_ms);
        
                                const getMessageType = (message) => {
                                    if (message.content) return { ...message, type: 'text', sender_name: decodeURIComponent(escape(message.sender_name)), content: decodeURIComponent(escape(message.content)) };
                                    if (message.audio_files) return { ...message, type: 'audio', sender_name: decodeURIComponent(escape(message.sender_name)), content: "has sent an audio file" };
                                    if (message.photos) return { ...message, type: 'photo', sender_name: decodeURIComponent(escape(message.sender_name)), content: "has sent a photo" };
                                    return null;
                                };
                                
                                const filteredMessages = sortedMessages.map(getMessageType).filter(Boolean);
                                const filteredMessagesWithoutLikes = filteredMessages.filter(message => message.content !== "A aimé un message");

                                messages.push(...filteredMessagesWithoutLikes);
                                participants.splice(0, participants.length, ...data.participants.map(participant => decodeURIComponent(escape(participant.name))));
                            })
                        );
                    }
                });

                Promise.all(promises)
                    .then(() => {
                        if (messages.length && participants.length) {
                            resolve({ messages, participants });
                        } else {
                            throw new Error('The user does not exist');
                        }
                    })
                    .catch(err => reject(err) );
            }).catch(err => reject(err) );
        });
    });
};

module.exports = {getUsers, getMessages};
