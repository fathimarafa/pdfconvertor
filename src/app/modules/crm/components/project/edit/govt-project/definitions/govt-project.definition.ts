export interface GovernmentProject extends ProjectDetails, TenderDetails, ClientDetails { }

export interface ProjectDetails {
    projectId: String,
    projectTypeId: String,
    projectName: String,
    projectDescription: String,
    startDate: Date,
    endDate: Date
}

export interface TenderDetails {
    dateEntered: Date,
    tenderTypeId: String,
    tenderDate: Date,
    tenderNumber: String
}

export interface ClientDetails {
    firstName: String,
    address: String,
    gsT_No: String
    post: String,
    pin: String,
    phoneNumber: String,
    mobileNumber: String,
    emailId: String
}



