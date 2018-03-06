import app from './app';


const port = app.get('port');

const server = app.listen(port, () => {
   console.log(
       `App is running on port ${port} in ${app.get('env')}`
   );
});

export default server;