

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT 
});


/**
 * Upload file buffer to ImageKit
 * @param {Buffer} fileBuffer - file buffer from multer
 * @param {String} fileName - unique file name
 */
const uploadFileToImageKit = async (fileBuffer, fileName) => {
    try {
        const result = await imagekit.upload({
            file: fileBuffer,       // ✅ buffer from multer.memoryStorage()
            fileName: fileName,
        });

        return result;
    } 
    catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw error;
    }
};




// async function uploadFile(file, fileName) {
//     const result = await imagekit.upload({
//         file: file,
//         fileName: fileName
//     });
//     return result;
// }

module.exports = { uploadFileToImageKit };