module.exports = {

    development: {
        apiVersion: '2006-03-01',
        endpoint: process.env.LOCALSTACK_HOSTNAME,
        s3ForcePathStyle: true,
    },
    production: {
    }
  
  };
  