meaning = ""

Webcam.set({
    width : 350,
    height : 300,
    image_format : "png",
    png_quality : 100
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeImage()
{
    Webcam.snap(function(data_uri)
    {
        document.getElementById("result").innerHTML='<img id="image" src="'+data_uri+'"/>'
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/zqWrmd_Gl/model.json",modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function Check()
{
    img = document.getElementById("image");
    classifier.classify(img,gotResult);
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data = meaning;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    utterThis.rate=1;
    synth.speak(utterThis);
}

function gotResult(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        document.getElementById("emotion_name1").innerHTML=results[0].label;

        if(results[0].label == "best")
        {
            document.getElementById("emoji1").innerHTML="&#128077;";
            meaning = "The meaning of this emoji is best.";
            speak();
        }

        if(results[0].label == "amazing")
        {
            document.getElementById("emoji1").innerHTML="&#128076;";
            meaning = "The meaning of this emoji is amazing.";
            speak();
        }

        if(results[0].label == "victory")
        {
            document.getElementById("emoji1").innerHTML="&#9996;";
            meaning = "The meaning of this emoji is victory.";
            speak();
        }

        if(results[0].label == "good luck")
        {
            document.getElementById("emoji1").innerHTML="&#129310;";
            meaning = "The meaning of this emoji is good luck.";
            speak();
        }

        if(results[0].label == "dislike")
        {
            document.getElementById("emoji1").innerHTML="&#128078;";
            meaning = "The meaning of this emoji is dislike.";
            speak();
        }
    }
}
