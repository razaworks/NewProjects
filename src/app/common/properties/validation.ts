import { FormControl,AbstractControl } from '@angular/forms';

export const Name = (control: FormControl): {[key: string]: boolean} => {

	if(control.value != '')
	{
    var regex = new RegExp("^[a-zA-Z\b]+$");
    
    if (!regex.test(control.value)) {
      {
        return {'specialCharIsForbidden': true};
      }
    }	
  }

}
export const lName = (control: FormControl): {[key: string]: boolean} => {

  if(control.value != '')
  {
    
    var regex = new RegExp("^[a-zA-Z\b']+$");
    
    
    if (!regex.test(control.value)) {
      {
        return {'specialCharIsForbidden': true};
      }
    }  
  }
  
}