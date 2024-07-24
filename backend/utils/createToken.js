import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: "30d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        Domain: ".netlify.app"
    });
    console.log(token);
    return token;
}


export default createToken;