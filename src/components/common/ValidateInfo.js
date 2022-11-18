export default function validateInfo(values) {
    let errors = {}

    // if(!values.fullname.trim()) {
    //     errors.fullname = "fullname required"
    // }
    if(!values.username.trim()) {
        errors.username = "username required"
    }
    if(!values.mobileNo.trim()) {
        errors.mobileNo = "mobile no required"
    }

    if(!values.email) {
        errors.email = "Email required"
    } else if(!/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(values.email))  {
        errors.email = "Email address is invalid"
    }

    if(!values.cpassword) {
        errors.cpassword = "password is required"
    }else if(values.cpassword.length < 6) {
        console.log("6")
        errors.cpassword = "Password needs to be 6 charactors or more"
    }
    if(!values.rpassword) {
        errors.rpassword = "rpassword is required"
    }else if(values.rpassword !== values.cpassword) {
        errors.rpassword = "rPassword do not match"
    }
    return errors
}