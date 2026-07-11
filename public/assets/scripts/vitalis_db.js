/**
 * VITALIS DB - Motor de Persistencia Local Multiusuario
 * Este archivo actúa como la base de datos centralizada del ecosistema.
 */

// Inicialización automática de la Base de Datos con los Administradores solicitados
(function initDatabase() {
    if (!localStorage.getItem('vitalis_db_users')) {
        const adminCredentials = [
            {
                username: 'adminestu',
                email: 'adminestu@upc.pe',
                password: 'admin123',
                role: 'estudiante',
                fullname: 'Admin Estudiante'
            },
            {
                username: 'adminpre',
                email: 'adminpre@vitalis.pe',
                password: 'admin123',
                role: 'practicante',
                fullname: 'Admin Pre Profesional'
            }
        ];
        localStorage.setItem('vitalis_db_users', JSON.stringify(adminCredentials));
        console.log("🗄 VITALIS DB: Tabla de usuarios inicializada con credenciales de administración.");
    }
})();

/**
 * Registra un nuevo usuario en la base de datos si no existe duplicado por cuenta o correo.
 */
window.dbRegisterUser = function(username, email, password, role, fullname) {
    const users = JSON.parse(localStorage.getItem('vitalis_db_users')) || [];

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    const userExists = users.some(u =>
        u.username.toLowerCase() === cleanUsername ||
        (u.email && u.email.toLowerCase() === cleanEmail)
    );

    if (userExists) return false;

    users.push({
        username: cleanUsername,
        email: cleanEmail,
        password: password,
        role: role,
        fullname: fullname.trim()
    });

    localStorage.setItem('vitalis_db_users', JSON.stringify(users));
    return true;
};

/**
 * Valida si las credenciales coinciden con la cuenta O con el correo en la base de datos.
 */
window.dbValidateLogin = function(accountOrEmail, password) {
    const users = JSON.parse(localStorage.getItem('vitalis_db_users')) || [];

    const cleanInput = accountOrEmail.trim().toLowerCase();

    const foundUser = users.find(u =>
        (u.username.toLowerCase() === cleanInput || (u.email && u.email.toLowerCase() === cleanInput))
        && u.password === password
    );

    return foundUser || null;
};