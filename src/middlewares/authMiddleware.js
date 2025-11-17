import jwt from 'jsonwebtoken'
const authMiddleware = (req, res, next) => {
    //1. Buscar o token no cabeçalho da requisição
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Token de autenticação não fornecido."});
    }
    // o formato do token é "Bearer Token". Precisamos separar as duas partes.
    const parts = authHeader.split(' ');
    if (parts.lenght !== 2) {
        return res.status(401).json({ message: "Token em formato inválido."});
    }

    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: "Token mal formatado." });
    }
    //2. validar o token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token inválido ou expirado." });
        }
        //3. se o token for válido, adicionamos os dados do usuario na requisição
        req.userCpf = decoded.cpf;
        req.userEmail = decoded.email;
        //4. chama o proximo middleware ou o controlador final
        return next();
    });
};
export default authMiddleware;