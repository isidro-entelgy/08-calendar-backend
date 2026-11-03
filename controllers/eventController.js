const { request, response } = require("express");
const Evento = require("../model/Evento");

const getEventos = async (req = request, res = response) => {

    const eventos = await Evento.find().populate("user", "name email");


    return res.json({
        estado: "OK",
        message: "Obtener Eventos",
        eventos
    });
}

const crearEvento = async (req = request, res = response) => {

    const evento = new Evento(req.body);

    evento.user = req.uid;

    try {
        const eventoCreado = await evento.save();

        return res.json({
            estado: "OK",
            message: "Evento Creado",
            evento: eventoCreado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            estado: "KO",
            message: "Hable con el administrador del sitio"
        })
    }
}

const updateEvento = async (req = request, res = response) => {

    const idEvento = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(idEvento);

        if (!evento) {
            return res.status(404).json({
                estado: "KO",
                message: "No existe el Evento con ese ID"
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                estado: "KO",
                message: "No está autorizado para modificar este Evento"
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = Evento.findByIdAndUpdate(idEvento, nuevoEvento, { new: true });

        return res.json({
            estado: "OK",
            message: "Actualizar Evento",
            eventoActualizado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            estado: "KO",
            message: "Hable con el administrador del sitio"
        })
    }
}

const borrarEvento = async (req = request, res = response) => {
    const idEvento = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(idEvento);

        if (!evento) {
            return res.status(404).json({
                estado: "KO",
                message: "No existe el Evento con ese ID"
            })
        }

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                estado: "KO",
                message: "No está autorizado para borrar este Evento"
            })
        }

        const eventoBorrado = await Evento.findByIdAndDelete(idEvento);

        return res.json({
            estado: "OK",
            message: "Evento Borrado",
            eventoBorrado
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            estado: "KO",
            message: "Hable con el administrador del sitio"
        })
    }
}

module.exports = {
    getEventos, crearEvento, updateEvento, borrarEvento
}