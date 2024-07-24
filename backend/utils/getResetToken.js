import crypto from "crypto";

export const getResetToken = () => {
    const resetToken = crypto.randomBytes(20).toString("hex");
    crypto.createHash("sha256").update(resetToken).digest("hex");
    console.log(resetToken);
    return resetToken;
}

