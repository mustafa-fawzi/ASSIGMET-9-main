import noteModel from "../../DB/models/note.model.js";

import { Router } from "express";
import * as noteService from "../note/note.service.js";

const router = Router();

const getUserId = (req) => req.body?.userId ?? req.query?.userId ?? req.params?.userId;

router.post("/", async (req, res, next) => {
	try {
		const result = await noteService.createNoteService(req.body);
		res.status(201).json(result);
	} catch (err) {
		next(err);
	}
});

router.patch("/:noteId", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.updateNoteService(req.params.noteId, userId, req.body);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.put("/replace/:noteId", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.replaceNoteService(req.params.noteId, userId, req.body);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.patch("/all", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.updateAllNotesTitleService(userId, req.body.title);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.delete("/:noteId", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.deleteNoteService(req.params.noteId, userId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/paginate-sort", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const result = await noteService.paginateNotesService(userId, page, limit);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/note-by-content", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const content = req.query.content || req.body.content;
		const result = await noteService.getNoteByContentService(userId, content);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/note-with-user", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.getNotesWithUserService(userId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/aggregate", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const title = req.query.title;
		const result = await noteService.aggregateNotesService(userId, title);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.getNoteByIdService(req.params.id, userId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

router.delete("/", async (req, res, next) => {
	try {
		const userId = getUserId(req);
		const result = await noteService.deleteAllNotesService(userId);
		res.json(result);
	} catch (err) {
		next(err);
	}
});

export default router;