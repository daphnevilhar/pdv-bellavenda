const aws = require('aws-sdk');

const endpoint = new aws.Endpoint(process.env.ENDPOINT_S3)

const s3 = new aws.S3({
    endpoint,
    credentials: {
        accessKeyId: process.env.KEY_ID,
        secretAccessKey: process.env.KEY_APP
    }
});

const uploadImagem = async (path, buffer, mimetype) => {
    const imagem = await s3.upload({
            Bucket: process.env.BUCKET_NAME,
            Key: path,
            Body: buffer,
            ContentType: mimetype
        }).promise()
    
    return {
        path: imagem.Key,
        url: `https://${process.env.BLACKBLAZE_BUCKET}.${process.env.ENDPOINT_S3}/${imagem.Key}`
    }
}

const excluirImagem = async (path) => {
    try {
        await s3.deleteObject({
            Bucket: process.env.BLACKBLAZE_BUCKET,
            Key: path
        }).promise();
    } catch (error) {
        return res.status(error.statusCode || 500).json({ mensagem: error.message });
    }
}


module.exports = {
    uploadImagem,
    excluirImagem
}