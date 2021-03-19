let divEmotion = document.getElementById('divEmotion');
let text = document.getElementById('idText');
let data;
let tone;
let score;
let tone_name;


let sendData = function() {
    console.log(text.value);
    if(text.value == "") return alert("You must write something in English!");

    
    let data = {
        text : text.value
    }


    axios({
        method: 'post',
        url: 'http://medina-rifas-tone-analyzer.mybluemix.net/tone-analyzer',
        data : {
            text: text.value
        }
    })
    .then((res) => {
        // console.log(res);
        // console.log(res.data.data);
        data = JSON.parse(res.data.data);
        // console.log('result:');
        // console.log(data);
        // console.log(data.result);
        tone = "";
        if(data.result.document_tone.tone_categories) {
            divEmotion.innerHTML = "";
            // tone = data.result.document_tone.tone_categories[0].tones[0];

            // score = tone.score;
            // tone_name = tone.tone_name;

         

            data.result.document_tone.tone_categories[0].tones.forEach(element => {
                // console.log(element.score)
                // console.log(element.tone_name)
                score = element.score * 100 + "";

                divEmotion.innerHTML += `<h5> ${element.tone_name}: ${score.substring(0,4)}%</h5>`
            });
            
        }
        else {
            divEmotion.innerHTML = " Couldn't find tone for text";
        }
    })
    .catch((err) => {
        console.error(err);
    })  
}