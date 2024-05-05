import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';
const paginaInicio = async (req, res) => {

    //Ask the DB for the 3 most recent trips

    const promiseDB = [];
    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {

        const resultado = await Promise.all(promiseDB);

        res.render('home', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales : resultado[1]
        });
    }catch (error) {
        console.log(error);
    }

}

const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaViajes = async (req, res) => {

    //Ask the DB
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: `Pr\u00F3ximos Viajes`,
        viajes,

    });
}

const paginaTestimoniales  = async (req, res) => {
    try {

        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        });
    }catch (error) {
        console.log(error);
    }
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { viaje } = req.params;
    try {
        const resultado = await Viaje.findOne({ where : { slug : viaje }});
        res.render('viaje', {
            pagina: `Informaci\u00F3n Viaje: ${resultado.titulo}`,
            resultado
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}