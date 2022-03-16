const mongoose = require("mongoose");

const { Schema } = mongoose;

const AlbumSchema = new Schema({
    artists : Array,
    disc_number : Number,
    duration_ms : Number,
    explicit : Boolean,
    external_urls : Object,
    href : String,
    is_local : Boolean,
    is_playable : Boolean,
    name : String,
    preview_url : String,
    track_number : Number,
    type : String,
    uri : String
},{ timestamps: true });

const album = mongoose.model("album", AlbumSchema);

module.exports = album;

