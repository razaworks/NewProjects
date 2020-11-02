import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.page.html',
  styleUrls: ['./billing.page.scss'],
})
export class BillingPage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  navBills() {
    this.router.navigate(["billing/bills"]);
  }
  navPayments() {
    this.router.navigate(["billing/payments"]);
  }
  navOsDues() {
    this.router.navigate(["billing/outstanding-dues"]);
  }

}
