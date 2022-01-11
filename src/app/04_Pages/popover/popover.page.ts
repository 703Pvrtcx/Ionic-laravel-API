import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { UserInfoService } from 'src/app/05_Services/auth/user-info.service';
import { SpinnerService } from 'src/app/05_Services/spinner.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
})
export class PopoverPage implements OnInit {
  isVisible = false;
  constructor(private dbs: UserInfoService, public popoverController: PopoverController, public sp: SpinnerService) { }

  ngOnInit() {
    
  }

  updateProfilePic(event) {
    
    this.dbs.updateProfile(event.target.files[0])
    this.popoverController.dismiss()
    
  }

}
