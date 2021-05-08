
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e){
    e.preventDefault();

    let name = document.querySelector(".name").value;
    let email = document.querySelector(".email").value;
    let message = document.querySelector(".message").value;

    sendEmail(name, email, message);
    document.querySelector(".contact-form").reset();
}



function sendEmail(name, email, message) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "emailmanagementarthur@gmail.com",
        Password: "YSLJ7QiQ7bn9dAu",
        To: 'arthurbrittos@gmail.com',
        From: "emailmanagementarthur@gmail.com",
        Subject: `${name} send you a message from your Website`,
        Body: `Name: ${name} <br/> Email: ${email} <br/>
        Message: ${message}`,
        
    }).then( message => alert("Message sucessfully sent"));
}
