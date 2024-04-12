import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dzwchecof', 
  api_key: process.env.CLOUDINARY_API_KEY, // use a .env file to hide the API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // use a .env file to hide the API secret
  secure: true, // use https
});

// Still need 3 more components to complete the upload process
// 1. A form to upload the file (UploadForm.js) component
// 2. A EncryptForm component to encrypt the file (EncryptForm.js)
// 3. A EncryptProcessPage component to display the progress of the encryption (EncryptProcessPage.js)

cloudinary.uploader.upload(file, function(error, result) {
    console.log(result, error);
  });