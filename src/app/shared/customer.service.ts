import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  

  constructor(private firebase: AngularFireDatabase) {}
  customerList: AngularFireList<any>;


      form = new FormGroup({
      $key: new FormControl(null),
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      phone: new FormControl('', [Validators.required, Validators.minLength(10)] )

    }); 
   
    getCustomers() {
      this.customerList = this.firebase.list('customers');
      return this.customerList.snapshotChanges();
    }

    insertCustomer(customer) {
      this.customerList.push({
        name: customer.name,
        surname: customer.surname,
        email: customer.email,
        phone: customer.phone
      });
    }

    populateForm(customer) {
      this.form.setValue(customer);
    }

    updateCustomer(customer) {
      this.customerList.update(customer.$key,
        {
          name: customer.name,
          surname: customer.surname,
          email: customer.email,
          phone: customer.phone
        });
    }

    deleteCustomer($key: string) {
      this.customerList.remove($key);
    }
  

}
