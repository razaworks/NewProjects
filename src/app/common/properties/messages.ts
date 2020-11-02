import { Injectable } from '@angular/core';

@Injectable()
export class Messages {
  readonly messageValue: Object = {
    kyc: {
      "aadhaar": {
        required: "Aadhaar number is required",
        minlength: "Enter 12 Digit Aadhaar Number",
        pattern: "Please enter valid Aadhaar Number"
      },
      "otp": {
        required: "OTP is required",
        minlength: "Enter 6 Numbers for OTP",
        pattern: "Please enter only numbers"
      },
      "pan": {
        required: "PAN is required",
        pattern: "Please enter valid PAN"
      },
      "salutation": {
        required: "Salutation is required"
      },
      "firstName": {
        required: "Please enter First name",
        specialCharIsForbidden: "Please enter only Characters",
        pattern: "Please enter only Characters"
      },
      "middleName": {
        required: "Please enter Middle Name",
        pattern: "Please enter only Characters"
      },
      "lastName": {
        required: "Please enter Last Name.",
        pattern: "Please enter only Characters"
      },
      "gender": {
        required: "Gender is required"
      },
      "maritalStatus": {
        required: "Marital Status is required"
      },
      "fatherName": {
        required: "Father Name is required"
      },
      "dtMarriageAnv": {
        required: "Marriage Anniversary Date is required"
      },
      "spouseName": {
        required: "Spouse Name is required"
      },
      "spouseDob": {
        required: "Spouse DOB is required"
      },
      "dob": {
        required: "Please enter DOB",
        minimumDtofBirth: "Minimum age should be atleast 18 years",
      },
      "addressDetails": {
        "addressLine1": {
          required: "Please enter address.",
          pattern: "Please enter valid address."
        },
        "addressLine2": {
          required: "Please enter address.",
          pattern: "Please enter valid address."
        },
        "addressLine3": {
          required: "Please enter address."
        },
        "locality": {
          required: "Please enter locality."
        },
        "city": {
          required: "Please enter proper city."
        },
        "district": {
          required: "Please enter proper district."
        },
        "state": {
          required: "Please enter proper state."
        },
        "pincode": {
          required: "Please enter pincode.",
          pattern: "Pincode can only contain 6 digits"
        },
        "country": {
          required: "Please enter country."
        }
      },
      "contactDetails": {
        "mobileNo": {
          required: "Mobile No is required",
          maxlength: "Mobile No cannot be greater than 10 digits",
          pattern: "Mobile No should start with 6/7/8/9 and should be 10 digits long"
        },
        "emailId": {
          required: "Please enter email id.",
          pattern: "Please enter valid email id."
        }
      }
    },
    personalInformation: {
      "otp": {
        required: "OTP is required",
        minlength: "Enter 6 Numbers for OTP",
        pattern: "Please enter only numbers"
      },
      "aadhaar": {
        required: "Aadhaar number is required",
        minlength: "Enter 12 Digit Aadhaar Number",
        pattern: "Please enter valid Aadhaar Number"
      },
      "pan": {
        required: "PAN is required",
        pattern: "Please enter valid PAN"
      },
      "salutation": {
        required: "Salutation is required"
      },
      "firstName": {
        required: "First Name is required",
        pattern: "Please enter valid First Name"
      },
      "middleName": {
        required: "Middle Name is required",
        pattern: "Please enter valid Middle Name"
      },
      "lastName": {
        required: "Last Name is required",
        pattern: "Please enter valid Last Name"
      },
      "gender": {
        required: "Gender is required"
      },
      "maritalStatus": {
        required: "Marital Status is required"
      },
      "fatherName": {
        required: "Father Name is required",
        pattern: "Please enter valid Father Name"
      },
      "dtMarriageAnv": {
        required: "Marriage Anniversary Date is required"
      },
      "spouseName": {
        required: "Spouse Name is required",
        pattern: "Please enter valid Spouse Name"
      },
      "spouseDob": {
        required: "Spouse DOB is required",
        minimumDtofBirth: "Minimum age should be atleast 18 years"
      },
      "dob": {
        required: "DOB is required",
        minimumDtofBirth: "Minimum age should be atleast 18 years"
      },
      "addressDetails": {
        "addressLine1": {
          required: "Address Line 1 is required",
          pattern: "Please enter valid Line 1"
        },
        "addressLine2": {
          required: "Address Line 2 is required",
          pattern: "Please enter valid Line 2"
        },
        "addressLine3": {
          required: "Address Line 3 is required"
        },
        "locality": {
          required: "Locality is required"
        },
        "city": {
          required: "City is required"
        },
        "district": {
          required: "District is required"
        },
        "state": {
          required: "State is required"
        },
        "pincode": {
          required: "Pincode is required",
          pattern: "Pincode can only contain 6 digits"
        },
        "country": {
          required: "Country is required"
        }
      },
      "contactDetails": {
        "mobileNo": {
          required: "Mobile No is required",
          maxlength: "Mobile No cannot be greater than 10 digits",
          pattern: "Mobile No should start with 6/7/8/9 and should be 10 digits long"
        },
        "emailId": {
          required: "Email Id is required",
          pattern: "Invalid Email Id"
        }
      }
    },
    employment: {
      agencyDetails: {
        insurerName: {
          required: "Insurer Name is required"
        },
        agencyCodeNo: {
          required: "Agency Code No is required"
        },
        dtAppointment: {
          required: "Appointment Date is required"
        },
        dtCessation: {
          required: "Cessation Date is required",
          minimumDt: "Cessation Date should not be less than 90 days from today"
        },
        cessationReason: {
          required: "Cessation Reason is required"
        },
        lineOfBusiness: {
          required: "Line of Business is required"
        }
      },
      otherProfessionDetails: {
        otherEmployment: {
          required: "Other Employment is required"
        },
        employmentType: {
          required: "Employment Type is required"
        },
        employerName: {
          required: "Employer Name is required"
        },
        profile: {
          required: "Profile is required"
        },
        fromDate: {
          required: "From Date is required"
        },
        toDate: {
          required: "To Date is required"
        }
      }
    },
    educationalDetails: {
      "educationval": {
        "required": "Please select Education Qualification"
      },
      'rollno': {
        'required': 'Please enter roll number'
      },
      "examtype": {
        "required": 'Please select name of exam passed'
      },
      "dtpassing": {
        'required': 'Please enter date of passing'
      },
      "exambody": {
        'required': 'Please select Name of examination body'
      }

    },
    // KYC: {
    // 	aadhaarNoRequired: 'Please enter AAdhar details',
    // 	aadhaarNoMinLength: 'Please enter AAdhar min length'
    // },
    bankDetails: {

      "firstName": {
        "required": "Please Enter First Name"
      },
      "lastName": {
        "required": "Please Enter Last Name"
      },
      "bankName": {
        "required": " Please Select Bank Name"
      },
      "branchName": {
        "required": 'Branch Name Required'
      },
      'accountNumber': {
        'required': 'Please Enter Account Number',
        'pattern': 'Only numeric is allowed'
      },
      "ifscCode": {
        'required': 'Please Enter Ifsc Code'
      },
      "micrCode": {
        'required': 'Please Enter Micr Code'
      }
    },
    nomineeApointee: {
      "relationship": {
        "required": "Relationship Required"
      },
      "salutation": {
        "required": " Salutation required"
      },
      'firstName': {
        'required': 'First Name Required',
        'pattern': "Please enter valid First Name"
      },
      "middleName": {
        "pattern": 'Please enter valid Middle Name'
      },
      "lastName": {
        'required': 'Last Name Required',
        'pattern': "Please enter valid Last Name"
      },
      "dob": {
        'required': 'Date of Birth is Required'
      },

      "gender": {
        "required": "Gender Required"
      },
      "dependent": {
        "required": "Dependent Required"
      },
      'contactNo': {
        'pattern': 'Should start with 6/7/8/9 and be 10 digits long'
      },
      "accountNumber": {
        "pattern": 'Only numeric is allowed'
      },
      "branchName": {
        'required': 'BranchName required'
      },
      "ifscCode": {
        'required': 'Please Enter Ifsc Code'
      },
      "micrCode": {
        "required": 'Please Enter Micr Code'
      },
      "Address1": {
        'required': 'Address Required',
        'pattern' : 'Please enter valid address.'
      },
      "Address2": {
        'required': 'Address Required',
        'pattern' : 'Please enter valid address.'
      },
      'sharePercent': {
        'required': 'Share Percentage is Required.',
        'minlength': 'Share Percentage has to be greater than 0.',
        'maxlength': 'Share Percentage cannot be greater than 100.'
      },
      "apointee": {
        "appFirstName": {
          "required": " First Name Required",
          'pattern': "Please enter valid First Name"
        },
        "appMiddleName": {
          "required": "Please enter valid Middle Name"
        },
        'appLastName': {
          'required': ' Last Name Required',
          'pattern': "Please enter valid Last Name"
        },
        "appGender": {
          "required": 'Gender Required'
        },
        "appAddress1": {
          'required': 'Address Required',
          'pattern' : 'Please enter valid address.'
        },
        "appAddress2": {
          'required': 'Address Required',
          'pattern' : 'Please enter valid address.'
        },
        "appContactNo": {
          'required': 'Contact Number Required',
          'pattern': 'Should start with 6/7/8/9 and be 10 digits long'
        },
        "appdob": {
          'required': 'Please select date of birth',
        },
        "apprelationship": {
          'required': 'Please select Relationship',
        }
      }
    },
    applicationSearch: {
      appNo: {
        required: "Application Number is required."
      }
    },
    examFeesDetail: {
      examCenter: {
        required: "Please select the Exam center"
      },
      preferredlanguage: {
        required: "Please select Language"
      },
      preferredExamDate1: {
        required: " Please select Preffered Exam Date1"
      },
      preferredExamDate2: {
        required: "Please select Prefered Exam Date2"
      },
      recieptNo: {
        required: "Please Enter Reciept No."
      },
      cashAmount: {
        required: "Please Enter Amount",
        pattern: "Please Enter Only Numbers"
      },
      cashDate: {
        required: "Please Enter Date"
      },
      chequeNo: {
        required: "Please Enter Cheque No."
      },
      payeeName: {
        required: "Please Enter Payee Name."
      },
      bankName: {
        required: "Please Select Bank Name"
      },
      branchName: {
        required: "Please Select Branch Name"
      },

    }
  }
}