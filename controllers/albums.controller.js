const Albums = require("../models/album");

async function fetchAlbumList(req, res) {
    try {
        await Albums.find({},(err, Albums) => {
            if(err) res.status(400).json("unable to find albums")
            else res.status(200).json({success:true, message: "Albums found successfully", data:Albums})
         });
    } catch (err) {
        console.error(err.stack);
    }
}

async function fetchAlbumById(req, res) {
    try {
        const { id } = req.params
        let album = await Albums.findById({"_id": id })
        return res.status(200).json({success:true, message: "Album found successfully", data:album})
    } catch (err) {
        console.error(err.stack);
    }
}

module.exports = {
    fetchAlbumList,
    fetchAlbumById
}