import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SnackService } from '../../core/service/snack.service';
import { Router } from '@angular/router';
import { ShopService } from '../../core/service/shop.service';

@Component({
  selector: 'app-business-settings',
  standalone: true,
  templateUrl: './business-settings.component.html',
  styleUrls: ['./business-settings.component.scss'],
  imports: [TranslateModule, CommonModule, ReactiveFormsModule, MatSlideToggleModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusinessSettingsComponent {
  businessTypes: string[] = ['Restaurant', 'Retail', 'Service', 'construction', 'driving'];
  mustAllowtransactions: boolean = true;
  router: Router = inject(Router);

  registerShopForm = new FormGroup({
    shopName: new FormControl('', Validators.required),
    shopType: new FormControl('', Validators.required),
    shopAddress: new FormControl('', Validators.required),
    shopPhone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    shopEmail: new FormControl('', [Validators.required, Validators.email]),
    isPiPaymentEnabled: new FormControl(true),
    shopImage: new FormControl('', Validators.required),
    shopDescription: new FormControl('', Validators.required),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private snackService: SnackService,
    private shopServices: ShopService,
  ) {}

  onFileChange(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (e: any) => {
        this.registerShopForm.value.shopImage = e.target.result;
      };
    }
  }
  send(): void {
    if (this.registerShopForm.valid) {
      this.shopServices.registerShop(this.registerShopForm.value as any).then((response) => {
        // const { newShop, currentUser } = response.data;
        if (response.ok) {
          this.snackService.showError('Succesfuly added shop');
        } else {
          this.snackService.showError('erro while registering shop');
          console.log(response);
        }
      });

      this.registerShopForm.value.isPiPaymentEnabled = true;
      this.router.navigate(['business', 'manage-business']);
    } else {
      this.registerShopForm.markAllAsTouched();
      console.log('ivalid data');
    }
  }
}
