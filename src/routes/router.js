import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
export default class RouterBase {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter() {
    return this.router;
  }

  init() {}

  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallbacks(callbacks),
    );
  }

  applyCallbacks(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500).send(error);
      }
    });
  }

  generateCustomResponses(req, res, next) {
    res.sendSuccess = (payload) =>
      res.status(200).json({ status: "success", payload });
    res.sendSuccessCreated = (payload) =>
      res.status(201).json({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).json({ status: "error", error });
    res.sendClientError = (error) =>
      res.status(400).json({ status: "error", error });
    res.sendNotFound = (error) =>
      res.status(404).json({ status: "error", error });
    res.sendSuccessWithCookie = (token, payload) => {
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 3600000,
          sameSite: "lax",
        })

        .json({ status: "success", payload });
    };
    next();
  }

  handlePolicies(policies) {
    return (req, res, next) => {
      if (policies[0] === "PUBLIC") return next();

      const token =
        req.originalUrl.includes("api") && req.headers.authorization
          ? req.headers.authorization.split(" ")[1]
          : req.cookies.token;
      if (!token && policies[0] !== "NOAUTH")
        return res.redirect("/login?failSession=true");
      if (token && policies[0] === "NOAUTH") return res.redirect("/products");
      if (!token && policies[0] === "NOAUTH") return next();
      try {
        const user = jwt.verify(token, config.JWT_SECRET);

        if (!policies.includes(user.role.toUpperCase()))
          return res.status(403).send({ status: "error", error: "Forbidden" });

        req.user = user;
        next();
      } catch (error) {
        res.status(500).send({
          status: "error",
          error: error.message,
        });
      }
    };
  }
}
