const {PrismaClient} = require('@prisma/client')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient();

exports.signup = async (req,res) => {
    const { username, email, password, firstname, lastname } = req.body;
    try {
        console.log("inside signup")
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = await prisma.user.create({
            data: {
                firstName: firstname,
                lastName: lastname,
                username: username,
                email: email,
                password: hashedPassword
            }
        })

        res.status(201).json("New user created")
    } catch(error) {
        res.json("error:", error)
    }
};

exports.login = async(req, res) => {
    const {username, password} = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {username},
        })
        
        if(!user) {
            return res.status(404).json({error:"User Not Found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({error:"Invalid Password"})
        }

        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })
        res.status(200).json({token})
    } catch(error) {
        return res.status(400).json({error: error.message})
    }
}