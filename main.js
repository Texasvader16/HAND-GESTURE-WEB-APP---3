prediction1 = "";
prediction2 = ""; 

Webcam.set({
width:300,
height:300,
img_format:'png',
png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
    
}

console.log('ml5 version', ml5.version)
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/DsUSBhZUq/model.json",modelLoaded)

function modelLoaded()
{
    console.log("modelLoaded")
}

function speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is "+ prediction1;
    speak_data_2 = " And the second prediction is "+ prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}


function predictGesture()
{
img = document.getElementById('captured_image')
classifier.classify(img, gotResult)
}

function gotResult(error, results)
{
if (error){
    console.error(error)
} else{
    console.log(results)
    document.getElementById("prediction1").innerHTML = results[0].label;
    document.getElementById("prediction2").innerHTML = results[1].label;
    prediction1 = results[0].label
    prediction2 = results[1].label
    speak();
    if(results[0].label == "Peace Sign")
    {
        console.log("hi1")
        document.getElementById("emoji1").innerHTML = "&#9996;";
    }
    if(results[0].label == "Fist Bump")
    {
        console.log("hi2")
        document.getElementById("emoji1").innerHTML = "&#9994;";
    }
    if(results[0].label == "Thumbs Up")
    {
        console.log("hi3")
        document.getElementById("emoji1").innerHTML = "&#128077;";
    }
    if(results[0].label == "Thumbs Down")
    {
        console.log("hi4")
        document.getElementById("emoji1").innerHTML = "&#128078;";
    }


    if(results[1].label == "Peace Sign")
    {
        console.log("hi1")
        document.getElementById("emoji2").innerHTML = "&#9996;";
    }
    if(results[1].label == "Fist Bump")
    {
        console.log("hi2")
        document.getElementById("emoji2").innerHTML = "&#9994;";
    }
    if(results[1].label == "Thumbs Up")
    {
        console.log("hi3")
        document.getElementById("emoji2").innerHTML = "&#128077;";
    }
    if(results[1].label == "Thumbs Down")
    {
        console.log("hi4")
        document.getElementById("emoji2").innerHTML = "&#128078;";
    }
  }
}