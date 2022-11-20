import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Author from "../models/Author";

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let author = await Author.create(req.body);
    if (!author) return res.status(400).json({ message: "Not created!" });
    res.status(201).json({ data: author });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    let author = await Author.findOne({ _id: authorId });
    if (!author) return res.status(404).json({ message: "Not found!" });
    res.status(201).json({ data: author });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let authors = await Author.find({});
    if (!authors) return res.status(404).json({ message: "Not found!" });
    res.status(201).json({ data: authors });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    let checkAuthor = await Author.findOne({ _id: authorId });
    if (!checkAuthor) return res.status(404).json({ message: "Not found!" });
    let author = await Author.findOneAndUpdate({ _id: authorId }, { $set: req.body }, { new: true });
    res.status(201).json({ data: author });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorId = req.params.authorId;
    let author = await Author.findOneAndDelete({ _id: authorId });
    if (!author) return res.status(404).json({ message: "Not found!" });
    res.status(201).json({ data: author });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export default {
  createAuthor,
  readAuthor,
  readAll,
  updateAuthor,
  deleteAuthor,
};
