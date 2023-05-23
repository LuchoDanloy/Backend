import UserManager from "../managers/userManager.js";
import SessionManager from "../managers/sessionManager.js"

export const login = async  (req, res) =>
{
    const { email, password } = req.body;
    
    const sessionMan = new SessionManager();

    //hacemos las correspondientes validaciones en sessionManager
    await sessionMan.login(email, password);
    
    req.session.user = { email };

    res.send({ message: 'Login success!' });
};

export const logout = async (req, res) =>
{
  req.session.destroy( err => {
      if(!err)
      {
        return res.send({ message: 'Logout ok!' });
      }

      res.send({ message: 'Logout error!', body: err })
  });
};

export const signup = async (req, res) =>
{
    const manager = new UserManager();

    const payload = {
      ...req.body,
      password: await bcrypt.hash(req.body.password, 10)
    }

    const user = await manager.create(payload);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
};
