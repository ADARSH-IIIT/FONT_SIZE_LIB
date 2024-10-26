


self.onmessage = function(event) {

    try {
        const {data , width} = event.data    
    
      
       
        const activeindex = findArrayContainingNumber( width , data   )

     
    
        // Send the result back to the main thread
        self.postMessage({ activeindex : activeindex });
    } catch (error) {

        console.log("error at on event recive listen function at cdn-worker.js" , error  );
        
        
    }
   

};








///////////  high computation function , called inside worker event 
function findArrayContainingNumber(n, nestedArray) {
 
    // console.log( "finding windth lies in whic h segment " );

   
    
        try {

                    for (let i = 0; i < nestedArray.length; i++) {
                        const [a, b] = nestedArray[i]; // Destructure a and b from the child array
                
                        // Check if n lies between a and b (inclusive)
                        if (n >= a && n <= b) {
                            return i ;
                        }
                    }
                
                    return -1 ;
            
        } catch (error) {
                    console.log("error at high computation function in cdn-worker.js "  , error  );
                    
        }
}
