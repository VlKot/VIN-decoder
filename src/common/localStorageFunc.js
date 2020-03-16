
export function getAttributeAsArray(attribute) {
    const result =  localStorage.getItem(attribute);
    if (result) {
        return JSON.parse(result)
    }
    return result;
}


export function setAttribute(attribute, value) {
    try {
        let savedVin = getAttributeAsArray("previous");
        if (savedVin) {
            let queue = savedVin;
            if(queue.length === 5) queue.shift();

            if(savedVin.findIndex(x=>x===value) === -1){
                const merged = [...queue, value];
                localStorage.setItem(attribute, JSON.stringify(merged));
            } 
           
        } else {
            localStorage.setItem(attribute, JSON.stringify([value]));
        }
    }
    catch (e) {
        return false;
    }
    return true;
}

