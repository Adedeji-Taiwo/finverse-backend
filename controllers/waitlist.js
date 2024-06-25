/* eslint-disable no-undef */
const https = require("https");
const waitListRouter = require("express").Router();
const WaitList = require("../models/waitlist");
const sendWaitListEmail = require("../utils/sendWaitListEmail");

//All subscribers route
waitListRouter.get("/", async (req, res) => {
  const subscribers = await WaitList.find({});

  res.json(subscribers);
});

//Subscribe route
waitListRouter.post("/", async (req, res) => {
  const {
    email,
    feature,
    alternative,
    others,
    success,
    pricing,
    premium,
  } = req.body;

  const existingSubscriber = await WaitList.findOne({ email });
  if (existingSubscriber) {
    return res.status(400).json({
      error: "Email already on the waitlist",
    });
  }

  const subscriber = new WaitList({
    email,
    feature,
    alternative,
    others,
    success,
    pricing,
    premium,
  });

  const savedSubscriber = await subscriber.save();
  res.status(201).json(savedSubscriber);

  await sendWaitListEmail(
    subscriber.email,
    "Welcome to the FinVerse Community!"
  );
});

//delete subscriber route
waitListRouter.delete("/:id", async (req, res) => {
  await WaitList.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

module.exports = waitListRouter;
