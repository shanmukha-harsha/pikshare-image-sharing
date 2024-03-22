const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

exports.upload = async (req,res) => {

    console.log("inside upload")

    const { title, description } = req.body;

    try {
        if(!req.file) {
            return res.status(400).json({message: 'No Image Uploaded'});
        }
        console.log("passed if")
        const imageUrl = req.file.path.replace(/\\/g, '/')
        const finalUrl = imageUrl.replace("src/Uploads/", "")
        
        console.log(finalUrl)
        const post = await prisma.image.create({
            data: {
                title: title,
                description: description,
                url: finalUrl
            }
        })

        res.status(200).json({message: "Image Uploaded Successfully!"})
    } catch(error) {
        console.error('Error Uploading Image.', error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

exports.posts = async(req, res) => {
    try {
        const posts = await prisma.image.findMany();
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
}