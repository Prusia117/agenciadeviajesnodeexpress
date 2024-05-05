import { Testimonial } from '../models/Testimoniales.js';

const guardarTestimonial = async (req, res) => {

    //Validar...
    const {nombre, correo, mensaje} = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({mensaje : 'El nombre está vacío'});
    }
    if(nombre.trim().length < 3) {
        errores.push({mensaje : 'Ingresa un nombre válido'});
    }
    if(correo.trim() === '') {
        errores.push({mensaje : 'El correo está vacío'});
    }
    if(mensaje.trim() === '') {
        errores.push({mensaje : 'El mensaje está vacío'});
    }

    if(errores.length > 0) {

        const testimoniales = await Testimonial.findAll();

        //Show the view with the errors
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    } else {
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimoniales');
        }catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
}