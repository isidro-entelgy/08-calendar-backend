const { Router } = require("express");
const { validarToken } = require("../middlewares/validar-token");
const router = Router();
const { getEventos, crearEvento, updateEvento, borrarEvento } = require("../controllers/eventController")
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");

//Todas las rutas pasarán por la validación del JWT
//Obtener Eventos
router.use(validarToken);

router.get("/", getEventos);

router.post("/", [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").isDate(),
    check("end", "La fecha de fin es obligatoria").isDate(),
    check("user", "El usuario es obligatorio").isEmpty(),
    validarCampos
], crearEvento);

router.put("/:id", updateEvento);

router.delete("/:id", borrarEvento);

module.exports = router;