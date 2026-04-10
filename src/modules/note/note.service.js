

import noteModel from "../../DB/models/note.model.js";
import userModel from "../../DB/models/user.model.js";

export const createNoteService = async ({ title, content, userId }) => {
  const user = await userModel.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const note = await noteModel.create({
    title,
    content,
    userId,
  });

  return note;
};

export const updateNoteService = async (noteId, userId, updateData) => {
  const note = await noteModel.findOne({ _id: noteId, userId });

  if (!note) {
    throw new Error("Note not found or unauthorized");
  }

  Object.assign(note, updateData);
  await note.save();

  return note;
};

export const replaceNoteService = async (noteId, userId, newData) => {
  const note = await noteModel.findOneAndReplace(
    { _id: noteId, userId },
    { ...newData, userId },
    { new: true }
  );

  if (!note) {
    throw new Error("Note not found or unauthorized");
  }

  return note;
};

export const updateAllNotesTitleService = async (userId, newTitle) => {
  return await noteModel.updateMany(
    { userId },
    { title: newTitle }
  );
};

export const deleteNoteService = async (noteId, userId) => {
  const note = await noteModel.findOneAndDelete({ _id: noteId, userId });

  if (!note) {
    throw new Error("Note not found or unauthorized");
  }

  return note;
};

export const paginateNotesService = async (userId, page = 1, limit = 5) => {
  const skip = (page - 1) * limit;

  return await noteModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await noteModel.findOne({ _id: noteId, userId });

  if (!note) {
    throw new Error("Note not found or unauthorized");
  }

  return note;
};

export const getNoteByContentService = async (userId, content) => {
  return await noteModel.findOne({
    userId,
    content: { $regex: content, $options: "i" },
  });
};

export const getNotesWithUserService = async (userId) => {
  return await noteModel
    .find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");
};

export const aggregateNotesService = async (userId, title) => {
  const pipeline = [
    { $match: { userId } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ];

  if (title) {
    pipeline.push({
      $match: {
        title: { $regex: title, $options: "i" },
      },
    });
  }

  pipeline.push({
    $project: {
      title: 1,
      content: 1,
      "user.name": 1,
      "user.email": 1,
    },
  });

  return await noteModel.aggregate(pipeline);
};

export const deleteAllNotesService = async (userId) => {
  return await noteModel.deleteMany({ userId });
};