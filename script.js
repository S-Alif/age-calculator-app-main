// get necessary elements
let input_form = document.querySelectorAll(".form-control")
let valid_error = document.querySelector(".valid-error")

// get form individually
let day_input = document.getElementById("day")
let month_input = document.getElementById("month")
let year_input = document.getElementById("year")

let flag = 0;


// get how many days in a month
let get_days_in_a_month = () => {
    let m = month_input.value
    let y = year_input.value

    let days_in_a_month = new Date(y, m, 0).getDate()

    return days_in_a_month
}

//validate days in a month
let validate_days_in_month = () => {
    let d = get_days_in_a_month()
    if(day_input.value <= d){
        return true
    }
    else{
        return false
    }
}

// validation on input
input_form.forEach(e => {
    e.addEventListener('keyup', () => {

        // validate day
        if(e.id == "day"){
            if(day_input.value > 31){
                e.nextElementSibling.classList.add("showed")
                e.classList.add("error")
            }
            else if(!validate_days_in_month()) {
                day_input.nextElementSibling.classList.add("showed")
                day_input.classList.add("error")
            }
            else{
                e.nextElementSibling.classList.remove("showed")
                e.classList.remove("error")
            }
        }

        // validate month
        if(e.id == "month"){
            if(month_input.value > 12){
                e.nextElementSibling.classList.add("showed")
                e.classList.add("error")
            }
            else{
                e.nextElementSibling.classList.remove("showed")
                e.classList.remove("error")

                if(validate_days_in_month()) {
                    day_input.nextElementSibling.classList.remove("showed")
                    day_input.classList.remove("error")
                }
                else {
                    day_input.nextElementSibling.classList.add("showed")
                    day_input.classList.add("error")
                }
            }
        }

        // validate years
        if(e.id == "year"){
            if(year_input.value > new Date().getFullYear()){
                e.nextElementSibling.classList.add("showed")
                e.classList.add("error")
            }
            else{
                e.nextElementSibling.classList.remove("showed")
                e.classList.remove("error")

                if(validate_days_in_month()) {
                    day_input.nextElementSibling.classList.remove("showed")
                    day_input.classList.remove("error")
                }
                else {
                    day_input.nextElementSibling.classList.add("showed")
                    day_input.classList.add("error")
                }
            }
        }
    })
})

// calculating age
let calculate_age = () => {
    // get birthday month / date / year
    let birth = {
        year: parseInt(year_input.value),
        month: parseInt(month_input.value),
        date: parseInt(day_input.value)
    }

    // get current year / month / date
    let today = new Date()
    let current = {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate()
    }

    let year, month, days

    // year
    year = current.year - birth.year

    // month
    if (current.month >= birth.month) {
        month = current.month - birth.month
    }
    else {
        year--
        month = 12 + current.month - birth.month
    }

    // day
    if (current.date >= birth.date) {
        days = current.date - birth.date
    }
    else {
        month--
        days = 31 + current.date - birth.date

        if (month < 0) {
            month = 11
            year--
        }
    }

    show_age(days, month, year)
}

let validError = () => {
    valid_error.classList.add("showed")
    setTimeout(() => {
        valid_error.classList.remove("showed") 
    }, 3500)
}

// show the age in output
let show_age = (day, month, year) => {
    document.querySelector(".show-year").innerHTML = year
    document.querySelector(".show-month").innerHTML = month + 1
    document.querySelector(".show-day").innerHTML = day
}

// check if the validation is ok
let check = () =>{
    if(day_input.value.length > 2 || day_input.value == ""){
        validError()
    }
    else if(month_input.value.length > 2 || month_input.value == ""){
        validError()
    }
    else if(year_input.value.length > 4 || year_input.value == ""){
        validError() 
    }
    else{
        calculate_age()
    }
}