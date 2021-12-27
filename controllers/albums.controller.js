const data = require('./../data');



async function fetchAlbumList(req, res) {
    try {
        // fetch('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy',{ 
        //     headers: {
        //       "authorization": "Bearer BQCgtZ6fC1ZxqruAnmosQACsCe6HXbMwL0xqHlzhtTfDuFuEp3SkUFguFnfy1br2I64UCMML2BAZQ7468SOI0sANKCUGlBYsTFjJVD8hB1kuH0xcJY5MFqeWflR1r9f-GmjzcxeXnMMQbUL6hDGQpSYcNwnk6f4",
        //       "content-type": "application/json",
        //       "Accept": "application/json"
        //     }
        // })
        // .then( res => console.log(res));
        return res.status(200).json(data.albumList)
    } catch (err) {
        console.error(err.stack);
    }
}

function fetchAlbumById(req, res) {
    try {
        const { id } = req.params
        let album = data.albumList.filter( album => album.id == id )
        return res.status(200).json(album[0])
    } catch (err) {
        console.error(err.stack);
    }
}

module.exports = {
    fetchAlbumList,
    fetchAlbumById
}