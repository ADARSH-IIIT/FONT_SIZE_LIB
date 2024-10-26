






function SET_FONT_SIZE( element , currentwidth , arraydata ){


    fetch('https://adarsh-iiit.github.io/Font_Size_Lib/worker.js')
    .then(response => response.text())
    .then(scriptText => {
        const blob = new Blob([scriptText], { type: 'application/javascript' });
        const blobUrl = URL.createObjectURL(blob);
        const worker = new Worker(blobUrl);



        worker.postMessage({ data: arraydata, width: currentwidth });

        worker.onmessage = function (event) {
            const { activeindex } = event.data;
            // console.log(activeindex, 'main.js');

            if (activeindex !== -1) {
                setfont(element, currentwidth ,  arraydata[activeindex]);
            }
        };

        // Use the worker...
        // console.log('Worker created successfully:', worker);
    })
    .catch(error => console.error('error at SET_FONT_SIZE function :', error));



}













function setfont(element, currentwidth  , data) {
    try {
        if (data) {
            const [sw, ew, sf, ef] = data;
            element.style.fontSize = ((currentwidth - sw) / (ew - sw)) * (ef - sf) + sf + 'px';

            console.log(  "new font ==>" , ((currentwidth - sw) / (ew - sw)) * (ef - sf) + sf,"px"  ,  "current width==>" ,   currentwidth);
        }

    } catch (error) {
        console.log("error at setfont function in cd-main.js", error);
    }
}














function HOW_TO_USE() {
    console.log(`
    1. USAGE
        script.js
            let element = document.getElementById("nameofid");
            const currentwidth = window.innerWidth; // always pass window.innerWidth in currentWidth argument
            const nestedArray = [
                [0, 300, 10, 20],
                [400, 900, 50, 40],
                [1000, 1200, 55, 65],
            ];

            SET_FONT_SIZE(element, currentwidth, nestedArray); // call this function to set font size

        * parameters of function: element, current width, nested array respectively

    2. EXPLANATION
        The nested array represents the following diagram:
        screen width====>           0px      300px      400px      900px        1000px          1200px
                                    _____________________________________________________________
                                    |          |          |          |          |               |
                                    |          |          |          |          |               |
                                    |          |          |          |          |               |
                                    |__________|__________|__________|__________|_______________|
        font size =====>           10px      20px       50px        40px       55px            65px 

        * The font size will change linearly within each range.
        * If the current width does not fall within any specified range, the default font size of 18px will be applied.
    `);
}
