exports.getCreatePasswordEmailTemplate = (email, verificationLink, name, role) => {

    
    let templateObject =    "<b>Hello " + name +
                            ",</b><br><p>Your account has been created with HVAC Intel. Your username is " + email + "</p>" +
                            "<p>Follow this link to set your password <a href ="+verificationLink+">"+"Click here"+"</a></p>" +
                            "<p>Thanks</p><p>Team HVAC</p>"
    
    return templateObject;
}

exports.getResetPasswordEmailTemplate = (verificationLink, name) => {

    let templateObject =    "<b>Hello " + name + "</b>" +
                            "<p>Follow this link to reset your password.<a href ="+verificationLink +">"+"Click here"+"</a></p>" +
                            "<p>Thanks</p><p>Team HVAC</p>"
    
    return templateObject;
}

exports.getContactUsTemplate = ( name, phone, emailId, comment ) =>{
    let templateObject =    "<b>Hello Admin </b>" +
                            "<p>"+ comment + "</p>" +"<p>Thanks</p>"+name+"<br>"+phone+"<br>"+emailId;
    return templateObject;
}

exports.getFeedbackEmailTemplate = ( name, emailId, feedback, version, os ) =>{
    let templateObject =    "<b>Hello Admin </b>" +
                            "<p>"+feedback+"</p><br>"+"Version : "+version+"<br>"+"OS : "+os+"<p>Thanks</p>"+name+"<br>"+emailId; 
    return templateObject;
}