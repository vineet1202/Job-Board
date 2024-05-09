const getItem = (key) => {
    try{
        return localStorage.getItem(key)
    }catch(err){}
}

const setItem = (key,value) => {
    try{
        localStorage.setItem(key, value);
    }catch(err){}

}

const removeItem = (key) => {
    try{
        localStorage.removeItem(key);
    }catch(err){}

}

export {getItem, setItem, removeItem}