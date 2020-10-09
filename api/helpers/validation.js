
exports.isEmpty = (field) =>{

    if(field && field.trim().length !== 0){
        return false
    }else{
        return true
    }
    
}
exports.isUndefined = (field) =>{
    if(field){
        return false
    }else{
        return true
    }
}
exports.isInvalidRole = (role) =>{

    if(role < 1 || role > 4){
        return true
    }else{
        return false
    }
    
}

exports.isNotNumber = (number) =>{
    if(isNaN(number)){
        return true
    }else{
        return false
    }

}

exports.isCharacter = (name) =>{
    let regExp =  /^[a-zA-Z\s.]{1,50}$/;
    if(name && name.trim().length !== 0){    
        if(regExp.test(name)){
            return true
        }else{
            return false
        }
    } 
}

exports.isValidCharacter = (name) =>{
    if(name && name.trim().length !== 0){ 
        let regExp =  /^([A-Za-z0-9_ ]+)?$/;
        if(regExp.test(name)){
            return true
        }else{
            return false
        }
    }
}

exports.isEmail = (field) => {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if(field.match(regex)){
        return true
    }else{
        return false
    }
}
