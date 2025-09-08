import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "CASCADA";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
 
  const authHeader = req.headers["authorization"];
  console.log("AUTH HEADER:", authHeader); 

  const token = authHeader && authHeader.split(" ")[1];
  console.log("TOKEN:", token);  

  if (!token) return res.status(401).json({ message: "Token requerido" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log("Error al verificar token:", err);  
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    (req as any).user = decoded;
    next();
  });
};
