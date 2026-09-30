/*
 Rutas de Usuarios / Auth
 host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { crearUsuario, loginUsuario, renovarToken } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");

router.post("/new", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres como mínimo").isLength({ min: 6, max: 12 }),
    validarCampos
],
    crearUsuario);

router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe ser de 6 caracteres como mínimo").isLength({ min: 6, max: 12 }),
    validarCampos
], loginUsuario);

router.get("/renew", renovarToken);

module.exports = router;