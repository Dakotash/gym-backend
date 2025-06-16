const express = require("express");
const cors = require("cors");
const multer = require("multer");
const joi = require("joi");
const app = express();
const path = require('path');

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // const dir = path.join(__dirname, 'public', 'images');
        // cb(null, "./public/images/");
        cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });


let trainers = [
    [
        {
            _id: 1,
            name: "Arnold Schwarzenegger",
            price: "$150/session",
            img_name: "images/arnold-schwarzenegger-portrait-session.jpg",
            description: "7-time Mr. Olympia and fitness icon, Arnold brings unmatched passion and energy to every session. He focuses on classic bodybuilding, full-body transformations, and mental discipline. Whether you're a beginner or a competitor, Arnold will push you to break barriers and love the process."
        },
        {
            _id: 2,
            name: "Mike Mentzer",
            price: "$120/session",
            img_name: "images/Mike-Mentzer.jpg",
            description: "Creator of Heavy Duty training, Mike helps clients achieve maximum results with minimal time. His HIT method is perfect for those who want serious gains without spending hours in the gym. Expect a no-fluff, science-backed approach to building strength and size."
        },
        {
            _id: 3,
            name: "Franco Columbu",
            price: "$130/session",
            img_name: "images/franco-columbo.png",
            description: "Two-time Mr. Olympia and former chiropractor, Franco combines serious power with injury-smart training. He's the go-to coach for building functional strength and staying healthy. Ideal for lifters who want to grow stronger while training smart."
        },
        {
            _id: 4,
            name: "Dakota Hawkins",
            price: "$80/session",
            img_name: "images/Dakota.jpeg",
            description: "Dakota emphasizes balanced training, proper recovery, and injury prevention. His holistic approach combines strength training with flexibility and cardiovascular health for long-term fitness success."
        },
        {
            _id: 5,
            name: "Dorian Yates",
            price: "$140/session",
            img_name: "images/dorian-yates.webp",
            description: "Six-time Mr. Olympia known for his revolutionary high-intensity training methods. Dorian focuses on quality over quantity, helping clients achieve maximum muscle growth with shorter, more intense workouts. Ideal for busy professionals who want serious results in minimal time."
        },
        {
            _id: 6,
            name: "Lou Ferrigno",
            price: "$125/session",
            img_name: "images/lou-ferrigno.jpg",
            description: "The Incredible Hulk himself! Lou specializes in mass building and strength training for all fitness levels. His motivational approach and decades of bodybuilding experience help clients break through plateaus and achieve their dream physique. Perfect for those looking to add serious size and strength."
        },
        {
            _id: 7,
            name: "Ronnie Coleman",
            price: "$160/session",
            img_name: "images/ronnie-coleman.jpg",
            description: "Eight-time Mr. Olympia known for his incredible work ethic and legendary strength. Ronnie brings unmatched intensity and motivation to help clients push their limits safely. Specializes in powerlifting techniques and building both strength and size. \"Yeah buddy, lightweight baby!\""
        },
        {
            _id: 8,
            name: "Frank Zane",
            price: "$135/session",
            img_name: "images/frank-zane.png",
            description: "Three-time Mr. Olympia known for his aesthetic physique and scientific approach to training. Frank specializes in body symmetry, proportion, and lean muscle development. Perfect for clients focused on achieving a balanced, aesthetic physique rather than just size."
        }
    ]
];


app.get("/api/trainers", (req, res) => {
    console.log("you got trainers");
    res.json(trainers);
});


//-------------------------NEW CODE------------------------------------------
app.post("/api/trainers", upload.single("img"), (req, res) => {
    //console.log(req.body);
    const isValidtrainers = validatetrainers(req.body);
    if (isValidtrainers.error) {
        console.log("invalid");
        res.status(400).send(isValidtrainers.error.details[0].message);
        return;
    }

    const trainersData = {
        _id: trainers.length,
        name: req.body.name,
        price: req.body.price,
        img_name: req.body.img,
        description: req.body.description
    }

    if (req.file) {
        trainersData.main_image = req.file.filename;
    }

    trainers.push(trainersData);

    console.log("valid trainer added")

    console.log(trainers, "trainers")
    res.status(200).send(trainers);
});


//need requirments both client and server side
const validatetrainers = (trainers) => {
    const schema = joi.object({
        _id: joi.allow(""),
        name: joi.string().min(3).required(),
        price: joi.string().required(),
        description: joi.string().min(3)
    });

    return schema.validate(trainers);
};

app.listen(3005, () => {
    console.log("The server is up!");
});