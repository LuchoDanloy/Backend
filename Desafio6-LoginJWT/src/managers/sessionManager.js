import UserManager from "../managers/userManager.js";
import { isValidPassword } from "../utils/index.js";

class sessionManager{

    async login(email, password)
    {
        // Validar email y password X
        // Hacer un getOneByEmail con el email y validar que el user exista X
        // Validar que el password que nosotros mandamos coincida con el password de la base de datos. X

        if (!email && !password)
        {
            throw new Error('Email and Password invalid format.');
        }

        const manager = new UserManager();
        const user = await manager.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);

        if (!isHashedPassword)
        {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }

        return user;
    }
}

export default sessionManager;