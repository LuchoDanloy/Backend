import UserManager from "../managers/userManager.js";
import SessionManager from "../managers/sessionManager.js"
import { createHash, generateToken} from "../utils/index.js";

export const login = async  (req, res) =>
{
    const { email, password } = req.body;
    
    const sessionMan = new SessionManager();

    //hacemos las correspondientes validaciones en sessionManager
    const user = await sessionMan.login(email, password);

    console.log("USER:");
    console.log(user);

    const accessToken = await generateToken(user);

    res.send({ accessToken, message: 'Login success!' });

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

export const current = async  (req, res) =>
{
  res.status(200).send({ status: 'Success', payload: req.user });
};

export const signup = async (req, res) =>
{
    const manager = new UserManager();

    const payload = {
      ...req.body,
      password: await createHash(req.body.password, 10)
    }

    const user = await manager.create(payload);

    res.status(201).send({ status: 'success', user, message: 'User created.' });
};
