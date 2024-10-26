




function SET_FONT_SIZE(element, currentwidth, arraydata) {
   

    try {
        // Call the solvingcors function to get the worker URL
        const workerUrl = './worker.js'

        // Create a new Worker using the Blob URL returned from solvingcors
        const worker = new Worker(workerUrl);

        worker.postMessage({ data: arraydata, width: currentwidth });

        worker.onmessage = function (event) {
            const { activeindex } = event.data;
            console.log(activeindex, 'main.js');

            if (activeindex !== -1) {
                setfont(element, currentwidth ,  arraydata[activeindex]);
            }
        };

        

    } catch (error) {
        console.log("error at setfont function in cdn-main.js", error);
    }
}












function setfont(element, currentwidth  , data) {
    try {
        if (data) {
            const [sw, ew, sf, ef] = data;
            element.style.fontSize = ((currentwidth - sw) / (ew - sw)) * (ef - sf) + sf + 'px';

            console.log(  "new font" , ((currentwidth - sw) / (ew - sw)) * (ef - sf) + sf,"px"  ,   currentwidth, "set font function mein h , remove before making cdn");
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
