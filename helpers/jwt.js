const jwt = require('jsonwebtoken');

// Generar un JWT
const generarJWT = ( uid ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = {
            // Sólo se considera el Id en este caso
            uid,
        };
        
        //JWT_SECRET es la firma que utilizara el servidor para genera JWT
        jwt.sign( payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, ( err, token ) => { // callback
    
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve( token );
            }
    
        });

    });

}


module.exports = {
    generarJWT,
}