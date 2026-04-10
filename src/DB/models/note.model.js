import mongoose from "mongoose";

const { Schema } = mongoose;

const noteSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        validate: {
        validator: function (value) {
            return value !== value.toUpperCase();
        },
        message: "Title cannot be entirely uppercase.",
        },
    },

    content: {
        type: String,
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",   
        required: true,
    },
    },
    {
    timestamps: true,
    }
);

const noteModel = mongoose.model("note", noteSchema);
export default noteModel;